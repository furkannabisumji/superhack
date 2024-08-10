// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockStargateRouter {
    function addLiquidity(uint256 poolId, uint256 amount, address to) external {
        // Assume the token has been approved for transfer
        ERC20(0x123...).transferFrom(msg.sender, address(this), amount);
        // Mock behavior, such as issuing LP tokens or similar actions
    }

    function removeLiquidity(uint256 poolId, uint256 amount, address to) external {
        // Return the corresponding amount of underlying asset
        ERC20(0x123...).transfer(to, amount);
    }
}
