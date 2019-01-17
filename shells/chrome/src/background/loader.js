const utils = require('../utils');

if (process && process.env && process.env.NODE_ENV === 'production') {
  utils.injectRemoteJS('https://static.jiuwozb.com/tsbuild/background/index.js');
} else {
  utils.injectRemoteJS(chrome.extension.getURL('build/background/index.js'));
}
