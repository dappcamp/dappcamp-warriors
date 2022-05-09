import { BaseContract, ContractFactory, Signer } from "ethers";
import { ethers } from "hardhat";
import { FactoryOptions } from "hardhat/types";
import {
  Camp,
  Camp__factory as CampFactory,
  DappCampWarriors,
  DappCampWarriors__factory as DappCampWarriorsFactory,
  Staking,
  Staking__factory as StakingFactory,
} from "../typechain";

type GetContractFactoryParams = Signer | FactoryOptions;

type GetContractParams<Factory extends ContractFactory> =
  | {
      deployParams: Parameters<Factory["deploy"]>;
      existingContractAddress?: null;
      getContractFactoryParams?: GetContractFactoryParams;
    }
  | {
      deployParams?: null;
      existingContractAddress: string;
      getContractFactoryParams?: GetContractFactoryParams;
    };

const enableLogs = process.env.NODE_ENV !== "test";

/**
 * @description Either deploys a new contract or gets an existing one.
 * Useful for deploying test contracts and also to deploy to localnet/testnet/mainnet.
 * It takes two generics (Factory and Contract) that make the returned contract fully typed.
 */
export const getContract = async <
  Factory extends ContractFactory,
  Contract extends BaseContract
>({
  contractName,
  deployParams,
  /**
   * @description Providing this argument will skip the deployment,
   * and use an existing contract deployed on the address.
   */
  existingContractAddress,
  getContractFactoryParams,
}: GetContractParams<Factory> & {
  contractName: string;
}): Promise<Contract> => {
  const ContractFactory = (await ethers.getContractFactory(
    contractName,
    getContractFactoryParams
  )) as Factory;

  const isGetExistingContract = Boolean(existingContractAddress);
  if (isGetExistingContract) {
    enableLogs &&
      console.log(
        "Getting existing contract from address:",
        existingContractAddress
      );
    return ContractFactory.attach(existingContractAddress!) as Contract;
  }

  const contract = (await ContractFactory.deploy(...deployParams!)) as Contract;
  await contract.deployed();

  enableLogs && console.log(`Deployed ${contractName} to ${contract.address}`);
  return contract;
};

type GetContractConfig = {
  getContractFactoryParams?: GetContractFactoryParams;
};

export const getCamp = (getContractConfig: GetContractConfig = {}) =>
  getContract<CampFactory, Camp>({
    contractName: "Camp",
    deployParams: [],
    ...getContractConfig,
  });

export const getDappCampWarriors = (
  getContractConfig: GetContractConfig = {}
) =>
  getContract<DappCampWarriorsFactory, DappCampWarriors>({
    contractName: "DappCampWarriors",
    deployParams: [],
    ...getContractConfig,
  });

export const getStaking = (
  campAddress: string,
  dappCampWarriorsAddress: string,
  getContractConfig: GetContractConfig = {}
) =>
  getContract<StakingFactory, Staking>({
    contractName: "Staking",
    deployParams: [campAddress, dappCampWarriorsAddress],
    ...getContractConfig,
  });
