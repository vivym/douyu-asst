const config = require('config');
const installNotification = require('./libs/installNotification2');
const installPanel = require('./libs/installPanel');
const installTsbox = require('./libs/installTsbox');
const PluginProxy = require('./libs/pluginProxy');
const TsboxPlugin = require('./plugins/tsbox');
const BarragePlugin = require('./plugins/barrage');
const CapturePlugin = require('./plugins/capture');

function roomSetup (setting) {
  const tsboxPlugin = new TsboxPlugin(setting);
  tsboxPlugin.on('got', () => {
    console.log('got');
    window.postMessage({ source: 'treasure_got', target: 'bg' }, '*');
  });
  tsboxPlugin.on('got_res', data => {
    window.postMessage({ source: 'treasure_got_res', data, target: 'bg' }, '*');
  });
  tsboxPlugin.on('miss', () => {
    if (setting.ghoulEnabled && setting.autoClose && tsboxPlugin.noTs) {
      window.close();
    }
  });
  const barragePlugin = new BarragePlugin(setting);
  const capturePlugin = new CapturePlugin(setting);

  const pluginProxy = new PluginProxy();
  pluginProxy.push(tsboxPlugin);
  pluginProxy.push(barragePlugin);
  pluginProxy.push(capturePlugin);
  // pluginProxy.push(h5plugin);
  pluginProxy.install();

  if (setting.ghoulMode === 'pro' && setting.ghoulEnabled && document.location.href.startsWith(config.roomUrl)) {
    window.postMessage({ source: 'pro_tab', target: 'bg' }, '*');
  }

  window.addEventListener('message', (evt) => {
    if (evt.source === window && evt.data && evt.data.source === 'sync') {
      if (setting.ghoulMode === 'normal' && setting.autoClose && tsboxPlugin.noTs) {
        window.close();
      }
    } else if (evt.source === window && evt.data && evt.data.source === 'tsbox') {
      if (setting.ghoulMode === 'pro' && setting.ghoulEnabled) {
        tsboxPlugin.handlePendingBoxes(evt.data.data);
      }
    }
  });

  if (document.location.href.startsWith(config.roomUrl)) {
    installNotification();
  }
  installTsbox();
  installPanel();
}

const hookWrapper = {};
function hookOnloadNotify () {
  let originOnloadNotify = window.onload_notify;
  let accessCnt = 0;
  const hookPromise = new Promise((resolve, reject) => {
    hookWrapper.resolve = resolve;
    hookWrapper.reject = () => {
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

(() => {
  hookOnloadNotify();
  let done = false;
  window.postMessage({ source: 'backend_installed' }, '*');
  window.addEventListener('message', (evt) => {
    if (evt.source === window && evt.data && evt.data.source === 'setting' && !done) {
      done = true;
      const setting = evt.data.data;
      if (setting.key === config.key) {
        setting.minimalism ? hookWrapper.reject() : hookWrapper.resolve();
        roomSetup(setting);
      }
    }
  });
})();
