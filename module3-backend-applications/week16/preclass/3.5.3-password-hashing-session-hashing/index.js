import express from "express";
import cookieParser from "cookie-parser";

import {
  getSignUpForm,
  postSignUpForm,
  getLoginForm,
  postLoginForm,
  userLogout,
  specialRequest,
} from "./routes/api.js";
import { checkAuth } from "./middleware.js";

const app = express();
const router = express.Router();

// routers
router.get("/signup", getSignUpForm);
router.post("/signup", postSignUpForm);
router.get("/login", getLoginForm);
router.post("/login", postLoginForm);
router.get("/logout", userLogout); // should use delete here
router.get("/special", checkAuth, specialRequest); // should use delete here

// app middlewares
app.set("view engine", "ejs");
// app.use(express.static("public"));
app.use(express.urlencoded({ extended: false })); // get form data
app.use(cookieParser());
app.use("/", router);

app.listen(3004);
