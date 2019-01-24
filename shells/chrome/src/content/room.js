const config = require('config');
const installNotification = require('./libs/installNotification');
const installPanel = require('./libs/installPanel');
const PluginProxy = require('./libs/pluginProxy');
const TsboxPlugin = require('./plugins/tsbox');
const BarragePlugin = require('./plugins/barrage');

function roomSetup (setting) {
  const tsboxPlugin = new TsboxPlugin(setting);
  tsboxPlugin.on('got', () => {
    window.postMessage({ source: 'treasure_got' }, '*');
  });
  tsboxPlugin.on('got_res', data => {
    window.postMessage({ source: 'treasure_got_res', data }, '*');
  });
  tsboxPlugin.on('miss', () => {
    if (setting.ghoulEnabled && setting.autoClose && tsboxPlugin.noTs) {
      window.close();
    }
  });
  const barragePlugin = new BarragePlugin(setting);
  const pluginProxy = new PluginProxy();
  pluginProxy.push(tsboxPlugin);
  pluginProxy.push(barragePlugin);
  pluginProxy.install();

  if (setting.ghoulMode === 'pro' && setting.ghoulEnabled && document.location.href.startsWith(config.roomUrl)) {
    window.postMessage({ source: 'pro_tab' }, '*');
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
    installPanel();
  }
}

(() => {
  let done = false;
  window.postMessage({ source: 'backend_installed' }, '*');
  window.addEventListener('message', (evt) => {
    if (evt.source === window && evt.data && evt.data.source === 'setting' && !done) {
      done = true;
      const setting = evt.data.data;
      if (setting.key === config.key) {
        // setting.minimalism ? hookWrapper.reject() : hookWrapper.resolve();
        roomSetup(setting);
      }
    }
  });
})();
