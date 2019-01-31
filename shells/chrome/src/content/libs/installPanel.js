const { sleep, injectRemoteJS } = require('../../utils');

async function installPanel () {
  while (true) {
    if (document.body) {
      break;
    }
    await sleep(333);
  }
  const wrapper = document.createElement('div');
  wrapper.id = 'dyasst';
  document.body.insertBefore(wrapper, document.body.firstElementChild);

  injectRemoteJS('chrome-extension://gbbpngofangjplfgakjffjfcphngbolm/tsbuild/content/views/panel.js');
}

module.exports = installPanel;
