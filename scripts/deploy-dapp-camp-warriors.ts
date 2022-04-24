import { getDappCampWarriors } from "../lib/deploy.helpers";

export async function deployDappCampWarriors() {
  await getDappCampWarriors();
}

if (!process.env.EXECUTE_PROGRAMMATICALLY) {
  deployDappCampWarriors()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
