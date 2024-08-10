// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MockStargateRouter {
    IERC20 public underlyingToken;

    // Constructor to set the underlying token address
    constructor(address _tokenAddress) {
        underlyingToken = IERC20(_tokenAddress);
    }

    // Simulates adding liquidity to a pool
    function addLiquidity(uint256 poolId, uint256 amount, address to) external {
        // Assume the token has been approved for transfer
        underlyingToken.transferFrom(msg.sender, address(this), amount);
        // Mock behavior, such as issuing LP tokens or similar actions
        // In a real scenario, you might want to mint mock LP tokens here
    }

    // Simulates removing liquidity from a pool
    function removeLiquidity(uint256 poolId, uint256 amount, address to) external {
        // Return the corresponding amount of underlying asset
        underlyingToken.transfer(to, amount);
    }
}
