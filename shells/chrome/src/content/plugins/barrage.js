const Plugin = require('./plugin');

class BarragePlugin extends Plugin {
  constructor (setting) {
    super();
    this.setting = setting;
  }

  getDepObjs () {
    return ['socketProxy'];
  }

  depObjReady (obj) {
    if (obj === 'socketProxy') {
      this.installSocketHook();
    }
  }

  barrageHandler (msg) {
    // console.log(msg);
  }

  installSocketHook () {
    const { socketStream } = window.socketProxy;
    const { setting } = this;

    const uenterThrottle = socketStream.MODULE.uenter.throttle;
    socketStream.MODULE.uenter.throttle = function (...argv) {
      return setting.blockEnterBarrage || uenterThrottle.call(this, ...argv);
    };

    const chatmsgThrottle = socketStream.MODULE.chatmsg.throttle;
    socketStream.MODULE.chatmsg.throttle = function (...argv) { // TODO: block draw barrage
      return chatmsgThrottle.call(this, ...argv);
    };
    socketStream.subscribe('chatmsg', this.barrageHandler.bind(this));
  }
};

module.exports = BarragePlugin;
