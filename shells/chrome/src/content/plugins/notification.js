const Plugin = require('./plugin');
const { injectRemoteJS, waitForDom } = require('../../utils');
const { roomUrl } = require('config');

class NotificationPlugin extends Plugin {
  constructor (setting) {
    super();
    this.setting = setting;
  }

  grant () {
    return document.location.href.startsWith(roomUrl) && this.setting.notificationShow;
  }

  install () {
    window.dyasstPcNotificationEnabled = this.setting.pcNotificationEnabled;
    waitForDom('body').then(() => {
      const wrapper = document.createElement('div');
      wrapper.id = 'dyasst-notification';
      document.body.insertBefore(wrapper, document.body.firstElementChild);

      injectRemoteJS('chrome-extension://gbbpngofangjplfgakjffjfcphngbolm/tsbuild/content/views/notification.js');
    });
  }
};

module.exports = NotificationPlugin;
