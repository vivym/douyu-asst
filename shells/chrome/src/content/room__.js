const WebpackHooker = require('./libs/webpackHooker');
const installNotification = require('./libs/installNotification');
const installPanel = require('./libs/installPanel');
const { sleep } = require('../utils');
const config = require('config');

async function setDocTitle () {
  if (!document.title_src) {
    document.title_src = document.title;
    document.title = '[新箱子验证] ' + document.title;
    while (true) {
      if (!document.hidden) {
        document.title = document.title_src;
        delete document.title_src;
        break;
      }
      await sleep(1000);
    }
  }
}

function setup (setting) {
  console.log('setup room backend');
  async function deletePlayer () {
    while (true) {
      try {
        // const videoElem = document.getElementById('js-player-video');
        const videoElem = document.getElementsByTagName('video')[0];
        videoElem.src = '';
        videoElem.autoplay = false;
        videoElem.pause();
        videoElem.parentNode.parentNode.removeChild(videoElem.parentNode);
        return;
      } catch (err) {
      }
      console.log('wait');
      await sleep(1000);
    }
  }

  setting.blockLiveStream && deletePlayer();

  if (document.location.href.startsWith(config.roomUrl)) {
    installNotification();
    installPanel();
  }

  const webpackHooker = new WebpackHooker({ setting });
  webpackHooker.install();
  webpackHooker.on('got', () => {
    setDocTitle();
    window.postMessage({ source: 'treasure_got' }, '*');
  });
  webpackHooker.on('got_res', data => {
    window.postMessage({ source: 'treasure_got_res', data }, '*');
  });
  webpackHooker.on('miss', () => {
    if (setting.ghoulEnabled && setting.autoClose && webpackHooker.noTs) {
      window.close();
    }
  });
  webpackHooker.on('dy_login', data => {
    window.postMessage({ source: 'dy_login', data }, '*');
  });

  if (setting.ghoulMode === 'pro' && setting.ghoulEnabled && document.location.href.startsWith(config.roomUrl)) {
    window.postMessage({ source: 'pro_tab' }, '*');
  }

  window.addEventListener('message', (evt) => {
    if (evt.source === window && evt.data && evt.data.source === 'sync') {
      if (setting.ghoulMode === 'normal' && setting.autoClose && webpackHooker.noTs) {
        window.close();
      }
    } else if (evt.source === window && evt.data && evt.data.source === 'tsbox') {
      if (setting.ghoulMode === 'pro' && setting.ghoulEnabled) {
        webpackHooker.handlePendingBoxes(evt.data.data);
      }
    }
  });

  async function getFansMedalList () {
    while (true) {
      try {
        if (window.PlayerAsideApp && window.PlayerAsideApp.container.registry.store.getState().medalListMsgData) {
          const { medalListMsgData } = window.PlayerAsideApp.container.registry.store.getState();
          if (medalListMsgData.medalList && medalListMsgData.medalList.length > 0) {
            window.postMessage({ source: 'fans_medal_list', data: medalListMsgData.medalList }, '*');
            break;
          }
        }
      } catch (err) {
        // do nothing
      }
      await sleep(1000);
    }
  }

  getFansMedalList();
}

const hookWrapper = {};
function hookOnloadNotify () {
  let originOnloadNotify = window.onload_notify;
  let accessCnt = 0;
  const hookPromise = new Promise((resolve, reject) => {
    hookWrapper.resolve = resolve;
    hookWrapper.reject = () => {
      /*
      Object.entries(window.SHARK_LOADER_CONFIG).forEach(([key, value]) => {
        if (key === 'P5') {
          if (value.length === 1 && value[0].name === 'common') {
            window.loader.loadFile(value[0].url[0]);
          }
        } else if (key === 'T0') {
          if (value.length === 1 && value[0].name === 'login') {
            window.loader.loadFile(value[0].url[0]);
          }
        } else if (key === 'T2') {
          if (value.length === 1 && value[0].name === 'room') {
            window.loader.loadFile(value[0].url[0]);
          }
        } else if (key === 'T3') {
          value.forEach(entry => {
            window.loader.loadFile(entry.url[0]);
          });
        } else if (key === 'T4') {
          value.forEach(entry => {
            window.loader.loadFile(entry.url[0]);
          });
        }
      });
      */
      reject(new Error('minimalism'));
    };
  });

  Object.defineProperty(window, 'onload_notify', {
    get: () => {
      if (++accessCnt > 1) {
        return originOnloadNotify;
      } else {
        return hookPromise;
      }
    },
    set: value => {
      originOnloadNotify = value;
    },
  });
}

hookOnloadNotify();

let roomDone = false;
window.postMessage({ source: 'backend_installed' }, '*');
window.addEventListener('message', (evt) => {
  if (evt.source === window && evt.data && evt.data.source === 'setting' && !roomDone) {
    roomDone = true;
    const setting = evt.data.data;
    if (setting.key === config.key) {
      setting.minimalism ? hookWrapper.reject() : hookWrapper.resolve();
      setup(setting);
    }
  }
});
