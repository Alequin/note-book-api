import { dbMigrations } from "./db-migrations";
import args from "../console-args/console-args";

const main = async () => dbMigrations({ env: args.dbEnv }).reset();

main();
