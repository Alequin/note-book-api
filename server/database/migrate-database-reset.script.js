import { dbMigrations } from "./db-migrations";
import args from "../console-args/console-args";
import { newScript } from "../new-script";

const main = async () => dbMigrations({ env: args.dbEnv }).reset();

main();
