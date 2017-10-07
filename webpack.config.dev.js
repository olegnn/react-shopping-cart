const path = require('path');
const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          { loader: 'react-hot-loader/webpack', },
          { loader: 'babel-loader', },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader', },
          { loader: 'css-loader', },
          { loader: 'sass-loader', },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader', },
          { loader: 'css-loader', },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader?name=public/fonts/[name].[ext]',
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
