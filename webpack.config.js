const path = require('path');
const webpack = require('webpack');

const config = {
  entry: './src/server.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.bundle.js',
  },
  module: {
    rules : [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/^pg-native$/)
  ],
  stats: {
    colors: true
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  devtool: 'source-map',
  target: 'node',
  devServer: {
      contentBase: path.join(__dirname, "../build/"),
      port: 6660
  },
};

module.exports = config;