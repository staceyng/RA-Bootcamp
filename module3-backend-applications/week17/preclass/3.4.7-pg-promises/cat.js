import pg from "pg";
const { Client } = pg;

const userName = "staceyng";
const databaseName = "testdb";

const pgConnectionConfigs = {
  user: userName,
  host: "localhost",
  database: databaseName,
  port: 5432,
};

const client = new Client(pgConnectionConfigs);
client.connect();

let query = "";

// SELECT Query with promises
// query = "SELECT * FROM cats";
// client
//   .query(query)
//   .then((result) => console.log(result.rows[0])) // i only want the first cat
//   .catch((error) => console.log(error.stack));

// INSERT query with promise
const values = ["Mochi", "Ragdoll", "1600"];
query = "INSERT INTO cats (name, type, weight) VALUES ($1, $2, $3) RETURNING *";
client
  .query(query, values)
  .then((result) => console.log(result.rows[0])) // i only want the first cat
  .catch((error) => console.log(error.stack));
