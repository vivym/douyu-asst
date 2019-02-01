const Plugin = require('./plugin');
const axios = require('axios');
const { waitForDom } = require('../../utils');

class RoomInfoPlugin extends Plugin {
  constructor (setting) {
    super();
    this.setting = setting;
    this.roomId = '';
    this.roomInfo = null;
  }

  setRoomId (rid) {
    this.roomId = rid;
    window.dyasstRid = rid;
  }

  async fetchRoomInfo () {
    try {
      const res = await axios.get(`https://www.douyu.com/betard/${this.roomId}`);
      if (res.status === 200) {
        if (typeof res.data === 'object') {
          this.roomInfo = res.data;
          this.roomInfoHandler(res.data);
        } else {
          console.log('cannot fetch room info');
        }
      } else {
        console.error(res);
      }
    } catch (err) {
      console.error(err);
    }
  }

  roomInfoHandler (room) {
    waitForDom('.AnchorLevelTip-tipBarNum').then(el => {
      let del = false;
      el.childNodes.forEach(node => {
        if (node.data === ' / ') {
          del = true;
        }
        if (del) {
          el.removeChild(node);
        }
      });
      el.appendChild(document.createTextNode(' / '));
      el.appendChild(document.createTextNode(room.room.levelInfo.experience));
    });
  }

  install () {
    const match = /www.douyu.com\/([0-9]+)/.exec(document.location.href);
    if (match && match.length === 2) {
      this.setRoomId(match[1]);
      this.fetchRoomInfo();
    } else {
      // TODO:
    }
  }
};

module.exports = RoomInfoPlugin;
