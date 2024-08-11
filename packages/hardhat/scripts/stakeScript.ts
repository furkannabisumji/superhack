const { ethers } = require("ethers");

// Replace these values with your actual provider and private key
const provider = new ethers.providers.JsonRpcProvider("YOUR_PROVIDER_URL");
const privateKey = "YOUR_PRIVATE_KEY";
const wallet = new ethers.Wallet(privateKey, provider);

// Replace these with your actual ABI and bytecode
const stakingTokenAddress = "YOUR_STAKING_TOKEN_CONTRACT_ADDRESS"; // Address of deployed MyToken contract

const stakingContractABI = [
    // ABI of your Staking contract
];

const stakingContractBytecode = "YOUR_STAKING_CONTRACT_BYTECODE";

const tokenAddress = "YOUR_TOKEN_CONTRACT_ADDRESS"; // Address of MyToken contract
const tokenAmount = ethers.utils.parseUnits("10000", 18); // Adjust decimals as needed

const tokenABI = [
    "function transfer(address to, uint256 amount) public returns (bool)"
];

async function deployStaking() {
    const StakingContractFactory = new ethers.ContractFactory(
        stakingContractABI,
        stakingContractBytecode,
        wallet
    );

    console.log("Deploying Staking contract...");

    const stakingContract = await StakingContractFactory.deploy(stakingTokenAddress);

    await stakingContract.deployTransaction.wait();

    console.log(`Staking contract deployed at address: ${stakingContract.address}`);

    return stakingContract.address;
}

async function transferTokens(stakingContractAddress) {
    const tokenContract = new ethers.Contract(tokenAddress, tokenABI, wallet);

    try {
        console.log(`Transferring ${tokenAmount.toString()} tokens to staking contract at ${stakingContractAddress}...`);

        const tx = await tokenContract.transfer(stakingContractAddress, tokenAmount);
        await tx.wait();

        console.log(`Successfully transferred ${tokenAmount.toString()} tokens to the staking contract.`);
    } catch (error) {
        console.error("Error transferring tokens:", error);
    }
}

async function main() {
    const stakingContractAddress = await deployStaking();
    await transferTokens(stakingContractAddress);
}

main().catch(console.error);
