// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Importing OpenZeppelin's SafeMath Implementation
import 'https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol';

contract Project {
    using SafeMath for uint256;

    // data structures 
    enum State {
        Fundraising,
        Expire,
        Successful
    }

    /// state variables 
    address payable public creator;
    uint256 public amountGoal; /// // required to reach at least this much, else everyone gets refund
    uint256 public completingTime;
    uint256 public currentBalance;
    uint256 public raiseBy;
    string public title;
    string public description;
    State public state = State.Fundraising; // intialize on creating project
    mapping(address => uint256) public contributions;

    // Event happen when we recive a funding 
    event FundingReceived(address contributor, uint amount, uint currentTotal); 

    /// event that will be emitted when the project starter has recevied the funds 
    event CreatorPaid(address recipient); 

    //// modifier to check current state 
    modifier inState( State _state) {
        require(state == _state)
        _;
    } 

    //// modifier to check if the function caller is the project creator 
    modifier isCreator() {
        require(msg.sender == creator);
        _;
    }

    

}