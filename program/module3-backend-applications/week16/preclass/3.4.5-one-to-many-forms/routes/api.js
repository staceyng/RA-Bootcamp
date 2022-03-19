import { render } from "ejs";
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

    const renderObj = { categories: data };
    resp.render("form", renderObj);
  });
};

export const postRecipeForm = (req, resp) => {
  const payload = req.body; // category_id, label
  console.log("[DEBUG] payload: ", payload);
  const dataInput = [payload.category_id, payload.label];
  const query = "INSERT INTO recipes (label, category_id) VALUES ($2, $1);";

  pool.query(query, dataInput, (err, res) => {
    if (err) {
      console.error("[DB] Error executing sql: ", err.stack);
      resp.status(503).send(res.rows);
      return;
    }
    const renderObj = { message: "recipe successfully added" };
    resp.render("add", renderObj);
  });
};
