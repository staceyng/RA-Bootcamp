import { response } from "express";

class BugController {
  constructor(db) {
    this.db = db;
  }

  getBugs = async (request, response) => {
    try {
      const resp = await this.db.Bug.findAll();
      console.log(resp);
      console.log(JSON.stringify(resp));

      // const bugs = resp.toJSON();
      // console.log(bugs);
      response.status(200).send(resp);
      // response.status(200).render("bugs/bugList");
    } catch (err) {
      console.log(err);
    }
  };

  getBugListView = async (request, response) => {
    try {
      response.render("bugs/bugList");
    } catch (err) {
      console.log(err);
    }
  };

  getBugForm = async (request, response) => {
    try {
      response.render("bugs/bugForm");
    } catch (err) {
      console.log(err);
    }
  };

  createBug = async (request, response) => {
    try {
      const body = request.body;
      console.log(request.body);

      const resp = await this.db.Bug.create({
        problem: body.problem,
        error_text: body.error_text,
        commit: body.commit,
        feature_id: parseInt(body.feature_id),
      });
      console.log(resp);

      const newBug = resp.toJSON();
      console.log(newBug);

      response.status(200).send(newBug);
    } catch (err) {
      console.log(err);
    }
  };
}

export default BugController;
