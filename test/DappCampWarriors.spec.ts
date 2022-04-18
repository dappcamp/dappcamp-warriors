import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { getDappCampWarriors } from "../lib/deploy.helpers";
import { DappCampWarriors } from "../typechain";

describe("DappCampWarriors tests", () => {
  let dappCampWarriorsContract: DappCampWarriors;
  let deployer: SignerWithAddress;
  let account1: SignerWithAddress;

  beforeEach(async () => {
    dappCampWarriorsContract = await getDappCampWarriors();
    [deployer, account1] = await ethers.getSigners();
  });

  describe("constructor", () => {
    it("Should mint 10 NFTs owned by the deployer address", async () => {
      expect(
        await dappCampWarriorsContract.balanceOf(deployer.address)
      ).to.equal(10);
    });
  });

  describe("setBaseURI", () => {
    it("Should revert if the caller is not the owner", async () => {
      await expect(
        dappCampWarriorsContract.connect(account1).setBaseURI("test")
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should change the base URI if called by the owner", async () => {
      expect(await dappCampWarriorsContract.baseURI()).to.equal("");

      await dappCampWarriorsContract.setBaseURI("test");

      expect(await dappCampWarriorsContract.baseURI()).to.equal("test");
    });
  });

  describe("Mint", () => {
    it("Should revert if the caller is not the owner", async () => {
      await expect(
        dappCampWarriorsContract.connect(account1).mint(deployer.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should mint if called by the owner", async () => {
      await dappCampWarriorsContract.mint(account1.address);

      expect(
        await dappCampWarriorsContract.balanceOf(account1.address)
      ).to.equal(1);
    });
  });
});
