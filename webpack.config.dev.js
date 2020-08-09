const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          { loader: "react-hot-loader/webpack" },
          { loader: "babel-loader" },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
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
        use: "file-loader?name=index.html",
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
  devServer: {
    open: true, // to open the local server in browser
    index: path.resolve(__dirname, "examples/example1/app.js"),
    contentBase: path.resolve(__dirname, "examples/example1/"),
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
