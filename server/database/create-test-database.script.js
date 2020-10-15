import { isEmpty } from "lodash";
import { query } from "./query";
import { newScript } from "../new-script";

const doesDatabaseExist = async (name) =>
  query(`SELECT datname FROM pg_catalog.pg_database WHERE datname=$1`, [
    name,
  ]).then((foundDatabaseNames) => isEmpty(foundDatabaseNames));

newScript({
  name: "create-test-database",
  script: async () => {
    const dbName = "test_note_book_db";
    if (!(await doesDatabaseExist(dbName))) return;
    await query(`CREATE DATABASE ${dbName}`);
  },
});
