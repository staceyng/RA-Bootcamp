const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.jsx",
  },
  output: {
    filename: "[name]-[contenthash].bundle.js",
    path: path.resolve(__dirname, "../dist"),
    // Replace previously-compiled files with latest one on each build
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // Name this file main so it does not get automatically requested as a static file
      filename: "main.html",
      template: path.resolve(__dirname, "..", "src", "main.html"),
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        // Regex to decide which files to run Babel on
        test: /\.(js|mjs|jsx)$/, // CHANGE HERE: jsx added
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              // CHANGE HERE: ensure @babel/preset-react
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                { runtime: "automatic" },
              ],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
