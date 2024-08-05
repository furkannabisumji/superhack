const hre= require("hardhat");


async function main() {
	const [deployer] = await hre.ethers.getSigners();

	console.log("Deploying contracts with the account : ", deployer.address);

	const Marketplace = await hre.ethers.getContractFactory("UserRegistration");
	const contract = await Marketplace.deploy();

	console.log("Contract deployed at : ", contract.address);
}

main()