const { sleep, injectRemoteJS } = require('../../utils');

async function installNotification () {
  while (true) {
    if (document.body) {
      break;
    }
    await sleep(333);
  }
  const wrapper = document.createElement('div');
  wrapper.id = 'dyasst-notification';
  document.body.insertBefore(wrapper, document.body.firstElementChild);

  injectRemoteJS('chrome-extension://gbbpngofangjplfgakjffjfcphngbolm/tsbuild/content/notification.js');
}

module.exports = installNotification;
