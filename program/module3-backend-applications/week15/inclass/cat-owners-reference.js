import pg from "pg";
const { Client } = pg;

// set the way we will connect to the server
const pgConnectionConfigs = {
  user: "kennethongcs",
  host: "localhost",
  database: "cat_owners",
  port: 5432, // Postgres server always runs on this port
};

// create the var we'll use
const client = new Client(pgConnectionConfigs);

client.connect();

const command = process.argv[2];
let sqlQuery;
let insertData;

if (command === "create-owner") {
  insertData = [process.argv[3]];
  sqlQuery = "INSERT INTO owners (name) VALUES ($1)";
}
if (command === "create-cat") {
  insertData = [process.argv[3], process.argv[4]];
  sqlQuery = "INSERT INTO cats (owner_id, name) VALUES ($1, $2)";
}
if (command === "cats") {
  insertData = [];
  sqlQuery = "SELECT * FROM cats";
}

// query here
client.query(sqlQuery, insertData, (catErr, catData) => {
  if (catErr) {
    console.log("Error:", catErr);
    client.end();
  }

  const result = catData.rows;
  // console.log(result);
  // {id, name, owner_id}

  if (result.length <= 0) {
    console.log("no results");
    client.end();
  }

  const ownersQuery = `SELECT * FROM owners`;
  client.query(ownersQuery, (ownerErr, ownerData) => {
    if (ownerErr) {
      console.log("Error:", ownerErr);
      client.end();
    }

    const owners = ownerData.rows;
    console.log(owners);
    // owners made into 1 single object
    const obj = {}; // key : id , value: name
    for (let j = 0; j < owners.length; j += 1) {
      obj[owners[j].id] = owners[j].name;
    }

    console.log(obj); // { '1': 'Jim', '2': 'Stacey', '3': 'Kenneth' }
    console.log(result);

    for (let i = 0; i < result.length; i += 1) {
      const cat = result[i]; // { id: 1, name: 'Fluffy', owner_id: 1 }
      // console.log(`${cat.name}, ${cat.owner_id}`);
      console.log(`${cat.name}, ${obj[cat.owner_id]}`); // and this also rip
    }
    // {id, name}
    // console.log(owners);
    client.end();
  });

  // console.log(catQuery);
});
