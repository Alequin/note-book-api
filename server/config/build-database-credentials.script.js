import fs from "fs";
import { ENVIRONMENTS_OPTIONS } from "./environments";
import { newScript } from "../new-script";
import { buildProductionDbConfig } from "./build-production-db-config";

newScript({
  name: "build-database-credentials",
  script: () => {
    const fileName = `database-credentials.json`;

    const localConfig = {
      database: null,
      user: "user",
      host: "localhost",
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
      [ENVIRONMENTS_OPTIONS.production]: buildProductionDbConfig(),
    };

    fs.writeFileSync(
      `${__dirname}/${fileName}`,
      JSON.stringify(config, null, 2),
    );
  },
});
