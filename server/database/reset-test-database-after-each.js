import { query } from "./query";

export const thing = () => {
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
};
