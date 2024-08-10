// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy MockERC20 as the primary asset token
  const MockERC20 = await hre.ethers.getContractFactory("MockERC20");
  const asset = await MockERC20.deploy("Mock Token", "MTK");
  await asset.deployed();
  console.log("MockERC20 deployed to:", asset.address);

  // Deploy MockCToken
  const MockCToken = await hre.ethers.getContractFactory("MockCToken");
  const cToken = await MockCToken.deploy(asset.address);
  await cToken.deployed();
  console.log("MockCToken deployed to:", cToken.address);

  // Deploy MockStargateFarm
  const MockStargateFarm = await hre.ethers.getContractFactory("MockStargateFarm");
  const stargateFarm = await MockStargateFarm.deploy();
  await stargateFarm.deployed();
  console.log("MockStargateFarm deployed to:", stargateFarm.address);

  // Deploy MockStargateRouter with a new MockLPToken
  const MockLPToken = await hre.ethers.getContractFactory("MockLPToken");
  const lpToken = await MockLPToken.deploy("Mock LP Token", "MLPT");
  await lpToken.deployed();
  console.log("MockLPToken deployed to:", lpToken.address);

  const MockStargateRouter = await hre.ethers.getContractFactory("MockStargateRouter");
  const stargateRouter = await MockStargateRouter.deploy(asset.address, lpToken.address);
  await stargateRouter.deployed();
  console.log("MockStargateRouter deployed to:", stargateRouter.address);

  // Deploy TokenVault
  const TokenVault = await ethers.getContractFactory("contracts/VaultJR2.sol:TokenVault");
  const tokenVault = await TokenVault.deploy(
    asset.address,
    cToken.address,
    stargateFarm.address,
    stargateRouter.address,
    1,  // assuming stargatePoolId is 1
    "VaultToken",
    "VT"
  );
  await tokenVault.deployed();
  console.log("TokenVault deployed to:", tokenVault.address);

  // Provide the deployer with initial token balance for testing
  await asset.transfer(deployer.address, hre.ethers.utils.parseEther("10000"));
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
