// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

import "./interfaces/JIERC20.sol";  // Interface for interacting with Compound tokens
import "./interfaces/IStargateFarm.sol";  // Interface for interacting with Stargate protocol
import "./interfaces/IStargateRouter.sol";  // Interface for Stargate's router

contract TokenVault is ReentrancyGuard {
    JIERC20 public token;
    JIERC20 public cToken;  // Compound token interface
    IStargateFarm public stargateFarm;
    IStargateRouter public stargateRouter;
    AggregatorV3Interface public volatilityOracle;
    uint256 public immutable stargatePoolId;

    mapping(address => uint256) public debts;
    mapping(address => bool) public managers;

    uint256 public maxLTV = 50;

    event DepositedToCompound(address indexed user, uint256 amount);
    event WithdrawnFromCompound(address indexed user, uint256 amount);
    event DepositedToStargate(address indexed user, uint256 amount);
    event WithdrawnFromStargate(address indexed user, uint256 amount);
    event StrategyRebalanced(uint256 compoundMoved, uint256 stargateMoved);
    event Borrowed(address indexed user, uint256 amount);
    event Repaid(address indexed user, uint256 amount);

    constructor(
        JIERC20 _token,
        JIERC20 _cToken,
        IStargateFarm _stargateFarm,
        IStargateRouter _stargateRouter,
        AggregatorV3Interface _volatilityOracle,
        uint256 _stargatePoolId
    ) {
        token = _token;
        cToken = _cToken;
        stargateFarm = _stargateFarm;
        stargateRouter = _stargateRouter;
        volatilityOracle = _volatilityOracle;
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
        token.approve(address(cToken), amount);
        cToken.mint(amount);
        emit DepositedToCompound(msg.sender, amount);
    }

    function withdrawFromCompound(uint256 amount) public {
        cToken.redeem(amount);
        emit WithdrawnFromCompound(msg.sender, amount);
    }

    function depositToStargate(uint256 amount) public {
        token.approve(address(stargateRouter), amount);
        stargateRouter.addLiquidity(stargatePoolId, amount, address(this));
        emit DepositedToStargate(msg.sender, amount);
    }

    function withdrawFromStargate(uint256 amount) public {
        stargateRouter.removeLiquidity(stargatePoolId, amount, address(this));
        emit WithdrawnFromStargate(msg.sender, amount);
    }

    function rebalanceInvestments() public onlyManager {
        uint256 cTokenBalance = cToken.balanceOfUnderlying(address(this));
        uint256 stargateBalance = stargateFarm.checkBalance(stargatePoolId, address(this));
        if (cTokenBalance > stargateBalance) {
            uint256 amountToShift = (cTokenBalance - stargateBalance) / 2;
            withdrawFromCompound(amountToShift);
            depositToStargate(amountToShift);
        } else if (stargateBalance > cTokenBalance) {
            uint256 amountToShift = (stargateBalance - cTokenBalance) / 2;
            withdrawFromStargate(amountToShift);
            depositToCompound(amountToShift);
        }
        emit StrategyRebalanced(cTokenBalance, stargateBalance);
    }

    function totalAssets() public view returns (uint256) {
        return token.balanceOf(address(this)) + cToken.balanceOfUnderlying(address(this)) + stargateFarm.checkBalance(stargatePoolId, address(this));
    }
}
