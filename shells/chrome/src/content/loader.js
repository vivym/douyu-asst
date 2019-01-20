const utils = require('../utils');
const { jsBundleUrl } = require('config');

window.addEventListener('message', (evt) => {
  if (evt.source === window && evt.data && evt.data.source === 'backend_installed') {
    setup();
  }
});

let done = false;
function setup () {
  if (done) {
    return;
  }
  done = true;
  const port = chrome.runtime.connect({ name: 'content' });
  port.onMessage.addListener(msg => {
    const { type, data } = msg;
    window.postMessage({ source: type, data }, '*');
  });

  window.addEventListener('message', (evt) => {
    if (evt.source === window && evt.data && evt.data.source === 'treasure_got') {
      console.log('got');
      port && port.postMessage({ type: 'got' });
    } else if (evt.source === window && evt.data && evt.data.source === 'treasure_got_res') {
      console.log('got_res');
      port && port.postMessage({ type: 'got_res', data: evt.data.data });
    } else if (evt.source === window && evt.data && evt.data.source === 'geetest_data') {
      console.log('geetest_data');
      port && port.postMessage({ type: 'geetest_data', data: evt.data.data });
    } else if (evt.source === window && evt.data && evt.data.source === 'dy_login') {
      port && port.postMessage({ type: 'dy_login', data: evt.data.data });
    } else if (evt.source === window && evt.data && evt.data.source === 'pro_tab') {
      port && port.postMessage({ type: 'pro_tab' });
    } else if (evt.source === window && evt.data && evt.data.source === 'fans_medal_list') {
      port && port.postMessage({ type: 'fans_medal_list', data: evt.data.data });
    } else if (evt.source === window && evt.data && evt.data.target === 'bg') {
      port && port.postMessage({ type: evt.data.source, data: evt.data.data });
    }
  });
}

const isProduction = process && process.env && process.env.NODE_ENV === 'production';

if (document.location.href.startsWith('https://www.douyu.com/')) { // room
  if (isProduction) {
    utils.injectRemoteJS(`${jsBundleUrl}/content/room.js`);
  } else {
    utils.injectRemoteJS(chrome.extension.getURL('build/content/room.js'));
  }
} else if (document.location.href.startsWith('https://yuba.douyu.com')) {
  if (isProduction) {
    utils.injectRemoteJS(`${jsBundleUrl}/content/yuba.js`);
  } else {
    utils.injectRemoteJS(chrome.extension.getURL('build/content/yuba.js'));
  }
}

if (isProduction) {
  utils.injectRemoteJS(`${jsBundleUrl}/content/extra.js`);
} else {
  utils.injectRemoteJS(chrome.extension.getURL('build/content/extra.js'));
}
