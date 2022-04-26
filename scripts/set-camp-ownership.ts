import { saveAddress } from "../lib/addresses.helpers";
import { getCamp } from "../lib/deploy.helpers";

export async function setCampOwnership() {}

if (!process.env.EXECUTE_PROGRAMMATICALLY) {
  setCampOwnership()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
