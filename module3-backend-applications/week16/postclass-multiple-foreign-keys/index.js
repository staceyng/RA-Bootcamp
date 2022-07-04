import pg from "pg";
const { Pool } = pg;

const pgConnectionConfigs = {
  user: "staceyng",
  host: "localhost",
  database: "ra_museum",
  port: 5432, // Postgres server always runs on this port
};

const pool = new Pool(pgConnectionConfigs);

const [
  appName, // 0
  scriptName,
  cmdName,
  paintingName,
  artistId,
  collectionId,
] = process.argv;

if (cmdName === "new-painting") {
  // assume artist and collection is already in table - add to paintings
  const inputData = [paintingName, artistId, collectionId];
  const paintingQuery =
    "INSERT INTO paintings (name, artist_id, collection_id) VALUES ($1, $2, $3);";
  pool.query(paintingQuery, inputData, (err, res) => {
    if (err) {
      console.log("DB ERROR: ", err);
      return;
    }
    console.log("insert successful");
  });
}

if (cmdName === "get-painting") {
  // get artists in the collection
  const inputData = [paintingName]; // this is collection name
  const artistQuery =
    "SELECT DISTINCT artists.name from artists INNER JOIN paintings ON paintings.artist_id = artists.id INNER JOIN collections ON collections.id = paintings.collection_id WHERE collections.name = $1;";
  pool.query(artistQuery, inputData, (err, res) => {
    if (err) {
      console.log("DB ERROR: ", err);
      return;
    }

    const data = res.rows;
    data.forEach((n, idx) => {
      console.log(`${idx + 1}. ${n.name}`);
    });
  });
}
