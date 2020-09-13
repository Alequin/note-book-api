import { Pool } from "pg";
import databaseCredentials from "./config/database-credentials.json";

const pool = new Pool(databaseCredentials);

export const database = (query) =>
  new Promise((resolve, reject) => {
    pool.query(query, (error, res) => (error ? reject(error) : resolve(res)));
  });
