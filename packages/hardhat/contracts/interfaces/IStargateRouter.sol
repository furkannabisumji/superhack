// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IStargateRouter {
    /**
     * @dev Adds liquidity to a pool.
     * @param pid The pool ID to which liquidity is added.
     * @param amount The amount of tokens to add as liquidity.
     * @param to The address that will receive the liquidity provider (LP) tokens.
     */
    function addLiquidity(uint256 pid, uint256 amount, address to) external returns (uint256);

    /**
     * @dev Removes liquidity from a pool.
     * @param pid The pool ID from which liquidity is removed.
     * @param amount The amount of LP tokens to remove.
     * @param to The address that will receive the underlying liquidity removed from the pool.
     */
    function removeLiquidity(uint256 pid, uint256 amount, address to) external returns (uint256);
}
