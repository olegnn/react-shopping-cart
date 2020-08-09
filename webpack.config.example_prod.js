const path = require("path");
const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: "file-loader?name=public/fonts/[name].[ext]",
      },
      {
        test: /\.jpeg$/,
        use: "file-loader?name=public/[name].jpeg",
      },
      {
        test: /\.html$/,
        use: "file-loader?name=[name].[ext]",
      },
    ],
  },
  entry: [
    path.resolve(__dirname, "examples/example1/app.js"),
    path.resolve(__dirname, "examples/example1/index.html"),
    path.resolve(__dirname, "examples/example1/macbook-case-photo.jpeg"),
  ],
  output: {
    path: path.resolve(__dirname, "examples/example1/build"),
    filename: "bundle.js",
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new UglifyJSPlugin(),
  ],
};
