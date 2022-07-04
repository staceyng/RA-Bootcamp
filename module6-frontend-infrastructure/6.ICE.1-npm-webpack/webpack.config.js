const path = require("path");

module.exports = {
  mode: "development", // production
  entry: "./src/index.js",
  output: {
    filename: "output.js",
    path: path.resolve(__dirname, "dist"),
  },
};
