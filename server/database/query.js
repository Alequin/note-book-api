import { Pool } from "pg";
import { CURRENT_ENVIRONMENT } from "../config/environments";
import databaseCredentials from "../config/database-credentials.json";

const pool = new Pool(databaseCredentials[CURRENT_ENVIRONMENT]);

export const query = (query, args) =>
  new Promise((resolve, reject) => {
    pool.query(query, args, (error, res) =>
      error ? reject(error) : resolve(res.rows),
    );
  });

process.on("exit", () => {
  pool.end();
});
