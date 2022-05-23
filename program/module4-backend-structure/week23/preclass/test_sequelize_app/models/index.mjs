import sequelizePackage from "sequelize";
import allConfig from "../config/config.js";

import initItemModel from "./item.mjs";
import initCategoryModel from "./category.mjs";

const { Sequelize } = sequelizePackage;
const env = process.env.NODE_ENV || "development";
const config = allConfig[env];
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.Item = initItemModel(sequelize, Sequelize.DataTypes);
db.Category = initCategoryModel(sequelize, Sequelize.DataTypes);

// The following 2 lines enable Sequelize to recognise the 1-M relationship
// between Item and Category models, providing the mixin association methods.
db.Item.belongsTo(db.Category);
db.Category.hasMany(db.Item);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
