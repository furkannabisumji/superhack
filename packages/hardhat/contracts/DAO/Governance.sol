// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DAO {
    // State variables
    address public admin;
    uint256 public proposalCount;
    uint256 public votingPeriod = 1 weeks; // Set voting period (e.g., 1 week)

    // Enums
    enum ProposalStatus { Pending, InVoting, Closed }

    // Structs
    struct Proposal {
        string title;
        string description;
        ProposalStatus status;
        uint256 yesVotes;
        uint256 noVotes;
        uint256 endTime;
    }

    // Mappings
    mapping(uint256 => Proposal) public proposals;
    mapping(address => bool) public members;
    mapping(address => mapping(uint256 => bool)) public votes; // Track votes per user and proposal

    // Events
    event ProposalCreated(uint256 proposalId, string title, string description);
    event VoteCasted(uint256 proposalId, bool support);

    // Modifiers
    modifier onlyAdmin() {
        require(msg.sender == admin, "Not an admin");
        _;
    }

    modifier onlyMember() {
        require(members[msg.sender], "Not a member");
        _;
    }

    // Constructor
    constructor() {
        admin = msg.sender; // Set contract creator as admin
    }

    // Admin functions
    function addMember(address _member) external onlyAdmin {
        members[_member] = true;
    }

    function removeMember(address _member) external onlyAdmin {
        members[_member] = false;
    }

    // Proposal functions
    function createProposal(string memory _title, string memory _description) public onlyMember {
        uint256 proposalId = proposalCount++;
        proposals[proposalId] = Proposal({
            title: _title,
            description: _description,
            status: ProposalStatus.Pending,
            yesVotes: 0,
            noVotes: 0,
            endTime: block.timestamp + votingPeriod
        });
        emit ProposalCreated(proposalId, _title, _description);
    }

    function updateProposalStatus(uint256 _proposalId) public onlyMember {
        Proposal storage prop = proposals[_proposalId];
        if (block.timestamp > prop.endTime && prop.status == ProposalStatus.Pending) {
            prop.status = ProposalStatus.InVoting;
        }
        if (block.timestamp > prop.endTime + votingPeriod && prop.status == ProposalStatus.InVoting) {
            prop.status = ProposalStatus.Closed;
        }
    }

    function getProposal(uint256 _proposalId) public view returns (string memory, string memory, ProposalStatus, uint256, uint256, uint256) {
        Proposal memory prop = proposals[_proposalId];
        return (prop.title, prop.description, prop.status, prop.yesVotes, prop.noVotes, prop.endTime);
    }

    // Voting functions
    function vote(uint256 _proposalId, bool _support) public onlyMember {
        Proposal storage prop = proposals[_proposalId];
        require(prop.status == ProposalStatus.InVoting, "Voting not active");
        require(!votes[msg.sender][_proposalId], "Already voted");

        if (_support) {
            prop.yesVotes++;
        } else {
            prop.noVotes++;
        }

        votes[msg.sender][_proposalId] = true;
        emit VoteCasted(_proposalId, _support);
    }

    function getProposalVotes(uint256 _proposalId) public view returns (uint256 yesVotes, uint256 noVotes) {
        Proposal memory prop = proposals[_proposalId];
        return (prop.yesVotes, prop.noVotes);
    }

    function remainingVotes(uint256 _proposalId) public view returns (uint256) {
        Proposal memory prop = proposals[_proposalId];
        if (block.timestamp <= prop.endTime) {
            return prop.endTime - block.timestamp;
        }
        return 0;
    }

    // Additional features
    function setVotingPeriod(uint256 _newPeriod) external onlyAdmin {
        votingPeriod = _newPeriod;
    }
}
