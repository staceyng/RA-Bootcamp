const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  devtool: false,
  entry: "./src/index.js",
  output: {
    filename: "output.js",
    path: path.resolve(__dirname, "OUTPUT"),
  },
  plugins: [new MiniCssExtractPlugin()],
  // loaders
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
