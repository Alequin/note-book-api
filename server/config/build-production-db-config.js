import fs from "fs";
import path from "path";
import { mapValues } from "lodash";
import dotenv from "dotenv";

const PRODUCTION_DB_ENV_FILE = path.resolve(
  __dirname,
  "../../.env-production-db",
);

export const buildProductionDbConfig = () => {
  if (fs.existsSync(PRODUCTION_DB_ENV_FILE))
    dotenv.config({ path: PRODUCTION_DB_ENV_FILE });
  validateProductionConfigValues(process.env);
  return newConfig(process.env);
};

const validateProductionConfigValues = ({ DATABASE_URL }) => {
  if (!DATABASE_URL)
    console.error(
      `db environment variable is missing: ${JSON.stringify(
        mapValues({ DATABASE_URL }, (val) => val || "no value provided"),
        null,
        2,
      )}`,
    );
};

const newConfig = ({ DATABASE_URL }) => ({
  connectionString: DATABASE_URL,
  driver: "pg",
  ssl: {
    rejectUnauthorized: false,
  },
});
