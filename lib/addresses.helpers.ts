import assert from "assert";
import { readFileSync, writeFileSync } from "fs";
import { network } from "hardhat";
import { join } from "path";

type AddressGroup = {
  camp: string;
  dappCampWarriors: string;
  staking: string;
};

type Addresses = {
  hardhat: AddressGroup;
  [key: string]: AddressGroup;
};

export const saveAddress = (
  addressName: keyof AddressGroup,
  addressValue: string
) => {
  const addresses: Addresses = JSON.parse(
    readFileSync(join(__dirname, "../addresses.json"), "utf8")
  );
  assert(Boolean(addresses[network.name]), "Invalid network");

  addresses[network.name][addressName] = addressValue;

  writeFileSync(
    join(__dirname, "../addresses.json"),
    JSON.stringify(addresses, null, 2)
  );
};

export const getAddress = (addressName: keyof AddressGroup) => {
  const addresses: Addresses = JSON.parse(
    readFileSync(join(__dirname, "../addresses.json"), "utf8")
  );
  assert(Boolean(addresses[network.name]), "Invalid network");
  assert(
    Boolean(addresses[network.name][addressName]),
    `Address ${addressName} is empty or undefined`
  );

  return addresses[network.name][addressName];
};
