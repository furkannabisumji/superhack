//import { ethers } from "ethers";
import { ethers } from "hardhat";

// Example function to generate a random number and convert it to bytes32
function generateRandomNumber(): string {
    const randomNumber = Math.floor(Math.random() * 1000000); // Generate a random number between 0 and 999999
    return ethers.formatEther(randomNumber.toString());
}

// Function to request a random number from the Entropy contract
async function requestRandomNumber() {
    const clientRandomNumber = generateRandomNumber();
    console.log(`Generated random number: ${clientRandomNumber}`);

    // Connect to Ethereum provider (e.g., Infura, Alchemy, etc.)
    const provider = new ethers.JsonRpcProvider("YOUR_INFURA_OR_ALCHEMY_URL");
    
    // Your wallet private key
    const wallet = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);
    
    // Address of the Entropy contract
    const entropyContractAddress = "YOUR_ENTROPY_CONTRACT_ADDRESS";

    // ABI of the Entropy contract (simplified for this example)
    const entropyAbi = [
        "function requestRandomNumber(bytes32 clientRandomNumber) external payable",
        "function getFee(address provider) public view returns (uint256)"
    ];

    // Create a contract instance
    const entropyContract = new ethers.Contract(entropyContractAddress, entropyAbi, wallet);

    // Fetch the fee required by the contract
    const fee = await entropyContract.getFee(wallet.address);
    
    // Call the requestRandomNumber function with the generated random number and send the required fee
    const tx = await entropyContract.requestRandomNumber(clientRandomNumber, { value: fee });
    const receipt = await tx.wait();
    
    console.log(`Transaction successful with receipt:`, receipt);
}

// Execute the function
requestRandomNumber().catch(console.error);


// // offchain.ts

// //import { ethers } from "ethers";
// import { ethers } from "hardhat";
// import { EthereumProvider } from "hardhat/types";

// // Example function to generate a random number
// function generateRandomNumber(): number {
//     return Math.floor(Math.random() * 1000000); // Generate a random number between 0 and 999999
// }

// // Function to request a random number from the Entropy contract
// async function requestRandomNumber() {
//     const randomNumber = generateRandomNumber();
//     console.log(`Generated random number: ${randomNumber}`);

//     // Connect to Ethereum provider (e.g., Infura, Alchemy, etc.)
//     const provider = new ethers.JsonRpcProvider("YOUR_INFURA_OR_ALCHEMY_URL");
    
//     // Your wallet private key
//     const wallet = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);
    
//     // Address of the Entropy contract
//     const entropyContractAddress = "YOUR_ENTROPY_CONTRACT_ADDRESS";

//     // ABI of the Entropy contract (simplified for this example)
//     const entropyAbi = [
//         "function requestRandomNumber(uint256 randomNumber) public returns (uint256)"
//     ];

//     // Create a contract instance
//     const entropyContract = new ethers.Contract(entropyContractAddress, entropyAbi, wallet);

//     // Call the requestRandomNumber function
//     const sequenceNumber = await entropyContract.requestRandomNumber(randomNumber);
//     console.log(`Requested random number with sequence number: ${sequenceNumber.toString()}`);
// }

// // Execute the function
// requestRandomNumber().catch(console.error);