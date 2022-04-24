import { getAddress, saveAddress } from "../lib/addresses.helpers";
import { getStaking } from "../lib/deploy.helpers";

export async function deployStaking() {
  const stakingContract = await getStaking(
    getAddress("camp"),
    getAddress("dappCampWarriors")
  );
  saveAddress("staking", stakingContract.address);
}

if (!process.env.EXECUTE_PROGRAMMATICALLY) {
  deployStaking()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
