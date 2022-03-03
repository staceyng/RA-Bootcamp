import express from "express";
// import { write } from "./jsonFileStorage.js";

const app = express();
app.set("view engine", "ejs");

app.get("/", (req, resp) => {
  console.log(req.originalUrl);
  console.log(req.query);

  resp.render("index", {});
});

app.get("/hello", (req, resp) => {
  console.log(req.originalUrl);
  console.log(req.query);

  const data = { firstName: req.query.fname, lastName: req.query.lname };

  resp.render("hello", data);
});

app.listen(3004);
