import express from "express";
import { add, read, write } from "./jsonFileStorage.js";
import methodOverride from "method-override";

const app = express();
app.set("view engine", "ejs");

// Configure Express to parse request body data into request.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Override POST requests with query param ?_method=PUT to be PUT requests
app.use(methodOverride("_method"));

// Save new recipe data sent via POST request from our form
app.post("/recipe", (request, response) => {
  // Add new recipe data in request.body to recipes array in data.json.
  console.log(request.body); //[Object: null prototype] { label: 'Pasta', ingredients: 'Penne' } - https://stackoverflow.com/questions/56298481/how-to-fix-object-null-prototype-title-product
  add("data.json", "recipes", request.body, (err) => {
    if (err) {
      response.status(500).send("DB write error.");
      return;
    }
  });
  // Acknowledge recipe saved.
  response.status(200).send("add to json success");
});

// Render the form to input new recipes
app.get("/recipe", (request, response) => {
  response.render("recipe");
});

app.get("/recipe/:index/edit", (request, response) => {
  const { index } = request.params;
  read("data.json", (err, data) => {
    const renderObj = data.recipes[index];
    response.render("edit", { recipe: renderObj });
  });
});

app.put("/recipe/:index", (request, response) => {
  const { index } = request.params;
  read("data.json", (err, data) => {
    // Replace the data in the object at the given index
    data["recipes"][index] = request.body;
    write("data.json", data, (err) => {
      response.send("Done!");
    });
  });
});

app.listen(3004);
