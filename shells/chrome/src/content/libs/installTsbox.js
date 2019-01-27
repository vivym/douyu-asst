const { injectRemoteJS, waitForDom } = require('../../utils');

async function installTsbox () {
  const el = await waitForDom('.TreasureWrap');
  el.style.visibility = 'hidden';

  const wrapper = document.createElement('div');
  wrapper.id = 'dyasst-tsbox';
  const layout = document.getElementsByClassName('layout-Player-effect')[0];
  layout.insertBefore(wrapper, layout.firstElementChild);

  injectRemoteJS('chrome-extension://gbbpngofangjplfgakjffjfcphngbolm/tsbuild/content/tsbox.js');
}

module.exports = installTsbox;
