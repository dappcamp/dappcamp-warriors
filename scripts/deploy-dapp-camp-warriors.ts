import { saveAddress } from "../lib/addresses.helpers";
import { getDappCampWarriors } from "../lib/deploy.helpers";

export async function deployDappCampWarriors() {
  const dappCampWarriorsContract = await getDappCampWarriors();
  saveAddress("dappCampWarriors", dappCampWarriorsContract.address);

  return dappCampWarriorsContract;
}

if (!process.env.EXECUTE_PROGRAMMATICALLY) {
  deployDappCampWarriors()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
