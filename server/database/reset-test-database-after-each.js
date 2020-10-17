import { query } from "./query";
import { dbMigrations } from "./db-migrations";

export const resetTestDatabaseAfterEach = () => {
  beforeAll(async () => {
    const migrationInstance = dbMigrations();
    await migrationInstance.reset();
    await migrationInstance.up();
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

  afterAll(async () => dbMigrations().reset());
};
