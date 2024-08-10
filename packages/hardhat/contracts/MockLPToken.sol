// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MockLPToken is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function mint(address to, uint256 amount) public  {
        _mint(to, amount * (10 ** decimals()));
    }

    function burn(address from, uint256 amount) public  {
        _burn(from, amount * (10 ** decimals()));
    }
}
