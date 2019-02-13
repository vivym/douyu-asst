const Plugin = require('./plugin');
const { getUid } = require('../libs/utils');

class BarragePlugin extends Plugin {
  constructor (setting) {
    super();
    this.setting = setting;
    this.uid = null;
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
    const self = this;

    const uenterThrottle = socketStream.MODULE.uenter.throttle;
    socketStream.MODULE.uenter.throttle = function (...argv) {
      return self.setting.blockEnterBarrage || uenterThrottle.call(this, ...argv);
    };

    const chatmsgThrottle = socketStream.MODULE.chatmsg.throttle;
    socketStream.MODULE.chatmsg.throttle = function (msg, ...argv) { // TODO: block draw barrage
      if (!self.uid) {
        self.uid = getUid();
      }
      try {
        if ((msg.uid === self.uid || msg.uid === window.socketProxy.info.user.userName) && self.setting.nobleBarrageExp !== 'off') {
          msg.nc = '1';
          msg.nl = self.setting.nobleBarrageExp;
        }
      } catch (err) {
        // do nothing
      }
      return chatmsgThrottle.call(this, msg, ...argv);
    };
    socketStream.subscribe('chatmsg', this.barrageHandler.bind(this));
  }
};

module.exports = BarragePlugin;
