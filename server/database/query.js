import { Pool } from "pg";
import { CURRENT_ENVIRONMENT } from "../config/environments";
import databaseCredentials from "../config/database-credentials.json";

const pool = new Pool(databaseCredentials[CURRENT_ENVIRONMENT]);

export const query = (query) =>
  new Promise((resolve, reject) => {
    pool.query(query, (error, res) => (error ? reject(error) : resolve(res)));
  });
