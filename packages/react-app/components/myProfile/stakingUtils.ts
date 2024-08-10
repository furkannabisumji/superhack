import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider('YOUR_INFURA_OR_ALCHEMY_URL');
const stakingContract = new ethers.Contract('YOUR_CONTRACT_ADDRESS', abi, provider);

export const fetchEvents = async () => {
    const stakingFilter = stakingContract.filters.Staked();
    const unstakingFilter = stakingContract.filters.Unstaked();
    const rewardClaimedFilter = stakingContract.filters.RewardClaimed();

    const stakingEvents = await stakingContract.queryFilter(stakingFilter);
    const unstakingEvents = await stakingContract.queryFilter(unstakingFilter);
    const rewardClaimedEvents = await stakingContract.queryFilter(rewardClaimedFilter);

    return { stakingEvents, unstakingEvents, rewardClaimedEvents };
};
