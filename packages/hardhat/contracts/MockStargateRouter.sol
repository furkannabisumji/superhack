// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./MockLPToken.sol";  // Ensure this points to the correct file path

contract MockStargateRouter {
    IERC20 public underlyingToken;
    MockLPToken public lpToken;

    constructor(address _tokenAddress, address _lpTokenAddress) {
        underlyingToken = IERC20(_tokenAddress);
        lpToken = MockLPToken(_lpTokenAddress);
    }

    function addLiquidity(uint256 poolId, uint256 amount, address to) external {
        require(underlyingToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        lpToken.mint(to, amount);  // Assume 1:1 minting for simplicity
    }

    function removeLiquidity(uint256 poolId, uint256 amount, address to) external {
        lpToken.burn(msg.sender, amount);
        require(underlyingToken.transfer(to, amount), "Underlying transfer failed");
    }
}
