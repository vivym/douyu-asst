const Plugin = require('./plugin');
const { waitForDom } = require('../../utils');

class AdblockPlugin extends Plugin {
  constructor (setting) {
    super();
    this.setting = setting;
  }

  grant () {
    return this.setting.blockRoomAd;
  }

  install () {
    waitForDom('.Bottom-ad', 333).then(el => {
      el.style.display = 'none';
    });
    waitForDom('.SignBarrage', 333).then(el => {
      el.style.display = 'none';
    });
    waitForDom('div[class^=recommendAD]', 333).then(el => {
      el.style.display = 'none';
    });
  }
};

module.exports = AdblockPlugin;
