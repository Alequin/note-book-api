import fs from "fs";
import { ENVIRONMENTS_OPTIONS } from "./environments";

// TODO: do the test and development dbs need to be on different ports?

const main = () => {
  console.log("Start: Build database credentials");

  const fileName = `database-credentials.json`;
  const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

  const config = {
    [ENVIRONMENTS_OPTIONS.development]: {
      user: "user",
      host: "localhost",
      database: "note-book-db",
      password: "password",
      port: 5434,
      driver: "pg",
    },
    [ENVIRONMENTS_OPTIONS.test]: {
      user: "user",
      host: "localhost",
      database: "test-note-book-db",
      password: "password",
      port: 5433,
      driver: "pg",
    },
    [ENVIRONMENTS_OPTIONS.production]: {
      user: DB_USERNAME,
      host: DB_HOST,
      database: DB_NAME,
      password: DB_PASSWORD,
      port: DB_PORT,
      driver: "pg",
    },
  };

  fs.writeFileSync(`${__dirname}/${fileName}`, JSON.stringify(config));
  console.log("End: Build database credentials");
};

main();
