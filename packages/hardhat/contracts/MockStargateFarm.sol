// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MockStargateFarm {
    mapping(uint256 => mapping(address => uint256)) public balances;
    mapping(uint256 => uint256) public yields;

    function setMockYield(uint256 poolId, uint256 _yield) external {
        yields[poolId] = _yield;
    }

    function addLiquidity(uint256 poolId, uint256 amount, address depositor) external {
        balances[poolId][depositor] += amount;
    }

    function removeLiquidity(uint256 poolId, uint256 amount, address depositor) external {
        balances[poolId][depositor] -= amount;
    }

    function checkBalance(uint256 poolId, address owner) external view returns (uint256) {
        return balances[poolId][owner] + yields[poolId]; // Include some yield
    }
}
