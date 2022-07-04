class FeatureController {
  constructor(db) {
    this.db = db;
  }

  getFeatures = async (request, response) => {
    try {
      const resp = await this.db.Feature.findAll();
      console.log(resp);

      const features = JSON.parse(JSON.stringify(resp));
      console.log(features);
      response.status(200).send(features);
    } catch (err) {
      console.log(err);
    }
  };

  getFeatureForm = async (request, response) => {
    response.render("features/featureForm");
  };
}

export default FeatureController;
