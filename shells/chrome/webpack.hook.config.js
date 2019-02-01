const path = require('path');
const createConfig = require('../createConfig');

module.exports = createConfig({
  entry: {
    globalHook: './src/content/globalHook.js',
  },
  output: {
    path: path.join(__dirname, 'tsbuild', 'content'),
    filename: '[name].js',
    jsonpFunction: 'dyasstWebpackJsonp',
  },
});
