const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

const isDev = process.env.NODE_ENV === "development";
const isLocal = !!process.env.LOCAL;

const outputPath = isDev ? path.join(__dirname, isLocal ? "local" : "debug") : path.join(__dirname, "extension");


module.exports = {
  entry: {
    script: path.join(__dirname, "./src/index.tsx"),
    loader: path.join(__dirname, "./src/loader.ts"),
    inject: path.join(__dirname, "./src/inject.ts")
  },
  devtool: isDev ? "source-map" : false,
  watch: isDev,
  resolve: {
    extensions: [
      ".ts", ".tsx", ".js", ".svg"
    ]
  },
  output: {
    filename: "[name].js",
    path: outputPath
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: {
        loader: "ts-loader",
        options: {
          transpileOnly: !isDev
        }
      },
    }, {
      test: /\.svg$/,
      use: {
        loader: "react-svg-loader"
      }
    }]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: path.join(__dirname, "assets/manifest.json"),
    }])
  ]
};

if (isDev && process.env.LOCAL) {
  const servePort = 8081;
  const chokidar = require('chokidar');
  module.exports.mode = "development";
  module.exports.serve = {
    content: [path.resolve(__dirname, './index.html')],

    config: {},
    hot: {
      host: 'localhost',
      port: servePort,
    },
    open: true,
  }
}