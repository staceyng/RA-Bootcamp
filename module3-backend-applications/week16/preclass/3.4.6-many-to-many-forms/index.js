import express from "express";
import { getRecipeForm, postRecipeForm } from "./routes/api.js";

const app = express();
const router = express.Router();

// routers
router.get("/recipe/new", getRecipeForm);
router.post("/recipe/:id/categories", postRecipeForm);

// app middlewares
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false })); // get form data
app.use("/", router);

app.listen(3004);
