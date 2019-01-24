const { jsBundleUrl } = require('config');
const { sleep, injectRemoteJS } = require('../../utils');

async function installNotification () {
  while (true) {
    if (document.body) {
      break;
    }
    await sleep(333);
  }
  const wrapper = document.createElement('div');
  wrapper.id = 'dyasst';
  document.body.insertBefore(wrapper, document.body.firstElementChild);

  const isProduction = process && process.env && process.env.NODE_ENV === 'production';
  if (isProduction) {
    injectRemoteJS(`${jsBundleUrl}/content/panel.js`);
  } else {
    injectRemoteJS('chrome-extension://eajmgcnchobhijahnenegepoonmmfmlp/build/content/panel.js');
  }
}

module.exports = installNotification;
