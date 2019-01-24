const path = require('path');
const createConfig = require('../createConfig');

module.exports = createConfig({
  entry: {
    popup_loader: './src/popup/loader.js',
    bg_loader: './src/background/loader.js',
    content_loader: './src/content/loader.js',
    'popup/index': './src/popup/index.js',
    'background/index': './src/background/index.js',
    'content/room': './src/content/room.js',
    'content/yuba': './src/content/yuba.js',
    'content/extra': './src/content/extra.js',
    'content/panel': './src/content/panel.js',
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
});
