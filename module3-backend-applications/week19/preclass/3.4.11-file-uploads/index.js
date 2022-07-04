import multer from "multer";
import express from "express";
// set the name of the upload directory here

const multerUpload = multer({ dest: "uploads/" });
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false })); // get form data

app.get("/recipe", (request, response) => {
  response.render("upload");
});

app.post("/recipe", multerUpload.single("photo"), (request, response) => {
  console.log(request.file);
  response.status(200).send("worked");
});

app.listen(3004);
