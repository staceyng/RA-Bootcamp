const userName = "staceyng";
const databaseName = "ra_birds";

// set the way we will connect to the server
export const pgConnectionConfigs = {
  user: userName,
  host: "localhost",
  database: databaseName,
  port: 5432, // Postgres server always runs on this port
};
