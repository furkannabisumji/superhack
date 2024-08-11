// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@pythnetwork/entropy-sdk-solidity/IEntropyConsumer.sol";
import "@pythnetwork/entropy-sdk-solidity/IEntropy.sol";

contract RandomNumberGenerator is IEntropyConsumer {
    IEntropy public entropy;
    address public provider;
    mapping(uint64 => bool) public requestFulfilled;
    mapping(uint64 => bytes32) public randomNumbers;
    mapping(uint64 => address) public requestInitiator;

    event RandomNumberRequested(uint64 sequenceNumber, address requester);
    event RandomNumberFulfilled(uint64 sequenceNumber, bytes32 randomNumber);

    constructor(address entropyAddress) {
        entropy = IEntropy(entropyAddress);
        provider = entropy.getDefaultProvider();
    }

    // Generate a 32-byte random number on the client side
    function requestRandomNumber(bytes32 clientRandomNumber) external payable {
        uint fee = entropy.getFee(provider);
        require(msg.value >= fee, "Insufficient fee provided");

        uint64 sequenceNumber = entropy.requestWithCallback{value: fee}(provider, clientRandomNumber);

        // Store the request initiator and emit an event
        requestInitiator[sequenceNumber] = msg.sender;
        emit RandomNumberRequested(sequenceNumber, msg.sender);
    }

    // Required by the IEntropyConsumer interface
    function getEntropy() internal view override returns (address) {
        return address(entropy);
    }

    // Entropy callback function to receive the random number
    function entropyCallback(
        uint64 sequenceNumber,
        address providerAddress,
        bytes32 randomNumber
    ) internal override {
        // Mark the request as fulfilled and store the random number
        requestFulfilled[sequenceNumber] = true;
        randomNumbers[sequenceNumber] = randomNumber;

        emit RandomNumberFulfilled(sequenceNumber, randomNumber);
    }

    // Function to reveal the random number if callback fails
    function revealRandomNumberManually(
        uint64 sequenceNumber,
        bytes32 userRandomNumber,
        bytes32 providerRevelation
    ) external {
        require(!requestFulfilled[sequenceNumber], "Request already fulfilled");
        require(msg.sender == requestInitiator[sequenceNumber], "Only the initiator can reveal");

        entropy.revealWithCallback(provider, sequenceNumber, userRandomNumber, providerRevelation);
    }

    // Fallback function to receive ETH
    receive() external payable {}

    // Function to withdraw funds from the contract
    function withdrawFunds() external {
        payable(msg.sender).transfer(address(this).balance);
    }
}

