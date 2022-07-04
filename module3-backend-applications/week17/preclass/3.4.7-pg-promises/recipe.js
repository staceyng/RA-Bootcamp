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

const categoryName = "vegan"; // from request.query
query = "SELECT * from categories WHERE name = $1";
const values = [categoryName];

client
  .query(query, values)
  .then((result) => {
    // TODO: check if result.rows contains a row
    console.log(result.rows[0]);
    const categoryId = result.rows[0].id;
    return client.query(
      `SELECT
        recipes.id,
        recipes.label,
        recipes.category_id AS recipe_category_id,
        categories.id AS category_id,
        categories.name AS category_name
      FROM recipes
      INNER JOIN categories
      ON categories.id=recipes.category_id
      WHERE category_id=$1`,
      [categoryId]
    );
  })
  .then((result) => {
    console.log(`all recipes with category ${categoryName}`);
    console.log(result.rows);
  })
  .catch((error) => console.log(error.stack));
