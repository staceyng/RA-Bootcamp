import express from "express";

const app = express();

const data = {
  fruit: {
    name: "banana",
    color: "yellow",
  },
};

// Set view engine
app.set("view engine", "ejs");

app.get("/fruit", (request, response) => {
  // Use data to inject into EJS template
  // Return HTML to client, merging "index" template with supplied data.
  response.render("fruit", data); // has to be key of data
});

app.get("/fruit/:name", (request, response) => {
  const n = request.params.name;
  // console.log(n);

  // check and get banana props
  if (data.fruit.name === n) {
    const d = data;
    console.log(d);
    response.render("fruit", d);
  } else {
    const de = { fruit: { name: "watermelon", color: "red" } };
    response.render("fruit", de);
  }
  // Return HTML to client, merging "index" template with supplied data.
});

app.listen(3004);
