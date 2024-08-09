// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.24;

// import "solmate/src/mixins/ERC4626.sol";

// import "@openzeppelin/contracts-upgradeable//security/ReentrancyGuard.sol";
// import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// import "@openzeppelin/contracts/access/Ownable.sol";

// import "./interfaces/ICERC20.sol"; // Interface for Compound cToken
// import "./interfaces/ISuperformRouter.sol"; // Interface for SuperformRouter

// contract TokenVault is ERC4626, ReentrancyGuard, Ownable {
//     // A mapping that tracks user deposits
//     mapping(address => uint256) public shareHolder;
//     mapping(address => uint256) public borrowerDebt;
//     mapping(address => uint256) public collateralDeposits;

//     // Compound cToken for the asset
//     ICERC20 public cToken;

//     // SuperformRouter contract
//     ISuperformRouter public superformRouter;

//     constructor(
//         ERC20 _asset,
//         string memory _name,
//         string memory _symbol,
//         address _cToken,
//         address _superformRouter
//     ) ERC4626(_asset, _name, _symbol) {
//         cToken = ICERC20(_cToken);
//         superformRouter = ISuperformRouter(_superformRouter);
//     }

//     /**
//      * @notice Function to deposit assets and receive vault tokens in exchange
//      * @param _assets Amount of the asset token
//      */
//     function _deposit(uint256 _assets) public nonReentrant {
//         require(_assets > 0, "Deposit must be greater than zero");

//         // Transfer assets to this contract
//         asset.transferFrom(msg.sender, address(this), _assets);

//         // Approve assets for Compound
//         asset.approve(address(cToken), _assets);

//         // Supply assets to Compound
//         require(cToken.mint(_assets) == 0, "Compound mint failed");

//         // Mint vault tokens to the depositor
//         deposit(_assets, msg.sender);

//         // Increase the share of the user
//         shareHolder[msg.sender] += _assets;
//     }

//     /**
//      * @notice Function to allow msg.sender to withdraw their deposit plus accrued interest
//      * @param _shares Amount of shares the user wants to convert
//      * @param _receiver Address of the user who will receive the assets
//      */
//     function _withdraw(uint256 _shares, address _receiver) public nonReentrant {
//         require(_shares > 0, "Withdraw must be greater than zero");
//         require(_receiver != address(0), "Zero address");
//         require(shareHolder[msg.sender] > 0, "Not a shareholder");
//         require(shareHolder[msg.sender] >= _shares, "Not enough shares");

//         // Calculate assets to withdraw
//         uint256 assetsToWithdraw = _shares + calculateInterest(_shares);

//         // Redeem assets from Compound
//         require(cToken.redeemUnderlying(assetsToWithdraw) == 0, "Compound redeem failed");

//         // Transfer assets to the receiver
//         asset.transfer(_receiver, assetsToWithdraw);

//         // Burn vault tokens
//         redeem(assetsToWithdraw, _receiver, msg.sender);

//         // Decrease the share of the user
//         shareHolder[msg.sender] -= _shares;
//     }

//     /**
//      * @notice Function to borrow assets from the vault
//      * @param _amount The amount of assets to borrow
//      * @param _collateral The collateral amount required to borrow
//      */
//     function borrow(uint256 _amount, uint256 _collateral) public nonReentrant {
//         require(_collateral >= (_amount * 150) / 100, "Insufficient collateral");

//         // Transfer collateral from borrower to the vault
//         asset.transferFrom(msg.sender, address(this), _collateral);
//         collateralDeposits[msg.sender] += _collateral;

//         // Approve collateral to Compound
//         asset.approve(address(cToken), _collateral);

//         // Supply collateral to Compound
//         require(cToken.mint(_collateral) == 0, "Compound mint failed");

//         // Borrow assets from Compound
//         require(cToken.borrow(_amount) == 0, "Compound borrow failed");

//         // Transfer borrowed amount to the borrower
//         asset.transfer(msg.sender, _amount);
//         borrowerDebt[msg.sender] += _amount;
//     }

//     /**
//      * @notice Function to repay borrowed assets
//      * @param _amount The amount of assets to repay
//      */
//     function repay(uint256 _amount) public nonReentrant {
//         require(_amount > 0, "Repay amount must be greater than zero");

//         // Transfer the repayment amount from the borrower to the vault
//         asset.transferFrom(msg.sender, address(this), _amount);

//         // Approve repayment to Compound
//         asset.approve(address(cToken), _amount);

//         // Repay the loan in Compound
//         require(cToken.repayBorrow(_amount) == 0, "Compound repay failed");

//         // Update borrower's debt
//         borrowerDebt[msg.sender] -= _amount;

//         // If debt is cleared, release collateral
//         if (borrowerDebt[msg.sender] == 0) {
//             uint256 collateralToReturn = collateralDeposits[msg.sender];
//             collateralDeposits[msg.sender] = 0;
//             require(cToken.redeemUnderlying(collateralToReturn) == 0, "Compound redeem failed");
//             asset.transfer(msg.sender, collateralToReturn);
//         }
//     }

//     /**
//      * @notice Function to deposit tokens using Superform's singleDirectSingleVaultDeposit
//      * @param superformData The data required for the Superform deposit
//      */
//     function superformDeposit(SingleVaultSFData memory superformData) external nonReentrant {
//         // Ensure tokens are approved for the SuperformRouter
//         asset.approve(address(superformRouter), superformData.amount);

//         // Perform the deposit via SuperformRouter
//         superformRouter.singleDirectSingleVaultDeposit(SingleDirectSingleVaultStateReq({
//             superformData: superformData
//         }));
//     }

//     /**
//      * @notice Function to earn interest on assets
//      */
//     function earn() public nonReentrant onlyOwner {
//         // Calculate total interest earned
//         uint256 totalInterest = calculateTotalInterest();

//         // Distribute earnings to shareholders
//         uint256 totalShares = totalSupply();
//         for (address shareholder : getAllShareholders()) {
//             uint256 share = shareHolder[shareholder];
//             uint256 earnings = (totalInterest * share) / totalShares;
//             asset.transfer(shareholder, earnings);
//         }
//     }

//     // Helper function to calculate interest for a given amount
//     function calculateInterest(uint256 _amount) internal view returns (uint256) {
//         uint256 cTokenBalance = cToken.balanceOfUnderlying(address(this));
//         uint256 principal = totalAssets();
//         if (cTokenBalance > principal) {
//             uint256 interest = cTokenBalance - principal;
//             return (_amount * interest) / principal;
//         }
//         return 0;
//     }

//     // Helper function to calculate total interest earned by the vault
//     function calculateTotalInterest() internal view returns (uint256) {
//         uint256 cTokenBalance = cToken.balanceOfUnderlying(address(this));
//         uint256 principal = totalAssets();
//         if (cTokenBalance > principal) {
//             return cTokenBalance - principal;
//         }
//         return 0;
//     }

//     // Returns the total number of assets
//     function totalAssets() public view override returns (uint256) {
//         return asset.balanceOf(address(this));
//     }

//     // Returns the total balance of a user
//     function totalAssetsOfUser(address _user) public view returns (uint256) {
//         return asset.balanceOf(_user);
//     }

//     // Helper function to get all shareholders (this should be implemented based on your specific requirements)
//     function getAllShareholders() internal view returns (address[] memory) {
//         // Implement logic to keep track of all shareholders
//         // This is a placeholder and needs a proper implementation
//         address[] memory shareholders; // Replace with actual logic
//         return shareholders;
//     }
// }
