import { getAddress } from "../lib/addresses.helpers";
import { getCamp } from "../lib/deploy.helpers";

export async function setCampOwnership() {
  const campContract = await getCamp({
    existingContractAddress: getAddress("camp"),
  });

  await campContract.transferOwnership(getAddress("staking"));
}

if (!process.env.EXECUTE_PROGRAMMATICALLY) {
  setCampOwnership()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
