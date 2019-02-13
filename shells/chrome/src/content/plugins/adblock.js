const Plugin = require('./plugin');
const { waitForDom, waitForObj } = require('../../utils');

class AdblockPlugin extends Plugin {
  constructor (setting) {
    super();
    this.setting = setting;
  }

  install () {
    if (this.setting.blockRoomAd) {
      waitForDom('.Bottom-ad', 333).then(el => {
        el.style.display = 'none';
      });
      waitForDom('.SignBarrage', 333).then(el => {
        el.style.display = 'none';
      });
      waitForDom('.Title-ad', 333).then(el => {
        el.style.display = 'none';
      });
      waitForDom('div[class^=recommendAD]', 333).then(el => {
        el.style.display = 'none';
      });
    }
    if (this.setting.blockLiveStream) {
      waitForObj(window, 'H5PlayerVideoLib').then(() => {
        waitForObj(window.H5PlayerVideoLib, 'getVideo').then(() => {
          const video = window.H5PlayerVideoLib.getVideo();
          try {
            if (video) {
              video.destroy();
              console.log('video blocked');
            } else {
              console.log('off');
            }
          } catch (err) {
            console.log(err);
          }
        });
      });
    }
  }
};

module.exports = AdblockPlugin;
