// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IStargateFarm {
    /**
     * @dev Stakes LP tokens to earn rewards.
     * @param pid The ID of the pool in which to stake LP tokens.
     * @param amount The amount of LP tokens to stake.
     */
    function stake(uint256 pid, uint256 amount) external;

    /**
     * @dev Unstakes LP tokens.
     * @param pid The ID of the pool from which to unstake LP tokens.
     * @param amount The amount of LP tokens to unstake.
     */
    function unstake(uint256 pid, uint256 amount) external;

    /**
     * @dev Claims earned rewards for a specific pool.
     * @param pid The ID of the pool for which to claim rewards.
     * @param to The address that will receive the claimed rewards.
     */
    function claimRewards(uint256 pid, address to) external;

    function checkBalance(uint256 pid, address user) external view returns (uint256);

}
