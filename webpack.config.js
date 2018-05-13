const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

const isDev = process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
    script: path.join(__dirname, "./src/index.tsx"),
    loader: path.join(__dirname, "./src/loader.ts")
  },
  output: {
    filename: "[name].js",
    path: isDev ? path.join(__dirname, "debug") : path.join(__dirname, "extension")
  },
  module: {
    rules: [{
      test: /\.scss/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            url: false,
            sourceMap: true,
            importHeaders: 2
          }
        },
        {
          loader: "sass-loader",
          options: {
            sourceMap: true
          }
        }
      ]
    }]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: "manifest.json"
    }])
  ]
};