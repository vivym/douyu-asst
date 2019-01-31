const { EventEmitter } = require('events');

class Plugin extends EventEmitter {
  grant () { return true; }

  updateSetting (setting) { this.setting = setting; }

  getDepObjs () { return null; }

  depObjReady () {}

  registerWebpackHooks () {}

  install () {}
};

module.exports = Plugin;
