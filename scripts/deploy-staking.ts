import { getAddress } from "../lib/addresses.helpers";
import { getStaking } from "../lib/deploy.helpers";

export async function deployStaking() {
  await getStaking(getAddress("camp"), getAddress("dappCampWarriors"));
}

if (!process.env.EXECUTE_PROGRAMMATICALLY) {
  deployStaking()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
