const path = require('path');
const createConfig = require('../createConfig');

module.exports = createConfig({
  entry: {
    popup: './src/popup.js',
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
});