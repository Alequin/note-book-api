import { dbMigrations } from "./db-migrations";
import { newScript } from "../new-script";

newScript({
  name: "migrate-database-reset",
  expectedArgs: ["dbEnv"],
  script: async (args) => dbMigrations({ env: args.dbEnv }).reset(),
});
