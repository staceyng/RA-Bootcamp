import pg from "pg";
import { pgConnectionConfigs } from "../utils/db.js";
import { getEpochTimeNow } from "../utils/time.js";

const commentTableName = "comments";

const { Pool } = pg;
const pool = new Pool(pgConnectionConfigs);

export const postNewComment = (req, resp) => {
  const birdId = req.params.id;
  const payload = req.body;
  const cookies = req.cookies;
  const userId = cookies ? cookies.userId : "";

  const comment = payload.comment;
  const now = getEpochTimeNow();
  // console.log(comment);

  const dataInput = [comment, birdId, userId, now];
  const commentQuery = `
  INSERT INTO ${commentTableName}
  (comment, bird_id, user_id, created_at)
  VALUES
  ($1, $2, $3, $4);
  `;

  pool.query(commentQuery, dataInput, (err, res) => {
    if (err) {
      console.log("[DB] Error executing query: ", err.stack);
      resp.status(503).send(res.rows);
      return;
    }

    resp.redirect(`/note/${birdId}`);
  });
};
