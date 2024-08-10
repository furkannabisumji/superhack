const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@openzeppelin/test-helpers");

describe("TokenVault Contract Tests", function () {
    let tokenVault, asset, cToken, stargateFarm, stargateRouter;
    let owner, user1, user2;

    beforeEach(async function () {
        [owner, user1, user2] = await ethers.getSigners();

        const MockERC20 = await ethers.getContractFactory("MockERC20");
        asset = await MockERC20.deploy("Test Token", "TST", 18);
        await asset.deployed();

        const MockCToken = await ethers.getContractFactory("MockCToken");
        cToken = await MockCToken.deploy(asset.address);
        await cToken.deployed();

        const MockStargateFarm = await ethers.getContractFactory("MockStargateFarm");
        stargateFarm = await MockStargateFarm.deploy();
        await stargateFarm.deployed();

        const MockStargateRouter = await ethers.getContractFactory("MockStargateRouter");
        stargateRouter = await MockStargateRouter.deploy();
        await stargateRouter.deployed();

        const TokenVault = await ethers.getContractFactory("TokenVault");
        tokenVault = await TokenVault.deploy(
            asset.address,
            cToken.address,
            stargateFarm.address,
            stargateRouter.address,
            1,  // assuming stargatePoolId is 1
            "VaultToken",
            "VT"
        );
        await tokenVault.deployed();

        // Provide the users with initial token balances for testing
        await asset.transfer(user1.address, ethers.utils.parseEther("1000"));
        await asset.transfer(user2.address, ethers.utils.parseEther("1000"));
    });

    it("allows deposits and withdrawals from Compound and Stargate", async function () {
        await asset.connect(user1).approve(tokenVault.address, ethers.utils.parseEther("100"));
        await tokenVault.connect(user1).depositToCompound(ethers.utils.parseEther("50"));
        await tokenVault.connect(user1).depositToStargate(ethers.utils.parseEther("50"));

        expect(await cToken.balanceOfUnderlying(tokenVault.address)).to.equal(ethers.utils.parseEther("50"));
        expect(await stargateFarm.checkBalance(1, tokenVault.address)).to.equal(ethers.utils.parseEther("50"));

        await tokenVault.connect(user1).withdrawFromCompound(ethers.utils.parseEther("50"));
        await tokenVault.connect(user1).withdrawFromStargate(ethers.utils.parseEther("50"));

        expect(await cToken.balanceOfUnderlying(tokenVault.address)).to.equal(0);
        expect(await stargateFarm.checkBalance(1, tokenVault.address)).to.equal(0);
    });

    it("enables borrowing and repayment", async function () {
        await tokenVault.connect(user1).depositToCompound(ethers.utils.parseEther("200"));
        await tokenVault.connect(user1).borrow(ethers.utils.parseEther("100")); // 50% LTV on the deposit

        expect(await asset.balanceOf(user1.address)).to.equal(ethers.utils.parseEther("900")); // 1000 initial - 200 deposit + 100 borrow

        await asset.connect(user1).approve(tokenVault.address, ethers.utils.parseEther("100"));
        await tokenVault.connect(user1).repay(ethers.utils.parseEther("100"));
        expect(await asset.balanceOf(user1.address)).to.equal(ethers.utils.parseEther("800")); // 900 - 100 repay
    });

    it("calculates yields and rebalances investments", async function () {
        await tokenVault.connect(user1).depositToCompound(ethers.utils.parseEther("500"));
        await tokenVault.connect(user1).depositToStargate(ethers.utils.parseEther("500"));

        // Simulate time passage and yield generation
        await cToken.setMockYield(ethers.utils.parseEther("50"));
        await stargateFarm.setMockYield(ethers.utils.parseEther("30"));

        // Time travel to simulate a yield period
        await time.increase(86400 * 365); // Increase by one year

        // Perform rebalance
        await tokenVault.connect(owner).rebalanceInvestments();

        // Check the final yields
        const compoundYield = await tokenVault.calculateCompoundYield();
        const stargateYield = await tokenVault.calculateStargateYield();

        expect(compoundYield).to.be.above(0);
        expect(stargateYield).to.be.above(0);

        // Verify that assets have been rebalanced based on the yields
    });
});
