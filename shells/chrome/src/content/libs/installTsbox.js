const { injectRemoteJS, waitForDom } = require('../../utils');
const { roomUrl } = require('config');

async function installTsbox () {
  if (!document.location.href.startsWith(roomUrl)) {
    return;
  }

  const el = await waitForDom('.TreasureWrap');
  el.style.visibility = 'hidden';

  const wrapper = document.createElement('div');
  wrapper.id = 'dyasst-tsbox';
  const layout = document.getElementsByClassName('layout-Player-effect')[0];
  layout.insertBefore(wrapper, layout.firstElementChild);

  injectRemoteJS('chrome-extension://gbbpngofangjplfgakjffjfcphngbolm/tsbuild/content/views/tsbox.js');
}

module.exports = installTsbox;
