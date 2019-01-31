const { injectRemoteJS } = require('../utils');
const installReactGlobalHook = require('./libs/installReactGlobalHook');

(() => {
  window.addEventListener('message', evt => {
    if (evt.source === window && evt.data && evt.data.source === 'react-detected') {
      injectRemoteJS('/tsbuild/content/globalHook.js');
    }
  });
  const script = document.createElement('script');
  script.textContent = `;(${installReactGlobalHook.toString()}())`;
  document.documentElement.appendChild(script);
  script.parentNode.removeChild(script);

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

    window.addEventListener('message', evt => {
      if (evt.source === window && evt.data && evt.data.target === 'bg') {
        port && port.postMessage({ type: evt.data.source, data: evt.data.data });
      }
    });
  }

  injectRemoteJS('/tsbuild/content/vender.js');

  if (document.location.href.startsWith('https://www.douyu.com/')) { // room
    injectRemoteJS('/tsbuild/content/room.js');
  } else if (document.location.href.startsWith('https://yuba.douyu.com')) { // yuba
    injectRemoteJS('/tsbuild/content/yuba.js');
  }

  injectRemoteJS('/tsbuild/content/extra.js');
})();
