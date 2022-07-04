import pg from "pg";
import { pgConnectionConfigs } from "./db.js";

const { Pool } = pg;
const pool = new Pool(pgConnectionConfigs);

export const getSignUpForm = (req, resp) => {
  const renderObj = { action: "signup" };
  resp.render("forms", renderObj);
};

export const postSignUpForm = (req, resp) => {
  const user = req.body;
  console.log("[DEBUG] signup payload: ", user);

  const dataInput = [user.email, user.password];
  const query = `INSERT INTO users (email, password) VALUES ($1, $2);`;

  const whenQueryDone = (err, res) => {
    if (err) {
      console.error("[DB] Error running query: ", err);
      resp.status(503).send(res.rows);
      return;
    }

    resp.redirect("/login");
  };

  pool.query(query, dataInput, whenQueryDone);
};

export const getLoginForm = (req, resp) => {
  const renderObj = { action: "login" };
  resp.render("forms", renderObj);
};

export const postLoginForm = (req, resp) => {
  const login = req.body;
  console.log("[DEBUG] login payload: ", login);

  const dataInput = [login.email];
  pool.query("SELECT * from users where email = $1;", dataInput, (err, res) => {
    if (err) {
      console.error("[DB] Error running query: ", err);
      resp.status(503).send(res.rows);
      return;
    }

    if (res.rows.length === 0) {
      // did not find user with that email in table
      resp.status(401).send(`Sorry no user with ${login.email} found`);
      return;
    }

    const user = res.rows[0];
    if (user.password === login.password) {
      // password accepted, keep login state in cookie
      resp.cookie("loggedIn", true);
      const renderObj = { message: "Login successful" };
      resp.render("login", renderObj);
    } else {
      // incorrect password
      resp.status(401).send("Sorry you have entered an incorrect password");
    }
  });
};

export const userLogout = (req, resp) => {
  resp.clearCookie("loggedIn");
  resp.redirect("/login");
};
