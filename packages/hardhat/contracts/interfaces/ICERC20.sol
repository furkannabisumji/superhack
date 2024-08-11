// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface ICERC20 {
    function mint(uint256 mintAmount) external returns (uint256);
    function redeemUnderlying(uint256 redeemAmount) external returns (uint256);
    function borrow(uint256 borrowAmount) external returns (uint256);
    function repayBorrow(uint256 repayAmount) external returns (uint256);
    function balanceOf(address owner) external view returns (uint256);
    function balanceOfUnderlying(address owner) external view returns (uint256);
}
