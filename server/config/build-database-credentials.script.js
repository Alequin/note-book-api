import fs from "fs";

const main = () => {
  console.log("Start: Build database credentials");

  const fileName = `database-credentials.json`;
  const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

  const config = {
    user: DB_USERNAME || "user",
    host: DB_HOST || "localhost",
    database: DB_NAME || "note-book-db",
    password: DB_PASSWORD || "password",
    port: DB_PORT || 5433,
  };

  fs.writeFileSync(`${__dirname}/${fileName}`, JSON.stringify(config));
  console.log("End: Build database credentials");
};

main();
