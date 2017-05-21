const path = require('path');
const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'react-hot-loader/webpack',
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  entry: [
    'webpack/hot/dev-server',
    path.resolve(__dirname, 'examples/example1/app.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'examples/build'),
    filename: 'bundle.js',
  },
  devServer: {
    open: true, // to open the local server in browser
    contentBase: path.resolve(__dirname, 'examples/build'),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
