import fs from "fs";
import { ENVIRONMENTS_OPTIONS } from "./environments";

const main = () => {
  console.log("Start: Build database credentials");

  const fileName = `database-credentials.json`;
  const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

  const localConfig = {
    user: "user",
    host: "localhost",
    database: "note-book-db",
    password: "password",
    port: 5433,
    driver: "pg",
  };

  const config = {
    [ENVIRONMENTS_OPTIONS.development]: localConfig,
    [ENVIRONMENTS_OPTIONS.test]: localConfig,
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
