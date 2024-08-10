// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
// ICERC20.sol

interface ICERC20 {
    function mint(uint mintAmount) external returns (uint);
    function redeem(uint redeemTokens) external returns (uint);
    function borrow(uint borrowAmount) external returns (uint);
    function repayBorrow(uint repayAmount) external returns (uint);
    function exchangeRateStored() external view returns (uint);
    function balanceOfUnderlying(address owner) external returns (uint);
    function balanceOf(address account) external view returns (uint256);
    function redeemUnderlying(uint redeemAmount) external returns (uint);


   
}
