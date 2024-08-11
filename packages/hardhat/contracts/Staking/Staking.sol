// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./MyToken.sol"; // Import the MyToken contract


contract Staking {

    using SafeERC20 for IERC20;

    IERC20 public stakingToken;
    address public owner; // Define the owner variable
    MyToken public myToken; // Declare a MyToken variable
    uint256 public rewardRate = 20; // Example APY rate in percentage
    uint256 public lockPeriod = 7 days;
    uint256 public rewardLimit = 10; // Reward limit for 10% of users per week

    struct Stake {
        uint256 amount;
        uint256 timestamp;
        uint256 lastClaimed;
    }

    mapping(address => Stake) public stakes;
    uint256 public totalStaked;
    uint256 public totalStakers;

    //event Staked(address indexed user, uint256 amount, uint256 timestamp);
    //event Unstaked(address indexed user, uint256 amount);
    //event RewardClaimed(address indexed user, uint256 amount);

event Staked(address indexed user, uint256 amount, uint256 timestamp, uint256 blockNumber);
event Unstaked(address indexed user, uint256 amount, uint256 timestamp, uint256 blockNumber);
event RewardClaimed(address indexed user, uint256 amount, uint256 timestamp, uint256 blockNumber);


    constructor(IERC20 _stakingToken) {
        stakingToken = _stakingToken;
        myToken = MyToken(address(_stakingToken));
        owner = msg.sender; // Set the owner to the address that deploys the contract
    }
    

    modifier onlyOwner() {
       require(msg.sender == owner, "Only the owner can perform this action");
       _;
    }


    function stake(uint256 amount) public {
        require(amount > 0, "Cannot stake 0 tokens");

        Stake storage userStake = stakes[msg.sender];
        require(
            block.timestamp >= userStake.timestamp + lockPeriod,
            "You can only stake once per week"
        );

        if (userStake.amount == 0) {
            totalStakers++;
        }

        // Check allowance before attempting to transfer
        uint256 allowance = stakingToken.allowance(msg.sender, address(this));
        require(allowance >= amount, "ERC20InsufficientAllowance: Allowance too low");

        userStake.amount += amount;
        userStake.timestamp = block.timestamp;
        totalStaked += amount;

        // Use SafeERC20 to perform the transfer
        stakingToken.safeTransferFrom(msg.sender, address(this), amount);

        uint256 blockNumber = block.number;
        emit Staked(msg.sender, amount, block.timestamp, blockNumber);
    }


    function withdrawStake() public {
    Stake storage userStake = stakes[msg.sender];
    require(userStake.amount > 0, "No stake found");
    require(
        block.timestamp >= userStake.timestamp + lockPeriod,
        "Stake is still locked"
    );

    uint256 amount = userStake.amount;
    userStake.amount = 0;
    totalStaked -= amount;
    totalStakers--;
    stakingToken.safeTransfer(msg.sender, amount);

    uint256 blockNumber = block.number;

    emit Unstaked(msg.sender, amount, block.timestamp, blockNumber);
}


    function calculateRewards(address user) public view returns (uint256) {
        Stake storage userStake = stakes[user];
        if (userStake.amount == 0) {
            return 0;
        }
        uint256 stakingDuration = block.timestamp - userStake.lastClaimed;
        uint256 yearlyReward = (userStake.amount * rewardRate) / 100;
        uint256 reward = (yearlyReward * stakingDuration) / 365 days;
        return reward;
    }



   function claimRewards() public {
    Stake storage userStake = stakes[msg.sender];
    require(userStake.amount > 0, "No stake found");
    require(
        block.timestamp >= userStake.lastClaimed + lockPeriod,
        "You can only claim rewards once per week"
    );

    uint256 reward = calculateRewards(msg.sender);
    require(reward > 0, "No rewards available");

    userStake.lastClaimed = block.timestamp;
    stakingToken.safeTransfer(msg.sender, reward);

    uint256 blockNumber = block.number;

    emit RewardClaimed(msg.sender, reward, block.timestamp, blockNumber);
}


// function mintTokens(uint256 amount) public onlyOwner {
//     myToken.mint(address(this), amount); // Use the MyToken instance to call the mint function
// }

function transferTokensToStaking(uint256 amount) public onlyOwner {
    myToken.transfer(address(this), amount); // Use the MyToken instance to call the transfer function
}





  function getStakingContractTokenBalance() public view returns (uint256) {
    return stakingToken.balanceOf(address(this));
  }

 function getCallerAddress() public view returns (address) {
        return msg.sender;
    }
    

    function getStake(address user) public view returns (uint256) {
        return stakes[user].amount;
    }
    
    function getStakingContractAddress() public view returns (address) {
    return address(this);
}

}
