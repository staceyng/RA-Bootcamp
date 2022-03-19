const userName = "staceyng";
const databaseName = "testdb";

export const pgConnectionConfigs = {
  user: userName,
  host: "localhost",
  database: databaseName,
  port: 5432, // Postgres server always runs on this port
};
