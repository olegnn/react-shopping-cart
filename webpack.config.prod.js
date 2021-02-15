const path = require("path");
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
    ],
  },
  entry: [path.resolve(__dirname, "src/index.js")],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "production.js",
    globalObject: "this",
    library: "react-shopping-cart",
    libraryTarget: "umd",
  },
  externals: {
    react: "react",
    "react-dom": "react-dom",
    "prop-types": "prop-types",
    "react-redux": "react-redux",
    redux: "redux",
    "intl-messageformat": "intl-messageformat",
    reselect: "reselect",
    classnames: "classnames",
    "react-overlays": "react-overlays",
    "react-scroll": "react-scroll",
    "react-transition-group": "react-transition-group",
  },
  plugins: [new UglifyJSPlugin()],
};
