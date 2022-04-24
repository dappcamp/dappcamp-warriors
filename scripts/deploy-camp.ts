import { getCamp } from "../lib/deploy.helpers";

export async function deployCamp() {
  await getCamp();
}

if (!process.env.EXECUTE_PROGRAMMATICALLY) {
  deployCamp()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
