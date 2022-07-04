import { render } from "ejs";
import express from "express";
import { read } from "./jsonFileStorage.js";

const app = express();
const router = express.Router();
const FILENAME = "data.json";

const getRecipeByIndex = (req, resp) => {
  const recipeIdx = parseInt(req.params.index, 10);

  read(FILENAME, (err, d) => {
    if (err) {
      resp.status(500).send({ error: { message: `json read error - ${err}` } });
      return;
    }

    if (recipeIdx >= 0 && recipeIdx < d.recipes.length) {
      const renderObj = { recipe: d.recipes[recipeIdx] };
      resp.render("singleRecipe", renderObj);
      // resp.status(200).send(d.recipes[recipeIdx]);
    } else {
      resp.status(400).send({
        error: { message: `invalid index ${req.params.index} in request` },
      });
    }
  });
};

const getAllRecipes = (req, resp) => {
  read(FILENAME, (err, d) => {
    if (err) {
      resp.status(500).send({ error: { message: `json read error - ${err}` } });
      return;
    }

    categoryObj = {};

    d.recipes.forEach((r) => {
      if (r.category) {
        categoryObj;
      }
    });

    const renderObj = { recipes: d.recipes };
    resp.render("allRecipes", renderObj);
  });
};

const getRecipesByCategory = (req, resp) => {
  read(FILENAME, (err, d) => {
    if (err) {
      resp.status(500).send({ error: { message: `json read error - ${err}` } });
      return;
    }

    const category = req.params.category;
    const recipesWithCategory = d.recipes.filter(
      (r) => r.category && r.category.toLowerCase() === category
    );
    const prettyCategory = recipesWithCategory[0].category;

    const renderObj = {
      recipes: recipesWithCategory,
      prettyCategory: prettyCategory,
      category: category,
    };

    resp.render("categoryRecipes", renderObj);
  });
};

const getRecipesByCategoryIndex = (req, resp) => {
  read(FILENAME, (err, d) => {
    if (err) {
      resp.status(500).send({ error: { message: `json read error - ${err}` } });
      return;
    }

    const category = req.params.category;
    const index = req.params.index;
    const recipesWithCategory = d.recipes.filter(
      (r) => r.category && r.category.toLowerCase() === category
    );

    const renderObj = { recipe: recipesWithCategory[index] };
    resp.render("categoryIndex", renderObj);
  });
};

const loggerMiddleWare = (req, resp, next) => {
  console.log(`[DEBUG] request url: ${req.originalUrl}`);
  next();
};

const main = () => {
  // setup routers
  router.get("/recipe", getAllRecipes);
  router.get("/recipe/:index", getRecipeByIndex);
  router.get("/category/:category", getRecipesByCategory);
  router.get("/category/:category/:index", getRecipesByCategoryIndex);

  app.set("view engine", "ejs");
  app.use(express.static("public"));
  app.use(loggerMiddleWare);
  app.use("/", router);
  app.listen(3004);
};

main();
