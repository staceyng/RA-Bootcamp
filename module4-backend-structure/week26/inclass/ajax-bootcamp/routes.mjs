import db from "./models/index.mjs";
import initItemsController from "./controllers/items.mjs";

const renderHomepage = (req, resp) => {
  resp.render("index");
};

export default function bindRoutes(app) {
  const ItemsController = initItemsController(db);
  app.get("/items", ItemsController.index);

  app.get("/", renderHomepage);
}
