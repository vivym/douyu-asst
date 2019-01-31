const { jsBundleUrl } = require('config');

async function sleep (timeout) {
  return new Promise(resolve => setTimeout(() => resolve(), timeout));
}

function injectRemoteJS (url) {
  const isProduction = process && process.env && process.env.NODE_ENV === 'production';
  if (isProduction) {
    url = url.startsWith('/tsbuild') ? url.slice(8) : url;
    url = jsBundleUrl + url;
  } else {
    url = url.startsWith('chrome-extension') ? url : chrome.extension.getURL(url);
  }

  const script = document.createElement('script');
  script.src = url;
  document.documentElement.appendChild(script);
  script.parentNode.removeChild(script);
}

function playAudio (src, vol) {
  if (vol > 0) {
    const audio = new Audio();
    audio.src = src;
    audio.volume = vol;
    audio.play();
  }
}

async function waitForObj (obj, key, interval = 200) {
  while (true) {
    if (obj[key]) {
      return;
    }
    await sleep(interval);
  }
}

async function waitForDom (selector, interval = 200) {
  while (true) {
    const el = document.querySelector(selector);
    if (el) {
      return el;
    }
    await sleep(interval);
  }
}

function getReactInstance (el) {
  for (let key of Object.keys(el)) {
    if (key.startsWith('__reactInternalInstance')) {
      return el[key].return;
    }
  }
}

module.exports = {
  sleep,
  injectRemoteJS,
  playAudio,
  waitForObj,
  waitForDom,
  getReactInstance,
};
