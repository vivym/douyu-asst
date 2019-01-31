const WebpackHooker = require('./webpackHooker');
const { sleep } = require('../../utils');

class PluginProxy {
  constructor () {
    this.webpackHooker = new WebpackHooker();
    this.plugins = [];
    this.objPromises = new Map();
  }

  async waitForObj (obj, key, interval = 200) {
    while (true) {
      if (obj[key]) {
        return;
      }
      await sleep(interval);
    }
  }

  push (plugin) {
    plugin.grant() && this.plugins.push(plugin);
  }

  updateSetting (setting) {
    this.plugins.forEach(plugin => plugin.updateSetting(setting));
  }

  install () {
    this.plugins.forEach(plugin => {
      plugin.registerWebpackHooks(this.webpackHooker);
      const objs = plugin.getDepObjs();
      if (objs && objs.length > 0) {
        objs.forEach(obj => {
          if (!this.objPromises.has(obj)) {
            this.objPromises.set(obj, this.waitForObj(window, obj));
          }
          this.objPromises.get(obj).then(() => plugin.depObjReady(obj));
        });
      }
    });
    this.webpackHooker.install();
    this.plugins.forEach(plugin => plugin.install());
  }
};

module.exports = PluginProxy;
