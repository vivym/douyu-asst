const path = require('path');
const createConfig = require('../createConfig');

module.exports = createConfig({
  entry: {
    index: './src/popup/index.js',
  },
  output: {
    path: path.join(__dirname, 'tsbuild', 'popup'),
    filename: '[name].js',
  },
});
