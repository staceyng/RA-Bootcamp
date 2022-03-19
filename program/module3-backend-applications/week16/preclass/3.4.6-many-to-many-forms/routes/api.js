import pg from "pg";
import { pgConnectionConfigs } from "../db/db.js";

const { Pool } = pg;
const pool = new Pool(pgConnectionConfigs);

export const getRecipeForm = (req, resp) => {
  const dataInput = [];
  const query = `SELECT * FROM categories;`;
  pool.query(query, dataInput, (err, res) => {
    if (err) {
      console.error("[DB] Error executing sql: ", err.stack);
      resp.status(503).send(res.rows);
      return;
    }

    const data = res.rows;
    console.log("[DEBUG] data: ", data);

    const renderObj = { categories: data, recipeId: 1 };
    resp.render("form", renderObj);
  });
};

export const postRecipeForm = (req, resp) => {
  const payload = req.body.category_ids; // arr of ids
  const recipeId = req.params.id;
  console.log("[DEBUG] payload: ", payload);
  const query =
    "INSERT INTO recipe_categories (recipe_id, category_id) VALUES ($1, $2);";

  payload.forEach((cid) => {
    const dataInput = [recipeId, cid];
    pool.query(query, dataInput, (err, res) => {
      if (err) {
        console.error("[DB] Error executing sql: ", err.stack);
        resp.status(503).send(res.rows);
        return;
      }
      const renderObj = { message: "recipe_category successfully added" };
      resp.render("add", renderObj);
    });
  });
};
