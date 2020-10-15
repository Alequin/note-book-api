import args from "./console-args/console-args";
import { isEmpty } from "lodash";

export const newScript = async ({ name, script, expectedArgs = [] }) => {
  console.log(`Starting: ${name}`);
  validateArgs(args, expectedArgs);

  try {
    await script(args);
    console.log(`Finished: ${name}`);
    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

const validateArgs = (args, expectedArgs) => {
  const missingArgs = expectedArgs.filter((argName) => !args[argName]);
  if (!isEmpty(missingArgs))
    throw new Error(
      `Missing expected console arguments ${missingArgs
        .map((arg) => `"${arg}"`)
        .join(", ")}`,
    );
};
