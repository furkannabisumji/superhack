import { expect } from "chai";
import hre from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("UserRegistration", function () {
    async function deployUserRegistrationFixture() {
        const UserRegistration = await hre.ethers.deployContract("UserRegistration");
        // const userRegistration = await UserRegistration.deploy();
        // await userRegistration.deployed();
        const [owner, addr1, addr2] = await hre.ethers.getSigners();

        return { userRegistration, owner, addr1, addr2 };
    }

    it("Should register a user with WorldID and username", async function () {
        const { userRegistration, owner } = await loadFixture(deployUserRegistrationFixture);

        await expect(userRegistration.registerUser("worldid_1", "username_1"))
            .to.emit(userRegistration, "UserRegistered")
            .withArgs(owner.address, "worldid_1", "username_1");

        const user = await userRegistration.getUser(owner.address);
        expect(user.worldId).to.equal("worldid_1");
        expect(user.username).to.equal("username_1");
    });

    it("Should fail to register with an already used WorldID", async function () {
        const { userRegistration } = await loadFixture(deployUserRegistrationFixture);

        await userRegistration.registerUser("worldid_1", "username_1");
        await expect(userRegistration.registerUser("worldid_1", "username_2"))
            .to.be.revertedWith("WorldID already registered");
    });

    it("Should fail to register with an already taken username", async function () {
        const { userRegistration } = await loadFixture(deployUserRegistrationFixture);

        await userRegistration.registerUser("worldid_1", "username_1");
        await expect(userRegistration.registerUser("worldid_2", "username_1"))
            .to.be.revertedWith("Username already taken");
    });

    it("Should allow a different user to register with a different WorldID and username", async function () {
        const { userRegistration, addr1 } = await loadFixture(deployUserRegistrationFixture);

        await userRegistration.registerUser("worldid_1", "username_1");

        await expect(userRegistration.connect(addr1).registerUser("worldid_2", "username_2"))
            .to.emit(userRegistration, "UserRegistered")
            .withArgs(addr1.address, "worldid_2", "username_2");

        const user = await userRegistration.getUser(addr1.address);
        expect(user.worldId).to.equal("worldid_2");
        expect(user.username).to.equal("username_2");
    });

    it("Should retrieve user information correctly", async function () {
        const { userRegistration, owner } = await loadFixture(deployUserRegistrationFixture);

        await userRegistration.registerUser("worldid_1", "username_1");
        const user = await userRegistration.getUser(owner.address);

        expect(user.userAddress).to.equal(owner.address);
        expect(user.worldId).to.equal("worldid_1");
        expect(user.username).to.equal("username_1");
    });
});
