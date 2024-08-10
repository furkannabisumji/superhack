// SPDX-License-Identifier: MIT
 pragma solidity ^0.8.24;

// import "solmate/src/mixins/ERC4626.sol";
// // import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";

// import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

// import "@openzeppelin/contracts/access/Ownable.sol";

// import "./interfaces/ICERC20.sol"; // Interface for Compound cToken
// import "./interfaces/ISuperformRouter.sol"; // Interface for SuperformRouter

// interface IStargatePool {
//     function addLiquidity(uint amount) external returns (uint lpTokens);
//     function removeLiquidity(uint lpTokenAmount) external returns (uint underlyingAmount);
// }


// contract TokenVault is ERC4626, ReentrancyGuard {

    
//     mapping(address => uint256) public shareHolder;
//     mapping(address => uint256) public debt; // Track borrowed amounts for each user

//     IStargatePool public stargatePool;

//     ICERC20 public cToken;
//     ISuperformRouter public superformRouter;
//     ERC20 public borrowAsset; // The asset that can be borrowed

//     uint256 public constant COLLATERAL_FACTOR = 75; // Example collateral factor of 75%
//     uint256 public constant LIQUIDATION_THRESHOLD = 85; // Example liquidation threshold
//     // uint256 private totalSupply; //test

//     constructor(
//         ERC20 _asset,
//         ICERC20 _cToken,
//         ISuperformRouter _superformRouter,
//         ERC20 _borrowAsset,
//         string memory _name,
//         string memory _symbol
//     ) ERC4626(_asset, _name, _symbol) {
//         cToken = _cToken;
//         superformRouter = _superformRouter;
//         borrowAsset = _borrowAsset;
//     }

//     /**
//      * @notice function to deposit assets and receive vault tokens in exchange
//      * @param _assets amount of the asset token
//      */
//     function _deposit(uint _assets) public nonReentrant {
//         require(_assets > 0, "Deposit less than Zero");

//         // Transfer asset from user to vault
//         asset.transferFrom(msg.sender, address(this), _assets);

//         // Deposit into Compound
//         asset.approve(address(cToken), _assets);
//         require(cToken.mint(_assets) == 0, "Compound deposit failed");

//         // Update the total supply of vault tokens
//         totalSupply += _assets;

//         deposit(_assets, msg.sender);
//         shareHolder[msg.sender] += _assets;
//     }

//     /**
//      * @notice Function to allow msg.sender to withdraw their deposit plus accrued interest
//      * @param _shares amount of shares the user wants to convert
//      * @param _receiver address of the user who will receive the assets
//      */
//     function _withdraw(uint _shares, address _receiver) public nonReentrant {
//         require(_shares > 0, "withdraw must be greater than Zero");
//         require(_receiver != address(0), "Zero Address");
//         require(shareHolder[msg.sender] > 0, "Not a share holder");
//         require(shareHolder[msg.sender] >= _shares, "Not enough shares");

//         // Calculate the amount of cTokens needed
//         uint256 cTokensRequired = (_shares * cToken.exchangeRateStored()) /
//             1e18;

//         // Redeem cTokens for underlying asset
//         require(
//             cToken.redeem(cTokensRequired) == 0,
//             "Compound redemption failed"
//         );

//         uint256 assets = asset.balanceOf(address(this));
//         redeem(assets, _receiver, msg.sender);
//         shareHolder[msg.sender] -= _shares;

//         // Update the total supply of vault tokens
//         totalSupply -= _shares;
//     }

//     /**
//      * @notice Borrow and earn function using collateral in Compound
//      * @param borrowAmount The amount of the borrow asset to borrow
//      */
//     function borrowAndEarn(uint256 borrowAmount) public {
//         // Check user's collateral value
//         uint256 collateralValue = calculateCollateralValue(msg.sender);

//         // Ensure sufficient collateral
//         require(
//             collateralValue >= (borrowAmount * 1e18) / COLLATERAL_FACTOR,
//             "Insufficient collateral"
//         );

//         // Borrow asset using Compound
//         require(cToken.borrow(borrowAmount) == 0, "Compound borrow failed");

//         // Record debt
//         debt[msg.sender] += borrowAmount;

//         // Use borrowed asset in Superform for earning yield
//         borrowAsset.approve(address(superformRouter), borrowAmount);
//         superformRouter.provideLiquidity(
//             address(borrowAsset),
//             borrowAmount,
//             msg.sender
//         );
//     }

//     /**
//      * @notice Repay borrowed assets
//      * @param repayAmount The amount of the borrowed asset to repay
//      */
//     function repayBorrow(uint256 repayAmount) public {
//         // Transfer repay amount from user to vault
//         borrowAsset.transferFrom(msg.sender, address(this), repayAmount);

//         // Repay borrowed amount to Compound
//         require(cToken.repayBorrow(repayAmount) == 0, "Repayment failed");

//         // Reduce debt
//         debt[msg.sender] -= repayAmount;
//     }

//     /**
//      * @notice Check and handle potential liquidation
//      */
//     function checkAndHandleLiquidation(address user) public {
//         uint256 collateralValue = calculateCollateralValue(user);
//         uint256 borrowValue = debt[user];

//         // If the borrow value exceeds the liquidation threshold, perform liquidation
//         require(
//             borrowValue > (collateralValue * LIQUIDATION_THRESHOLD) / 100,
//             "No liquidation needed"
//         );

//         // Logic for liquidation: Sell a portion of the collateral to repay the debt
//         uint256 liquidationAmount = ((borrowValue -
//             (collateralValue * LIQUIDATION_THRESHOLD) /
//             100) * 100) / LIQUIDATION_THRESHOLD;
//         require(cToken.redeem(liquidationAmount) == 0, "Liquidation failed");

//         // Repay the debt with the liquidation proceeds
//         require(cToken.repayBorrow(liquidationAmount) == 0, "Repayment failed");
//         debt[user] -= liquidationAmount;
//     }

//     /**
//      * @notice Calculate collateral value of a user
//      * @param user The address of the user
//      * @return The calculated collateral value
//      */
//     function calculateCollateralValue(
//         address user
//     ) public view returns (uint256) {
//         uint256 userShares = shareHolder[user];
//         uint256 cTokensBalance = (cToken.balanceOfUnderlying(address(this)) *
//             userShares) / totalAssets();
//         uint256 collateralValue = (cTokensBalance *
//             cToken.exchangeRateStored()) / 1e18;
//         return collateralValue;
//     }

//     /**
//      * @notice Calculate the current yield of the strategy
//      * @return The calculated yield as a percentage
//      */
//     function calculateYield() public view returns (uint256) {
//         uint256 initialAssets = totalAssets(); // The initial deposit value
//         uint256 currentAssets = asset.balanceOf(address(this)); // Current asset balance
//         uint256 totalCtokens = cToken.balanceOf(address(this)); // Total cTokens representing interest

//         // Calculate current value including cTokens converted back to underlying assets
//         uint256 cTokensValue = (totalCtokens * cToken.exchangeRateStored()) /
//             1e18;
//         uint256 currentValue = currentAssets + cTokensValue;

//         // Calculate the yield
//         if (initialAssets == 0) {
//             return 0; // Avoid division by zero
//         }

//         uint256 yield = ((currentValue - initialAssets) * 100) / initialAssets;
//         return yield;
//     }

//     function totalAssets() public view override returns (uint256) {
//         return asset.balanceOf(address(this));
//     }

//     function totalAssetsOfUser(address _user) public view returns (uint256) {
//         return asset.balanceOf(_user);
//     }

//     function _totalSupply() public view returns (uint256) {
//         return totalSupply;
//     }
// }
