import cookieParser from "cookie-parser";
import express from "express";
import methodOverride from "method-override";
import {
  deleteBird,
  editBird,
  getEditBird,
  getAllBirds,
  getBirdById,
  getNewBird,
  postNewBird,
} from "./routes/birdAPI.js";

import {
  getSignUpForm,
  postSignUpForm,
  getLoginForm,
  postLoginForm,
  userLogout,
  getUserById,
} from "./routes/userAPI.js";

import { postNewComment } from "./routes/commentAPI.js";

const app = express();
const router = express.Router();

// routers for birds
router.get("/", getAllBirds);
router.get("/note/:id", getBirdById);
router.post("/note", postNewBird);
router.get("/note", getNewBird);

router.get("/note/:id/edit", getEditBird);
router.put("/note/:id/edit", editBird);
router.delete("/note/:id/delete", deleteBird);

// routers for users
router.get("/signup", getSignUpForm);
router.post("/signup", postSignUpForm);
router.get("/login", getLoginForm);
router.post("/login", postLoginForm);
router.delete("/logout", userLogout);

router.get("/users/:id", getUserById);

// routers for comments
router.post("/note/:id/comment", postNewComment);

// app middlewares
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false })); // get form data
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use("/", router);

app.listen(3004);
