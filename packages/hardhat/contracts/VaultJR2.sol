// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import "solmate/src/mixins/ERC4626.sol";
import "./interfaces/ICERC20.sol";
import "./interfaces/IStargateFarm.sol";
import "./interfaces/IStargateRouter.sol";

contract TokenVault is ERC4626, ReentrancyGuard {
    ICERC20 public cToken;
    IStargateFarm public stargateFarm;
    IStargateRouter public stargateRouter;
    ERC20 public immutable override asset;
    uint256 public immutable stargatePoolId;

    mapping(address => uint256) public initialCompoundBalance;
    mapping(address => uint256) public initialCompoundTimestamp;
    mapping(address => uint256) public initialStargateBalance;
    mapping(address => uint256) public initialStargateTimestamp;

    event StrategyRebalanced(uint256 compoundMoved, uint256 stargateMoved);
    event DepositedToCompound(address indexed user, uint256 amount);
    event WithdrawnFromCompound(address indexed user, uint256 amount);
    event DepositedToStargate(address indexed user, uint256 amount);
    event WithdrawnFromStargate(address indexed user, uint256 amount);

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
        asset = _asset;
        stargatePoolId = _stargatePoolId;
    }

    function depositToCompound(uint256 amount) public {
        if (initialCompoundBalance[msg.sender] == 0) {
            initialCompoundTimestamp[msg.sender] = block.timestamp;
        }
        initialCompoundBalance[msg.sender] += amount;
        asset.approve(address(cToken), amount);
        cToken.mint(amount);
        emit DepositedToCompound(msg.sender, amount);
    }

    function withdrawFromCompound(uint256 amount) public {
        cToken.redeemUnderlying(amount);
        initialCompoundBalance[msg.sender] -= amount;
        emit WithdrawnFromCompound(msg.sender, amount);
    }

    function depositToStargate(uint256 amount) public {
        if (initialStargateBalance[msg.sender] == 0) {
            initialStargateTimestamp[msg.sender] = block.timestamp;
        }
        initialStargateBalance[msg.sender] += amount;
        asset.approve(address(stargateRouter), amount);
        stargateRouter.addLiquidity(stargatePoolId, amount, address(this));
        emit DepositedToStargate(msg.sender, amount);
    }

    function withdrawFromStargate(uint256 lpTokenAmount) public {
        stargateRouter.removeLiquidity(stargatePoolId, lpTokenAmount, address(this));
        initialStargateBalance[msg.sender] -= lpTokenAmount;
        emit WithdrawnFromStargate(msg.sender, lpTokenAmount);
    }

    function calculateCompoundYield() public view returns (uint256) {
        uint256 initialBalance = initialCompoundBalance[msg.sender];
        uint256 currentBalance = cToken.balanceOfUnderlying(address(this));
        uint256 timeElapsed = block.timestamp - initialCompoundTimestamp[msg.sender];

        if (initialBalance == 0 || timeElapsed == 0) {
            return 0;
        }

        uint256 yieldPerSecond = (currentBalance - initialBalance) * 1e18 / initialBalance / timeElapsed;
        return yieldPerSecond * (365 days);
    }

    function calculateStargateYield() public view returns (uint256) {
        uint256 initialBalance = initialStargateBalance[msg.sender];
        uint256 currentBalance = stargateFarm.checkBalance(stargatePoolId, address(this));
        uint256 timeElapsed = block.timestamp - initialStargateTimestamp[msg.sender];

        if (initialBalance == 0 || timeElapsed == 0) {
            return 0;
        }

        uint256 yieldPerSecond = (currentBalance - initialBalance) * 1e18 / initialBalance / timeElapsed;
        return yieldPerSecond * (365 days);
    }

    function totalAssets() public view override returns (uint256) {
        return cToken.balanceOfUnderlying(address(this)) + stargateFarm.checkBalance(stargatePoolId, address(this));
    }
}
