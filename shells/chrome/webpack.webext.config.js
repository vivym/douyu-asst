const path = require('path');
const createConfig = require('../createConfig');

module.exports = createConfig({
  entry: {
    popup_loader: './src/popup/loader.js',
    bg_loader: './src/background/loader.js',
    content_loader: './src/content/loader.js',
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
});
