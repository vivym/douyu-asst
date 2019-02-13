const path = require('path');
const createConfig = require('../createConfig');

module.exports = createConfig({
  entry: {
    room: './src/content/room.js',
    yuba: './src/content/yuba.js',
    extra: './src/content/extra.js',
    'views/panel': './src/content/views/panel.js',
    'views/notification': './src/content/views/notification.js',
    'views/tsbox': './src/content/views/tsbox.js',
    'views/capture': './src/content/views/capture.js',
    'views/barrage': './src/content/views/barrage.js',
    'views/menu': './src/content/views/menu.js',
  },
  output: {
    path: path.join(__dirname, 'tsbuild', 'content'),
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
