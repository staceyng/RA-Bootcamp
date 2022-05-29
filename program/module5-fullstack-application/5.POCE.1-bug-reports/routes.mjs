import { Router } from "express";
import BugController from "./controllers/bug.controller.mjs";
import FeatureController from "./controllers/feature.controller.mjs";
import db from "./models/index.mjs";

// import your controllers here

export default function bindRoutes(app) {
  // initialize the controller functions here
  // pass in the db for all callbacks
  const featureController = new FeatureController(db);
  const bugController = new BugController(db);

  // define your route matchers here using app

  // feature endpoints
  app.get("/features", featureController.getFeatures);
  app.get("/new-features", featureController.getFeatureForm);

  // bugs endpoints
  app.get("/", bugController.getBugForm);
  app.get("/all-bugs", bugController.getBugListView);

  app.get("/bugs", bugController.getBugs);
  app.post("/bugs", bugController.createBug);
}
