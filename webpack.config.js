const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

const isDev = process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
    script: path.join(__dirname, "./src/index.tsx"),
    loader: path.join(__dirname, "./src/loader.ts"),
    inject: path.join(__dirname, "./src/inject.ts")
  },
  output: {
    filename: "[name].js",
    path: isDev ? path.join(__dirname, "debug") : path.join(__dirname, "extension")
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: "manifest.json"
    }])
  ]
};