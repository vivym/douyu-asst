const Plugin = require('./plugin');
const { injectRemoteJS, waitForDom } = require('../../utils');

class MenuPlugin extends Plugin {
  constructor (setting) {
    super();
    this.setting = setting;
  }

  grant () {
    return true;
  }

  install () {
    waitForDom('body').then(() => {
      const wrapper = document.createElement('div');
      wrapper.id = 'dyasst-menu';
      document.body.insertBefore(wrapper, document.body.firstElementChild);

      injectRemoteJS('chrome-extension://gbbpngofangjplfgakjffjfcphngbolm/tsbuild/content/views/menu.js');
    });
  }
};

module.exports = MenuPlugin;
