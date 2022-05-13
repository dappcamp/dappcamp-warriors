import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { getCamp } from "../lib/deploy.helpers";
import { Camp } from "../typechain";

describe("Camp tests", () => {
  let campContract: Camp;
  let deployer: SignerWithAddress;
  let account1: SignerWithAddress;
  /**
   * @dev As you may already know, Solidity doesn't support floating point numbers.
   * An Ether amount can have up to 18 decimals and ERC20 too (by default).
   * 10^18 wei = 1 Ether.
   * 10^18 "Camp Token wei" = 1 Camp Token.
   */
  const oneCampInWei = ethers.utils.parseEther("1");

  beforeEach(async () => {
    campContract = await getCamp();
    [deployer, account1] = await ethers.getSigners();
  });

  describe("mint", () => {
    it("Should revert if the caller is not the owner", async () => {
      await expect(
        campContract.connect(account1).mint(deployer.address, oneCampInWei)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should work when called by the owner", async () => {
      await campContract.mint(deployer.address, oneCampInWei);

      const balance = await campContract.balanceOf(deployer.address);
      expect(balance).to.equal(oneCampInWei);
    });
  });

  describe("burn", () => {
    it("Should revert if the caller is not the owner", async () => {
      await expect(
        campContract.connect(account1).burn(deployer.address, oneCampInWei)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should work when called by the owner", async () => {
      const halfCampInWei = oneCampInWei.div(2);

      /**
       * @dev Mint so we have something to burn
       */
      await campContract.mint(deployer.address, oneCampInWei);

      await campContract.burn(deployer.address, halfCampInWei);

      const balance = await campContract.balanceOf(deployer.address);
      expect(balance).to.equal(halfCampInWei);
    });
  });
});
