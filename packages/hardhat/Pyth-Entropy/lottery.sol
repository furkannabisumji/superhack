// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@pythnetwork/entropy-sdk-solidity/IEntropyConsumer.sol";
import "@pythnetwork/entropy-sdk-solidity/IEntropy.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LotteryGame is IEntropyConsumer, Ownable {
    IEntropy public entropy;
    address public provider;
    uint64 public sequenceNumber;
    bytes32 public randomNumber;
    bool public numberRequested;
    bool public numberFulfilled;

    mapping(address => bool) public participants;

    event LotteryEntered(address participant);
    event LotteryWinner(address winner);
    event RandomNumberRequested(uint64 sequenceNumber);
    event RandomNumberFulfilled(uint64 sequenceNumber, bytes32 randomNumber);

    constructor(address _entropyAddress) {
        entropy = IEntropy(_entropyAddress);
        provider = entropy.getDefaultProvider();
    }

    function enterLottery() external payable {
        require(msg.value == 1 ether, "Entry fee is 1 ETH");
        require(!participants[msg.sender], "Already entered");
        
        participants[msg.sender] = true;
        emit LotteryEntered(msg.sender);
    }

    function requestRandomNumber() external onlyOwner {
        require(!numberRequested, "Random number already requested");
        
        bytes32 clientRandomNumber = keccak256(abi.encodePacked(block.timestamp, block.difficulty));
        uint fee = entropy.getFee(provider);
        require(address(this).balance >= fee, "Insufficient contract balance");
        
        sequenceNumber = entropy.requestWithCallback{value: fee}(provider, clientRandomNumber);
        numberRequested = true;
        emit RandomNumberRequested(sequenceNumber);
    }

    function entropyCallback(
        uint64 _sequenceNumber,
        address _providerAddress,
        bytes32 _randomNumber
    ) internal override {
        require(_sequenceNumber == sequenceNumber, "Invalid sequence number");
        
        randomNumber = _randomNumber;
        numberFulfilled = true;
        emit RandomNumberFulfilled(_sequenceNumber, _randomNumber);
        
        selectWinner();
    }

    function selectWinner() internal {
        require(numberFulfilled, "Random number not yet fulfilled");
        require(numberRequested, "Random number not requested");
        
        address[] memory participantsList = getParticipantsList();
        require(participantsList.length > 0, "No participants");

        uint winnerIndex = uint(uint256(randomNumber) % participantsList.length);
        address winner = participantsList[winnerIndex];

        payable(winner).transfer(address(this).balance);
        emit LotteryWinner(winner);

        // Reset the lottery
        resetLottery();
    }

    function getParticipantsList() internal view returns (address[] memory) {
        address[] memory list = new address[](getTotalParticipants());
        uint index = 0;
        for (uint i = 0; i < list.length; i++) {
            if (participants[list[i]]) {
                list[index++] = list[i];
            }
        }
        return list;
    }

    function getTotalParticipants() internal view returns (uint) {
        // Implement a function to count total participants
    }

    function resetLottery() internal {
        numberRequested = false;
        numberFulfilled = false;
        delete randomNumber;
        // Reset participants mapping
        for (uint i = 0; i < getTotalParticipants(); i++) {
            delete participants[getParticipantsList()[i]];
        }
    }

    function withdrawFunds() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    receive() external payable {}
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Lottery is Ownable {
    IERC20 public cakeToken;
    uint256 public ticketPrice = 5 * 1e18; // 5 CAKE
    uint256 public prizePot;
    uint256 public drawNumber = 1;
    uint256 public roundNumber = 1352; // Example round number
    mapping(uint256 => address[]) public tickets;
    mapping(uint256 => address) public winners;
    mapping(uint256 => uint256[]) public winningNumbers; // Store winning numbers
    mapping(uint256 => RoundDetails) public roundDetails; // Store round details

    struct RoundDetails {
        uint256 prizePot;
        uint256 totalPlayers;
        uint256[] winningNumbers;
        mapping(uint256 => uint256) prizeDistribution; // Map number of matches to prize
    }

    event TicketsPurchased(address indexed buyer, uint256 indexed drawNumber, uint256 ticketCount);
    event DrawResult(uint256 indexed drawNumber, address indexed winner, uint256 prize);
    event RoundDetailsUpdated(uint256 indexed roundNumber, uint256 prizePot, uint256 totalPlayers, uint256[] winningNumbers);

    constructor(address _cakeToken) {
        cakeToken = IERC20(_cakeToken);
    }

    function buyTickets(uint256 ticketCount) external {
        require(ticketCount > 0, "Invalid ticket count");
        uint256 cost = ticketPrice * ticketCount;
        require(cakeToken.balanceOf(msg.sender) >= cost, "Insufficient CAKE balance");
        cakeToken.transferFrom(msg.sender, address(this), cost);

        prizePot += cost;
        for (uint256 i = 0; i < ticketCount; i++) {
            tickets[drawNumber].push(msg.sender);
        }

        emit TicketsPurchased(msg.sender, drawNumber, ticketCount);
    }

    function drawLottery() external onlyOwner {
        require(tickets[drawNumber].length > 0, "No tickets sold");
        address winner = tickets[drawNumber][random() % tickets[drawNumber].length];
        uint256 prize = prizePot;

        cakeToken.transfer(winner, prize);
        emit DrawResult(drawNumber, winner, prize);

        // Store round details
        roundDetails[roundNumber].prizePot = prizePot;
        roundDetails[roundNumber].totalPlayers = tickets[drawNumber].length;
        roundDetails[roundNumber].winningNumbers = [random() % 10, random() % 10, random() % 10, random() % 10, random() % 10, random() % 10]; // Example

        drawNumber++;
        roundNumber++;
        prizePot = 0;
        delete tickets[drawNumber - 1];

        emit RoundDetailsUpdated(roundNumber, prizePot, tickets[drawNumber].length, roundDetails[roundNumber].winningNumbers);
    }

    function checkWinner(uint256 _drawNumber) external view returns (address) {
        return winners[_drawNumber];
    }

    function getRoundDetails(uint256 _roundNumber) external view returns (
        uint256 prizePot,
        uint256 totalPlayers,
        uint256[] memory winningNumbers
    ) {
        RoundDetails storage details = roundDetails[_roundNumber];
        return (details.prizePot, details.totalPlayers, details.winningNumbers);
    }

    function random() internal view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, tickets[drawNumber])));
    }

    function withdrawFunds() external onlyOwner {
        cakeToken.transfer(owner(), cakeToken.balanceOf(address(this)));
    }
}
