import { saveAddress } from "../lib/addresses.helpers";
import { getCamp } from "../lib/deploy.helpers";

export async function deployCamp() {
  const campContract = await getCamp();
  saveAddress("camp", campContract.address);

  return campContract;
}

if (!process.env.EXECUTE_PROGRAMMATICALLY) {
  deployCamp()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
