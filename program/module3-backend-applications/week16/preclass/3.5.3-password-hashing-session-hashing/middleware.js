import pg from "pg";
import { pgConnectionConfigs } from "../db/db.js";

const { Pool } = pg;
const pool = new Pool(pgConnectionConfigs);

export const checkAuth = (req, resp, next) => {
  // query user db to get login session, see if it password_hash == loginHash in cookies
  // should check for hash value
  const q = "SELECT ";
  pool.query();
  if (req.cookies.loggedIn === undefined) {
    resp.status(403).send("unauthorised action");
  }

  next();
};
