import { ethers } from "hardhat"; // Use ES module import syntax

async function main() {
    // Replace with the actual address of the Pyth contract you want to use
    const pythContractAddress = "0x74f09cb3c7e2A01865f424FD14F6dc9A14E3e94E"; 

    // Get the contract factory
    const MyContract = await ethers.getContractFactory("MyContract");

    // Deploy the contract
    const myContract = await MyContract.deploy(pythContractAddress);

    // Wait for the deployment to finish
    await myContract.deployed();

    console.log("MyContract deployed to:", myContract.address);
}

// Execute the main function
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


// const hre = require("hardhat");

// async function main() {https://explorer.celo.org/alfajores/address/0x74f09cb3c7e2A01865f424FD14F6dc9A14E3e94E
//     // Replace with the actual address of the Pyth contract you want to use
//     const pythContractAddress = "0x74f09cb3c7e2A01865f424FD14F6dc9A14E3e94E"; 

//     // Get the contract factory
//     const MyContract = await hre.ethers.getContractFactory("MyContract");

//     // Deploy the contract
//     const myContract = await MyContract.deploy(pythContractAddress);

//     // Wait for the deployment to finish
//     await myContract.deployed();

//     console.log("MyContract deployed to:", myContract.address);
// }

// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     });