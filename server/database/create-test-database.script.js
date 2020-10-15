import { isEmpty } from "lodash";
import { query } from "./query";

const main = async () => {
  console.log("Start: Create test database");

  const dbName = "test_note_book_db";

  if (!(await doesDatabaseExist(dbName))) return;
  await query(`CREATE DATABASE ${dbName}`);

  console.log("End: Create test database");
};

const doesDatabaseExist = async (name) =>
  query(`SELECT datname FROM pg_catalog.pg_database WHERE datname=$1`, [
    name,
  ]).then((foundDatabaseNames) => isEmpty(foundDatabaseNames));

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
