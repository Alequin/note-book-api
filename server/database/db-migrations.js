import DBMigrate from "db-migrate";
import path from "path";
import { CURRENT_ENVIRONMENT } from "../config/environments";

const getMigrationInstance = ({ dbEnv } = {}) => {
  const instance = DBMigrate.getInstance(true, {
    config: path.resolve(__dirname, "../config/database-credentials.json"),
    env: dbEnv || CURRENT_ENVIRONMENT,
    cmdOptions: {
      "migrations-dir": path.resolve(__dirname, "./migrations"),
    },
  });
  instance.silence(true);
  return instance;
};

export const dbMigrations = (options) => ({
  up: async () => getMigrationInstance(options).up(),
  reset: async () => getMigrationInstance(options).reset(),
});
