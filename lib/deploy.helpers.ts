import { BaseContract, ContractFactory } from "ethers";
import { ethers } from "hardhat";
import {
  Camp,
  Camp__factory as CampFactory,
  DappCampWarriors,
  DappCampWarriors__factory as DappCampWarriorsFactory,
} from "../typechain";

type GetContractParams<Factory extends ContractFactory> =
  | {
      contractName: string;
      deployParams: Parameters<Factory["deploy"]>;
      existingContractAddress?: null;
    }
  | {
      contractName: string;
      deployParams?: null;
      existingContractAddress: string;
    };

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
}: GetContractParams<Factory>): Promise<Contract> => {
  const ContractFactory = (await ethers.getContractFactory(
    contractName
  )) as Factory;

  const isGetExistingContract = Boolean(existingContractAddress);
  if (isGetExistingContract) {
    console.log(
      "Getting existing contract from address:",
      existingContractAddress
    );
    return ContractFactory.attach(existingContractAddress!) as Contract;
  }

  const contract = (await ContractFactory.deploy(...deployParams!)) as Contract;
  await contract.deployed();

  return contract;
};

export const getCamp = (params: GetContractParams<CampFactory>) =>
  getContract<CampFactory, Camp>(params);

export const getDappCampWarriors = (
  params: GetContractParams<DappCampWarriorsFactory>
) => getContract<DappCampWarriorsFactory, DappCampWarriors>(params);
