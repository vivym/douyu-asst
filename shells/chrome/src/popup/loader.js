const { injectRemoteJS } = require('../utils');
const { jsBundleUrl } = require('config');

if (process && process.env && process.env.NODE_ENV === 'production') {
  injectRemoteJS(`${jsBundleUrl}/popup/index.js`);
} else {
  injectRemoteJS(chrome.extension.getURL('build/popup/index.js'));
}
