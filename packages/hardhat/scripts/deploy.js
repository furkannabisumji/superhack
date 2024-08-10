async function deployMocks() {
  const [deployer] = await ethers.getSigners();

  // Deploy MockERC20 as the primary asset token
  const MockERC20 = await ethers.getContractFactory("MockERC20");
  const asset = await MockERC20.deploy("Mock Token", "MTK", 18);
  await asset.deployed();

  // Deploy MockCToken
  const MockCToken = await ethers.getContractFactory("MockCToken");
  const cToken = await MockCToken.deploy(asset.address);
  await cToken.deployed();

  // Deploy MockStargateFarm
  const MockStargateFarm = await ethers.getContractFactory("MockStargateFarm");
  const stargateFarm = await MockStargateFarm.deploy();
  await stargateFarm.deployed();

  // Deploy MockStargateRouter
  const MockStargateRouter = await ethers.getContractFactory("MockStargateRouter");
  const stargateRouter = await MockStargateRouter.deploy();
  await stargateRouter.deployed();

  return { asset, cToken, stargateFarm, stargateRouter };
}
