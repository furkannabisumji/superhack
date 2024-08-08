// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

contract Governance {
    address owner;
    address newOwner;
    uint256 proposalsCount;
    mapping(uint256 => mapping(address => bool)) hasSigned;
    mapping(uint256 => Proposal) proposal;
    enum VoteState {
        TRUE,
        FALSE
    }
    struct Vote {
        address user;
        VoteState vote;
    }
    struct Proposal {
        uint256 id;
        address initiator;
        string description;
        uint256 timestamp;
        Vote[] votes;
    }

    constructor() {
        owner = msg.sender;
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

        proposalsCount += 1;

        Proposal storage _proposal = proposal[proposalsCount];

        _proposal.id = proposalsCount;
        _proposal.description = _description;
        _proposal.initiator = msg.sender;
        _proposal.timestamp = block.timestamp;
    }

    function approveProposal(uint256 _pId, VoteState _voteState) external {
        require(_pId <= proposalsCount, "INVALID_PROPOSAL_ID");
        require(msg.sender != address(0), "INVALID_CALLER");

        require(!hasSigned[_pId][msg.sender], "ALREADY_SIGN");

        Proposal storage _proposal = proposal[_pId];

        _proposal.votes.push(Vote({user: msg.sender, vote: _voteState}));

        hasSigned[_pId][msg.sender] = true;
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

    receive() external payable {}

    fallback() external payable {}
}
