// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import "solmate/src/mixins/ERC4626.sol";

import "./interfaces/ICERC20.sol";
import "./interfaces/IStargateFarm.sol";
import "./interfaces/IStargateRouter.sol";

contract TokenVault is ERC4626, ReentrancyGuard {

    //This version of the contract allows users to borrow up to 50% of the total value of their deposited assets, considering both Compound and Stargate investments as collateral. It includes functions to borrow and repay assets, alongside the necessary events to track these actions. The loan-to-value (LTV) ratio can be adjusted as per your risk management strategy.


    ICERC20 public cToken;
    IStargateFarm public stargateFarm;
    IStargateRouter public stargateRouter;
    uint256 public immutable stargatePoolId;

    mapping(address => uint256) public initialCompoundBalance;
    mapping(address => uint256) public initialCompoundTimestamp;
    mapping(address => uint256) public initialStargateBalance;
    mapping(address => uint256) public initialStargateTimestamp;
    mapping(address => uint256) public debts; // Track user debts
    mapping(address => bool) public managers; // Manager control

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
        uint256 _stargatePoolId,
        string memory _name,
        string memory _symbol
    ) ERC4626(_asset, _name, _symbol) {
        cToken = _cToken;
        stargateFarm = _stargateFarm;
        stargateRouter = _stargateRouter;
        stargatePoolId = _stargatePoolId;
        managers[msg.sender] = true; // The deployer is the initial manager
    }

    modifier onlyManager() {
        require(managers[msg.sender], "Not a manager");
        _;
    }

    function setManager(address manager, bool status) public onlyManager {
        managers[manager] = status;
    }

    function depositToCompound(uint256 amount) public {
        initialCompoundBalance[msg.sender] += amount;
        asset.approve(address(cToken), amount);
        cToken.mint(amount);
        emit DepositedToCompound(msg.sender, amount);
    }

    function withdrawFromCompound(uint256 amount) public {
        require(initialCompoundBalance[msg.sender] >= amount, "Insufficient balance");
        cToken.redeemUnderlying(amount);
        initialCompoundBalance[msg.sender] -= amount;
        emit WithdrawnFromCompound(msg.sender, amount);
    }

    function depositToStargate(uint256 amount) public {
        initialStargateBalance[msg.sender] += amount;
        asset.approve(address(stargateRouter), amount);
        stargateRouter.addLiquidity(stargatePoolId, amount, address(this));
        emit DepositedToStargate(msg.sender, amount);
    }

    function withdrawFromStargate(uint256 lpTokenAmount) public {
        require(initialStargateBalance[msg.sender] >= lpTokenAmount, "Insufficient balance");
        stargateRouter.removeLiquidity(stargatePoolId, lpTokenAmount, address(this));
        initialStargateBalance[msg.sender] -= lpTokenAmount;
        emit WithdrawnFromStargate(msg.sender, lpTokenAmount);
    }

    function borrow(uint256 amount) public {
        uint256 collateral = getCompoundBalance() + getStargateBalance(); // Using both balances as collateral
        require(amount <= collateral / 2, "Amount exceeds half of collateral value"); // 50% LTV
        debts[msg.sender] += amount;
        asset.transfer(msg.sender, amount);
        emit Borrowed(msg.sender, amount);
    }

    function repay(uint256 amount) public {
        require(debts[msg.sender] >= amount, "Amount exceeds debt");
        asset.transferFrom(msg.sender, address(this), amount);
        debts[msg.sender] -= amount;
        emit Repaid(msg.sender, amount);
    }

    function rebalanceInvestments() public onlyManager {
        uint256 compoundYield = calculateCompoundYield();
        uint256 stargateYield = calculateStargateYield();
        uint256 amountToShift;

        if (compoundYield > stargateYield) {
            amountToShift = (getStargateBalance() * 10) / 100; // Shift 10% from Stargate to Compound
            withdrawFromStargate(amountToShift);
            depositToCompound(amountToShift);
        } else {
            amountToShift = (getCompoundBalance() * 10) / 100; // Shift 10% from Compound to Stargate
            withdrawFromCompound(amountToShift);
            depositToStargate(amountToShift);
        }

        emit StrategyRebalanced(getCompoundBalance(), getStargateBalance());
    }

    function calculateCompoundYield() public view returns (uint256) {
        uint256 initialBalance = initialCompoundBalance[msg.sender];
        uint256 currentBalance = getCompoundBalance();
        uint256 timeElapsed = block.timestamp - initialCompoundTimestamp[msg.sender];

        if (initialBalance == 0 || timeElapsed == 0) {
            return 0;
        }

        return (((currentBalance - initialBalance) * 1e18) / initialBalance / timeElapsed) * 365 days;
    }

    function calculateStargateYield() public view returns (uint256) {
        uint256 initialBalance = initialStargateBalance[msg.sender];
        uint256 currentBalance = getStargateBalance();
        uint256 timeElapsed = block.timestamp - initialStargateTimestamp[msg.sender];

        if (initialBalance == 0 || timeElapsed == 0) {
            return 0;
        }

        return (((currentBalance - initialBalance) * 1e18) / initialBalance / timeElapsed) * 365 days;
    }

    function getCompoundBalance() public view returns (uint256) {
        return cToken.balanceOfUnderlying(address(this));
    }

    function getStargateBalance() public view returns (uint256) {
        return stargateFarm.checkBalance(stargatePoolId, address(this));
    }

    function totalAssets() public view override returns (uint256) {
        return getCompoundBalance() + getStargateBalance();
    }
}
