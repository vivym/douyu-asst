const Plugin = require('./plugin');

class DrawPlugin extends Plugin {
  constructor (setting) {
    super();
    this.setting = setting;
  }

  grant () {
    return true;
  }

  getDepObjs () {
    return ['socketProxy'];
  }

  depObjReady (obj) {
    if (obj === 'socketProxy') {
      this.installSocketHook();
    }
  }

  installSocketHook () {
    const { socketStream } = window.socketProxy;
    socketStream.subscribe('lds', msg => {
      if (msg.join_condition) {
        try {
          const cond = JSON.parse(msg.join_condition);
          const commandContent = cond.command_content;
          const lotteryRange = parseInt(cond.lottery_range, 10) || 0;
          console.log(commandContent, lotteryRange);
        } catch (err) {
          return console.error(err);
        }
      }
      console.log(msg);
    });
  }
};

module.exports = DrawPlugin;
