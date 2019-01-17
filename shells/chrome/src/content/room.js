const WebpackHooker = require('./libs/webpackHooker');
const installNotification = require('./libs/installNotification');
const { sleep } = require('../utils');

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

  if (setting.ghoulMode === 'pro' && setting.ghoulEnabled && document.location.href.startsWith('https://www.douyu.com/554559')) {
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

  async function deletePlayer () {
    while (true) {
      try {
        const videoElem = document.getElementById('js-player-video');
        videoElem.parentNode.removeChild(videoElem);
        return;
      } catch (err) {
      }
      console.log('wait');
      await sleep(100);
    }
  }

  setting.ghoulEnabled && setting.blockLiveStream && deletePlayer();

  if (document.location.href.startsWith('https://www.douyu.com/554559')) {
    installNotification();
  }
}

let done = false;
window.postMessage({ source: 'backend_installed' }, '*');
window.addEventListener('message', (evt) => {
  if (evt.source === window && evt.data && evt.data.source === 'setting' && !done) {
    done = true;
    setup(evt.data.data);
  }
});
