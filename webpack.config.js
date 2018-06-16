const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const WebSocket = require("ws");

const isDev = process.env.NODE_ENV !== "production";
const isLocal = !!process.env.LOCAL;

const outputPath = isDev ? path.join(__dirname, isLocal ? "local" : "debug") : path.join(__dirname, "extension");

const servePort = 8080;

module.exports = {
  entry: {
    script: path.join(__dirname, "./src/index.tsx"),
    loader: path.join(__dirname, "./src/loader.ts"),
    inject: path.join(__dirname, "./src/inject.ts")
  },
  output: {
    filename: "[name].js",
    path: outputPath
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: "manifest.json"
    }])
  ]
};

if (isDev && process.env.LOCAL) {
  const chokidar = require('chokidar');
  module.exports.mode = "development";
  module.exports.serve = {
    content: [path.resolve(__dirname, 'local')],

    config: {},
    hot: {
      host: 'localhost',
      port: servePort,
    },
    open: true,
    on: {
      'listening': () => {
        console.log('listening');
        const socket = new WebSocket(`ws://localhost:${servePort}`);
        const watchPath = __dirname;
        const options = {};
        const watcher = chokidar.watch(watchPath, options);
        watcher.on('change', () => {
          const data = {
            type: 'broadcast',
            data: {
              type: 'window-reload',
              data: {},
            },
          };

          socket.send(JSON.stringify(data));
        });
      }
    },
  }
}