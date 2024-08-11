// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "solmate/src/mixins/ERC4626.sol";
import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

import "./interfaces/JIERC20.sol";
import "./interfaces/IStargateFarm.sol";
import "./interfaces/IStargateRouter.sol";

contract TokenVault is ERC4626(ERC20), ReentrancyGuard {
    // Interfaces for interacting with external protocols and oracles
    ICERC20 public cToken;
    IStargateFarm public stargateFarm;
    IStargateRouter public stargateRouter;
    AggregatorV3Interface public volatilityOracle;
    uint256 public immutable stargatePoolId;

    // User balance and management tracking
    mapping(address => uint256) public initialCompoundBalance;
    mapping(address => uint256) public initialStargateBalance;
    mapping(address => uint256) public debts; // Track user debts
    mapping(address => bool) public managers; // Manager control

    // Collateralization and risk management
    uint256 public maxLTV = 50; // Loan to Value ratio

    // Events for logging contract activities
    event DepositedToCompound(address indexed user, uint256 amount);
    event WithdrawnFromCompound(address indexed user, uint256 amount);
    event DepositedToStargate(address indexed user, uint256 amount);
    event WithdrawnFromStargate(address indexed user, uint256 amount);
    event StrategyRebalanced(uint256 compoundMoved, uint256 stargateMoved);
    event Borrowed(address indexed user, uint256 amount);
    event Repaid(address indexed user, uint256 amount);

    constructor(
        ERC20 _asset,
        ICERC20 _cToken,
        IStargateFarm _stargateFarm,
        IStargateRouter _stargateRouter,
        AggregatorV3Interface _volatilityOracle,
        uint256 _stargatePoolId,
        string memory _name,
        string memory _symbol
    ) ERC4626(_asset, _name, _symbol) {
        cToken = _cToken;
        stargateFarm = _stargateFarm;
        stargateRouter = _stargateRouter;
        volatilityOracle = _volatilityOracle;
        stargatePoolId = _stargatePoolId;
        managers[msg.sender] = true; // The deployer is the initial manager
    }

    // Ensures only managers can perform certain actions
    modifier onlyManager() {
        require(managers[msg.sender], "Not a manager");
        _;
    }

    // Sets or revokes manager status
    function setManager(address manager, bool status) public onlyManager {
        managers[manager] = status;
    }

    // Deposits assets into the vault, calculating the corresponding shares
    function deposit(uint256 assets, address receiver) public override returns (uint256 shares) {
        shares = super.deposit(assets, receiver);
        require(shares == convertToShares(assets), "Conversion mismatch");
        return shares;
    }

    // Redeems shares from the vault, returning the corresponding assets
    function redeem(uint256 shares, address receiver, address owner) public override returns (uint256 assets) {
        assets = super.redeem(shares, receiver, owner);
        require(assets == convertToAssets(shares), "Asset conversion mismatch");
        return assets;
    }

    // Converts asset amount to shares based on current vault economics
    function convertToShares(uint256 assets) public view override returns (uint256) {
        uint256 totalAssets = totalAssets();
        uint256 totalSupply = totalSupply();
        return (totalAssets == 0 || totalSupply == 0) ? assets : assets * totalSupply / totalAssets;
    }

    // Converts share amount to assets based on current vault economics
    function convertToAssets(uint256 shares) public view override returns (uint256) {
        uint256 totalAssets = totalAssets();
        uint256 totalSupply = totalSupply();
        return (totalSupply == 0) ? shares : shares * totalAssets / totalSupply;
    }

    // Allows users to borrow against their holdings up to a maximum LTV ratio
    function borrow(uint256 amount) public {
        uint256 collateral = totalAssets();
        require(amount <= collateral * maxLTV / 100, "Amount exceeds allowable borrowing limit");
        debts[msg.sender] += amount;
        asset.transfer(msg.sender, amount);
        emit Borrowed(msg.sender, amount);
    }

    // Allows users to repay their borrowed amounts
    function repay(uint256 amount) public {
        require(debts[msg.sender] >= amount, "Amount exceeds debt");
        require(asset.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        debts[msg.sender] -= amount;
        emit Repaid(msg.sender, amount);
    }

    // Adjusts collateral thresholds based on external market conditions
    function adjustCollateralThresholds() public onlyManager {
        uint256 marketVolatilityIndex = getMarketVolatility();
        if (marketVolatilityIndex > 75) {
            maxLTV = 30;  // Lower LTV in high-risk conditions
        } else if (marketVolatilityIndex < 25) {
            maxLTV = 70;  // Higher LTV in stable conditions
        } else {
            maxLTV = 50;  // Default LTV
        }
    }

    // Retrieves the current market volatility index from a Chainlink Oracle
    function getMarketVolatility() public view returns (uint256) {
        (,int256 price,,,) = volatilityOracle.latestRoundData();
        return uint256(price);
    }

    // Retrieves the balance of assets managed through Compound
    function getCompoundBalance() public view returns (uint256) {
        return cToken.balanceOfUnderlying(address(this));
    }

    // Retrieves the balance of assets managed through Stargate
    function getStargateBalance() public view returns (uint256) {
        return stargateFarm.checkBalance(stargatePoolId, address(this));
    }

    // Returns the total assets under management in the vault
    function totalAssets() public view override returns (uint256) {
        return getCompoundBalance() + getStargateBalance();
    }
}
