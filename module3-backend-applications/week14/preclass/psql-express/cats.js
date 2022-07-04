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

// write the SQL query
// const sqlQuery = "SELECT * from cats";

// run the SQL query
// client.query(sqlQuery, whenQueryDone);

// insert another row with these values
// const insertQuery =
//   "INSERT INTO cats (name, type, weight) VALUES ('Mr. Potato', 'Calico', 344)";

// client.query(insertQuery, whenQueryDone);

const inputData = ["Mr. Snuggles", "Calico", 327];

// in this example, $1 is going to be replaced with 'Mr. Snuggles'
const insertQuery2 =
  "INSERT INTO cats (name, type, weight) VALUES ($1, $2, $3)";

client.query(insertQuery2, inputData, whenQueryDone);
