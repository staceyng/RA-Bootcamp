import pg from "pg";
import moment from "moment";
const { Client } = pg;

const userName = "staceyng";
const databaseName = "testdb";
const tableName = "dogs";

const pgConnectionConfigs = {
  user: userName,
  host: "localhost",
  database: databaseName,
  port: 5432,
};

const client = new Client(pgConnectionConfigs);
client.connect();

let query = "";
// const values = ["cookie", "beagle"];
// query = `INSERT INTO ${tableName} (name, breed) VALUES ($1, $2) RETURNING *`;
// client
//   .query(query, values)
//   .then((result) => console.log(result.rows[0]))
//   .catch((error) => console.log(error.stack))
//   .then(() => client.end());

query = `SELECT * from ${tableName};`;
const handleResult = (result) => {
  result.rows.forEach((d) => {
    console.log(d);
    console.log(d.created_at);
    console.log(moment(d.created_at).from());
  });
};
client
  .query(query)
  .then((result) => handleResult(result))
  .catch((error) => console.log(error.stack))
  .then(() => client.end());
