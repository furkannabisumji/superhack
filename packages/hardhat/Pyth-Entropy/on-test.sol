
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IEntropy {
    function requestRandomNumber(uint256 randomNumber) external returns (uint256);
}

contract RandomNumberConsumer {
    IEntropy public entropyContract;

    // Event to emit when a random number is received
    event RandomNumberReceived(uint256 indexed sequenceNumber, uint256 randomNumber);

    constructor(address _entropyContractAddress) {
        entropyContract = IEntropy(_entropyContractAddress);
    }

    // Function to request a random number from the Entropy contract
    function requestRandomNumber(uint256 randomNumber) public returns (uint256) {
        uint256 sequenceNumber = entropyContract.requestRandomNumber(randomNumber);
        return sequenceNumber;
    }

    // Callback function to receive the random number from the Entropy provider
    function fulfillRandomNumber(uint256 sequenceNumber, uint256 randomNumber) external {
        // Ensure that the caller is the Entropy contract (you may want to add more checks)
        require(msg.sender == address(entropyContract), "Only Entropy can call this function");

        // Emit an event with the received random number
        emit RandomNumberReceived(sequenceNumber, randomNumber);
    }
}