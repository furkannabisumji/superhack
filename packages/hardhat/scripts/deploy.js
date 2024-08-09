const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Governance = await hre.ethers.getContractFactory("Governance");
  const governance = await Governance.deploy(); // This line already waits for the deployment to be mined

  console.log("Governance contract deployed to:", governance.address);
}

main().catch((error) => {
  console.error("Error in deployment:", error);
  process.exit(1);
});
