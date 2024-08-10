// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockCToken is ERC20 {
    ERC20 public underlying;
    uint256 public yield;

    constructor(address _underlying) ERC20("Mock CToken", "mCT") {
        underlying = ERC20(_underlying);
    }

    function setMockYield(uint256 _yield) external {
        yield = _yield;
    }

    function mint(uint256 amount) external returns (uint256) {
        underlying.transferFrom(msg.sender, address(this), amount);
        _mint(msg.sender, amount);
        return 0;
    }

    function redeemUnderlying(uint256 amount) external returns (uint256) {
        _burn(msg.sender, amount);
        underlying.transfer(msg.sender, amount + yield); // Simulate yield
        return 0;
    }

    function balanceOfUnderlying(address owner) external view returns (uint256) {
        return balanceOf(owner) + yield;
    }
}
