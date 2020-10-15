import fs from "fs";
import { ENVIRONMENTS_OPTIONS } from "./environments";
import { newScript } from "../new-script";

newScript({
  name: "build-database-credentials",
  script: () => {
    const fileName = `database-credentials.json`;
    const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

    const localConfig = {
      user: "user",
      host: "localhost",
      database: null,
      password: "password",
      port: 5433,
      driver: "pg",
    };

    const config = {
      [ENVIRONMENTS_OPTIONS.development]: {
        ...localConfig,
        database: "note_book_db",
      },
      [ENVIRONMENTS_OPTIONS.test]: {
        ...localConfig,
        database: "test_note_book_db",
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
  },
});
