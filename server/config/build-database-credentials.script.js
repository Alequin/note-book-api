import fs from "fs";

const main = () => {
  console.log("Start: Build database credentials");

  const fileName = `database-credentials.json`;
  const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

  const config = {
    user: DB_USERNAME || "postgres",
    host: DB_HOST || "localhost",
    database: DB_NAME || "postgres",
    password: DB_PASSWORD || "mysecretpassword",
    port: DB_PORT || 5432,
  };

  fs.writeFileSync(`${__dirname}/${fileName}`, JSON.stringify(config));
  console.log("End: Build database credentials");
};

main();
