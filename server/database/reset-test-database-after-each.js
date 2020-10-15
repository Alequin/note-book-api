import DBMigrate from "db-migrate";
import path from "path";
import { CURRENT_ENVIRONMENT } from "../config/environments";
import { query } from "./query";

export const resetTestDatabaseAfterEach = () => {
  beforeAll(async () => {
    await getMigrationInstance().up();
  });

  const tablesToIgnore = ["migrations"];
  afterEach(async () => {
    const tableNames = await query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema='public'
      AND table_type='BASE TABLE';
    `);

    await Promise.all(
      tableNames
        .filter(({ table_name }) => !tablesToIgnore.includes(table_name))
        .map(({ table_name }) => table_name)
        .map(async (tableName) =>
          query(`TRUNCATE ${tableName} RESTART IDENTITY`),
        ),
    );
  });

  afterAll(async () => {
    await getMigrationInstance().reset();
  });
};

const getMigrationInstance = () => {
  const instance = DBMigrate.getInstance(true, {
    config: path.resolve(__dirname, "../config/database-credentials.json"),
    env: CURRENT_ENVIRONMENT,
    cmdOptions: {
      "migrations-dir": path.resolve(__dirname, "./migrations"),
    },
  });
  instance.silence(true);
  return instance;
};
