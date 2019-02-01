const path = require('path');
const createConfig = require('../createConfig');

module.exports = createConfig({
  entry: {
    index: './src/background/index.js',
  },
  output: {
    path: path.join(__dirname, 'tsbuild', 'background'),
    filename: '[name].js',
    jsonpFunction: 'dyasstWebpackJsonp',
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          enforce: true,
          chunks: 'all',
          name: 'vender',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
});
