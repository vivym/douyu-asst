const { sleep } = require('../../utils');
const config = require('config');

async function installNotification () {
  if (!config.notification.enabled) {
    return;
  }
  while (true) {
    if (document.body) {
      break;
    }
    await sleep(333);
  }
  const wrapper = document.createElement('div');
  wrapper.style = 'position: fixed; top: 180px; right: 0; width: 103px; height: 245px; z-index: 2000;' +
                  'background-image: url(https://static.jiuwozb.com/assets/images/notification_bg.png);';
  wrapper.id = 'dyasst-notification';
  const qrcode = document.createElement('img');
  qrcode.src = 'https://static.jiuwozb.com/assets/images/notification_qrcode_ff.jpg';
  qrcode.style = 'position: absolute; left: 8.4px; top: 114.1px; width: 85.4px; height: 85.4px;';
  wrapper.insertBefore(qrcode, wrapper.firstElementChild);
  const btnClose = document.createElement('img');
  btnClose.src = 'https://static.jiuwozb.com/assets/images/icon_close2_16.png';
  btnClose.style = 'position: absolute; right: 0px; top: 1px; width: 16px; height: 16px;';
  btnClose.title = '关闭';
  btnClose.onclick = () => {
    const elem = document.getElementById('dyasst-notification');
    elem && elem.parentNode.removeChild(elem);
  };
  wrapper.insertBefore(btnClose, wrapper.firstElementChild);
  const btnOpen = document.createElement('img');
  btnOpen.src = 'https://static.jiuwozb.com/assets/images/notification_button_open.png';
  btnOpen.style = 'position: absolute; left: 17px; top: 86px; font-size: 8.4px; color: #d2d3d4;';
  btnOpen.title = '暂不支持关闭';
  wrapper.insertBefore(btnOpen, wrapper.firstElementChild);
  const label0 = document.createElement('span');
  label0.innerText = '已开启';
  label0.style = 'position: absolute; left: 56.4px; top: 86px; height: 16px; font-size: 8.4px; color: white; user-select: none;';
  label0.title = '暂不支持关闭';
  wrapper.insertBefore(label0, wrapper.firstElementChild);
  const label1 = document.createElement('span');
  label1.innerText = '微信扫码打开';
  label1.style = 'position: absolute; left: 14.8px; top: 204.4px; height: 16px; font-size: 11.2px; color: white; user-select: none;';
  wrapper.insertBefore(label1, wrapper.firstElementChild);
  const label2 = document.createElement('span');
  label2.innerHTML = `${config.notification.label2_0}<span style="color: #00FFDD">微信</span>提醒`;
  label2.style = 'position: absolute; left: 14.8px; top: 220px; height: 16px; font-size: 11.2px; color: #FFEE00; user-select: none;';
  wrapper.insertBefore(label2, wrapper.firstElementChild);
  document.body.insertBefore(wrapper, document.body.firstElementChild);
}

module.exports = installNotification;
