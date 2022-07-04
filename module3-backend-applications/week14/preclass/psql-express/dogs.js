import pg from "pg";
const { Client } = pg;

const userName = "staceyng";
const databaseName = "testdb";

// set the way we will connect to the server
const pgConnectionConfigs = {
  user: userName,
  host: "localhost",
  database: databaseName,
  port: 5432, // Postgres server always runs on this port
};

// create the var we'll use
const client = new Client(pgConnectionConfigs);

// make the connection to the server
client.connect();

// create the query done callback
const whenQueryDone = (error, result) => {
  // this error is anything that goes wrong with the query
  if (error) {
    console.log("error", error);
  } else {
    // rows key has the data
    console.log(result.rows);
  }

  // close the connection
  client.end();
};

/*
CREATE TABLE dogs (
    id SERIAL PRIMARY KEY,
    name TEXT,
    type TEXT,
    weight INTEGER
);
*/
const args = process.argv.slice(2);

switch (true) {
  case args.length === 1:
    if (args[0] == "all-dogs") {
      const getAllDogsQuery = "SELECT * from dogs;";
      client.query(getAllDogsQuery, whenQueryDone);
    } else {
      console.log("unknown arg provided");
    }
    break;
  case args.length === 3:
    const inputData = [args[0], args[1], args[2]];
    const insertQuery =
      "INSERT INTO dogs (name, type, weight) VALUES ($1, $2, $3);";
    client.query(insertQuery, inputData, whenQueryDone);
    break;
  default:
    console.log("unknown arg provided");
    break;
}
