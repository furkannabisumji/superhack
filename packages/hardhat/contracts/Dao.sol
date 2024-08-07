// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract Dao {
    address owner;
    address newOwner;
    address[] signers;
    uint256 quorum;
    uint256 proposalsCount;
    mapping(uint256 => mapping(address => bool)) hasSigned;
    mapping(address => bool) isValidSigner;
    mapping(uint256 => Proposal) proposal;
    struct Proposal {
        uint256 id;
        address initiator;
        string description;
        uint256 signersCount;
        uint256 timestamp;
        bool isExecuted;
    }

    constructor(address[] memory _validSigners, uint256 _quorum) {
        owner = msg.sender;
        signers = _validSigners;
        quorum = _quorum;

        for (uint8 i = 0; i < _validSigners.length; i++) {
            require(_validSigners[i] != address(0), "INVALID_SIGNER");

            isValidSigner[_validSigners[i]] = true;
        }
    }

    modifier OnlyOwner() {
        require(msg.sender == owner, "UNAUTHORIZED");
        _;
    }

    function transferOwnerShip(address _newOwner) external OnlyOwner {
        newOwner = _newOwner;
    }

    function claimOwnership() external {
        require(msg.sender != address(0), "INVALID_CALLER");
        require(msg.sender == newOwner, "NOT_ASSIGNED");
        owner = msg.sender;
        newOwner = address(0);
    }

    function initiateProposal(string memory _description) external {
        require(msg.sender != address(0), "INVALID_CALLER");

        onlyValidSigner();

        proposalsCount += 1;

        Proposal storage _proposal = proposal[proposalsCount];

        _proposal.id = proposalsCount;
        _proposal.description = _description;
        _proposal.signersCount = _proposal.signersCount + 1;
        _proposal.initiator = msg.sender;
        _proposal.timestamp = block.timestamp;

        hasSigned[proposalsCount][msg.sender] = true;
    }

    function approveProposal(uint256 _pId) external {
        require(_pId <= proposalsCount, "INVALID_PROPOSAL_ID");
        require(msg.sender != address(0), "INVALID_CALLER");

        onlyValidSigner();

        require(!hasSigned[_pId][msg.sender], "ALREADY_SIGN");

        Proposal storage _proposal = proposal[_pId];

        require(!_proposal.isExecuted, "PROPOSAL_EXECUTED");
        require(_proposal.signersCount < quorum, "QUORUM_COUNT_REACHED");

        _proposal.signersCount = _proposal.signersCount + 1;

        hasSigned[_pId][msg.sender] = true;

        if (_proposal.signersCount == quorum) {
            _proposal.isExecuted = true;
        }
    }

    function addValidSigner(address _newSigner) external OnlyOwner {
        require(!isValidSigner[_newSigner], "SIGNER_ALREADY_EXIST");
        isValidSigner[_newSigner] = true;
        signers.push(_newSigner);
    }

    function getAllProposals() external view returns (Proposal[] memory) {
        Proposal[] memory proposals = new Proposal[](proposalsCount);
        uint index;
        for (uint i = 1; i <= proposalsCount; i++) {
            proposals[index] = proposal[i];
            index++;
        }
        return proposals;
    }

    function onlyValidSigner() private view {
        require(isValidSigner[msg.sender], "not valid signer");
    }

    receive() external payable {}

    fallback() external payable {}
}
