const { EventEmitter } = require('events');

class Plugin extends EventEmitter {
  grant () { return true; }

  getDepObjs () { return null; }

  depObjReady () {}

  registerWebpackHooks () {}

  install () {}
};

module.exports = Plugin;
