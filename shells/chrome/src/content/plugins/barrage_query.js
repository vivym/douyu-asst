const Plugin = require('./plugin');
const { injectRemoteJS, waitForDom } = require('../../utils');

class BarrageQueryPlugin extends Plugin {
  install () {
    waitForDom('body').then(() => {
      const wrapper = document.createElement('div');
      wrapper.id = 'dyasst-barrage';
      document.body.insertBefore(wrapper, document.body.firstElementChild);

      injectRemoteJS('chrome-extension://gbbpngofangjplfgakjffjfcphngbolm/tsbuild/content/views/barrage.js');
    });
  }
};

module.exports = BarrageQueryPlugin;
