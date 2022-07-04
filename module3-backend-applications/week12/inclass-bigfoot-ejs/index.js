import express from "express";
import { add, read } from "./jsonFileStorage.js";
import sortBy from "lodash";

const app = express();
const router = express.Router();
const FILENAME = "./data.json";
const FILENAME2 = "./data2.json";

const getAllSightings = (req, resp) => {
  read(FILENAME2, (err, data) => {
    if (err) {
      console.log("read error: ", err);
      return;
    }
    const all = { sightings: data.sightings };
    resp.render("bigfoot", all);
  });
};

const getSightingByIndex = (req, resp) => {
  const idx = req.params.index;
  read(FILENAME2, (err, data) => {
    if (err) {
      console.log("read error: ", err);
      return;
    }

    const d = { result: { sighting: data.sightings[idx], index: idx } };
    resp.render("singleSighting", d);
  });
};

const getSightingsByYear = (req, resp) => {
  const year = req.params.year;
  read(FILENAME2, (err, data) => {
    if (err) {
      console.log("read error: ", err);
      return;
    }

    const yearSightings = data.sightings.filter((s) => s.year === year);
    const d = { sightings: yearSightings, year: year };

    resp.render("year", d);
  });
};

const getYearSightings = (req, resp) => {
  // console.log(req.query);
  const sortOrder = req.query.sort;
  // console.log(sortOrder);
  let yearObj = {};
  read(FILENAME2, (err, data) => {
    if (err) {
      console.log("read error: ", err);
      return;
    }

    data.sightings.forEach((s) => {
      const y = s.year;
      if (!(y in yearObj) && y != undefined) {
        yearObj[y] = true;
      }
    });

    const yearArray = Object.keys(yearObj).map((k) => parseInt(k));

    console.log(yearArray);

    if (sortOrder === "asc") {
      yearArray.sort((a, b) => a - b);
    } else {
      yearArray.sort((a, b) => b - a);
    }
    console.log(yearArray);

    const d = { years: yearArray };

    resp.render("yearSightings", d);
  });
};

const postNewSightingForm = (req, resp) => {
  resp.render("postSightings");
};

const addNewSighting = (req, resp) => {
  console.log(req.body);
  const payload = { ...req.body };
  const y = parseInt(payload.year);
  payload.year = y;

  console.log(payload);

  add(FILENAME2, "sightings", payload, (err, data) => {
    if (err) {
      console.log("add error: ", err);
    }
  });

  resp.redirect("/added-sighting");
};

const getLatestSighting = (req, resp) => {
  read(FILENAME2, (err, data) => {
    if (err) {
      console.log("read error: ", err);
    }

    const latest = data.sightings.length - 1;
    const renderObj = { sighting: data.sightings[latest] };

    resp.render("addSighting", renderObj);
  });
};

const main = () => {
  router.get("/sightings", getAllSightings);
  router.get("/sightings/:index", getSightingByIndex);
  router.get("/year-sightings", getYearSightings);
  router.get("/year-sightings/:year", getSightingsByYear);

  router.get("/new-sighting", postNewSightingForm);
  router.post("/new-sighting", addNewSighting);
  router.get("/added-sighting", getLatestSighting);

  app.set("view engine", "ejs");
  app.use(express.urlencoded({ extended: false }));
  app.use("/", router);
  app.listen(3004);
};

main();
