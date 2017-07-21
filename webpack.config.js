'use strict';

const webpack = require("webpack")
const path = require("path")
const UglifyJSPlugin = require('uglify-es-webpack-plugin');

const env = process.env.NODE_ENV;

const entry = env == 'production' ? [ "./src/client/index.js" ] : [
  "webpack-dev-server/client?http://localhost:7070",
  "webpack/hot/only-dev-server",
  "./src/client/index.js"
];

const devServer = env == 'produciton' ? {} : {
  contentBase: "./public",
  hot: true,
  host: "localhost",
  port: 7070,
  proxy: {
    "**": "http://localhost:" + 3000
  }
}

const plugins = env == 'production' ? [
  new UglifyJSPlugin()
] : [
  new webpack.HotModuleReplacementPlugin()
];

const configs = {
  entry,
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, "src"),
      use: ["react-hot-loader", "babel-loader"]
    }]
  },
  output: {
    filename: "boundle.js",
    path: __dirname + "/build",
    publicPath: '/build/',
    // publicPath: "http://localhost:7070/build",
  },
  devServer,
  plugins,
}


module.exports = configs;
