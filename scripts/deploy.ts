import { getAddress } from "../lib/addresses.helpers";
import { deployCamp } from "./deploy-camp";
import { deployDappCampWarriors } from "./deploy-dapp-camp-warriors";
import { deployStaking } from "./deploy-staking";

async function main() {
  const campContract = await deployCamp();
  await deployDappCampWarriors();
  await deployStaking();

  await campContract.transferOwnership(getAddress("staking"));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
