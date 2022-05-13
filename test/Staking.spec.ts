import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import {
  getCamp,
  getDappCampWarriors,
  getStaking,
} from "../lib/deploy.helpers";
import { Camp, DappCampWarriors, Staking } from "../typechain";

describe("Camp tests", () => {
  let campContract: Camp;
  let dappCampWarriorsContract: DappCampWarriors;
  let stakingContract: Staking;
  let deployer: SignerWithAddress;
  let account1: SignerWithAddress;

  beforeEach(async () => {
    campContract = await getCamp();
    dappCampWarriorsContract = await getDappCampWarriors();
    stakingContract = await getStaking(
      campContract.address,
      dappCampWarriorsContract.address
    );

    await campContract.transferOwnership(stakingContract.address);

    [deployer, account1] = await ethers.getSigners();
  });

  const createValidStake = async () => {
    await (
      await dappCampWarriorsContract.approve(stakingContract.address, 1)
    ).wait();

    await (await stakingContract.stake(1)).wait();
  };

  describe("stake", () => {
    it("Should revert if the NFT doesn't exist", async () => {
      await expect(stakingContract.stake(536)).to.revertedWith(
        "ERC721: owner query for nonexistent token"
      );
    });

    it("Should revert if msg.sender is not the NFT owner", async () => {
      await expect(stakingContract.connect(account1).stake(1)).to.revertedWith(
        "Staking: only the owner can stake an NFT"
      );
    });

    it("Should revert if the stakingContract is not approved by the owner", async () => {
      await expect(stakingContract.stake(1)).to.revertedWith(
        "ERC721: transfer caller is not owner nor approved"
      );
    });

    it("Should revert if the NFT is already staked", async () => {
      await createValidStake();

      await expect(stakingContract.stake(1)).to.revertedWith(
        "Staking: only the owner can stake an NFT"
      );
    });

    it("Should change the owner of the NFT to be the staking contract", async () => {
      await createValidStake();

      expect(await dappCampWarriorsContract.ownerOf(1)).to.equal(
        stakingContract.address
      );
    });

    it("Should add an entry to the `staked` mapping", async () => {
      await createValidStake();

      const stakedData = await stakingContract.staked(1);

      expect(stakedData.tokenId).to.equal(1);
    });
  });

  describe("staked", () => {
    it("Should map a non-staked NFT id to empty metadata", async () => {
      const stakedData = await stakingContract.staked(1);

      expect(stakedData.tokenId).to.equal(0);
    });

    it("Should map an staked NFT id to its staking metadata", async () => {
      await createValidStake();

      const stakedData = await stakingContract.staked(1);

      expect(stakedData.tokenId).to.equal(1);
    });
  });

  describe("unstake", () => {
    it("Should revert if the NFT is not staked", async () => {
      await expect(stakingContract.unstake(1)).to.revertedWith(
        "Staking: only the owner can unstake an NFT"
      );
    });

    it("Should revert if msg.sender is not the owner of the staked NFT", async () => {
      await createValidStake();

      await expect(
        stakingContract.connect(account1).unstake(1)
      ).to.revertedWith("Staking: only the owner can unstake an NFT");
    });

    it("Should revert if the NFT was staked in the same block", async () => {
      /**
       * @todo (lucas): implement
       */
      // const stake = await stakingContract.stake(1);
      // const unstake = await stakingContract.unstake(1);
    });

    it("Should send the NFT back to its original owner", async () => {
      await createValidStake();
      expect(await dappCampWarriorsContract.ownerOf(1)).to.equal(
        stakingContract.address
      );

      await stakingContract.unstake(1);

      expect(await dappCampWarriorsContract.ownerOf(1)).to.equal(
        deployer.address
      );
    });

    it("Should mint $CAMP on the owner's address", async () => {
      await createValidStake();
      expect(await campContract.balanceOf(deployer.address)).to.equal(0);

      await stakingContract.unstake(1);
      expect((await campContract.balanceOf(deployer.address)).gt(0)).to.equal(
        true
      );
    });

    it("Should mint 1 $CAMP per staked second", async () => {
      await createValidStake();
      expect(await campContract.balanceOf(deployer.address)).to.equal(0);

      // waffle.provider.block

      await stakingContract.unstake(1);
      expect(await campContract.balanceOf(deployer.address)).to.equal(
        ethers.utils.parseEther("1")
      );
    });

    it("Should remove the NFT from the `staked` mapping", async () => {
      await createValidStake();
      const stakedData1 = await stakingContract.staked(1);
      expect(stakedData1.tokenId).to.equal(1);

      await stakingContract.unstake(1);

      const stakedData2 = await stakingContract.staked(1);
      expect(stakedData2.tokenId).to.equal(0);
    });
  });
});
