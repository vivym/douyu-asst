const socketClient = require('./socketClient');
const Ajv = require('ajv');
const config = require('config');
const localStorageProxy = require('./localStorageProxy');

const ajv = new Ajv();
const validate = ajv.compile({
  type: 'array',
  items: {
    type: 'object',
    required: ['rpid', 'rpt', 'rid', 'ot'],
  },
});

class GhoulProxy {
  constructor () {
    this.tab = null;
    this.port = null;
    this.lastBoxes = new Set();
    this.fansMedalList = null;
    socketClient.register('tsbox', this.onTsbox.bind(this));
  }

  checkPermission () {
    if (1 || (process && process.env && process.env.NODE_ENV === 'production')) {
      const { setting } = localStorageProxy.entry();
      return this.fansMedalList.filter(fansMedal => {
        if (fansMedal.medalRid === config.roomId && fansMedal.medalLev >= setting.gfksax) {
          return true;
        }
      }).length > 0;
    } else {
      return true;
    }
  }

  setFansMedalList (data) {
    this.fansMedalList = data;
  }

  boxDiff (boxes) {
    const diffBoxes = [];
    const newSet = new Set();
    boxes.forEach(box => {
      newSet.add(box.rpid);
      if (!this.lastBoxes.has(box.rpid)) {
        diffBoxes.push(box);
      }
    });
    this.lastBoxes.clear();
    this.lastBoxes = newSet;
    return diffBoxes;
  }

  onTsbox (boxes) {
    console.log(boxes);
    const { port } = this;
    if (validate(boxes)) {
      port && !port.isDisconnected && port.postMessage({
        type: 'tsbox',
        data: this.boxDiff(boxes).map(box => {
          return {
            roomId: box.rid,
            treasureType: box.rpt,
            treasureId: box.rpid,
            surplusTime: parseInt(new Date(box.ot).getTime() / 1000, 10),
          };
        }) });
    } else {
      console.log('invalid boxes:', boxes);
    }
  }

  reset () {
    this.tab = null;
    this.port = null;
    socketClient.destroy();
  }

  onPortDisconnected (port) {
    port.isDisconnected = true;
    this.fansMedalList = null;
    this.lastBoxes = new Set();
    this.reset();
  }

  setTab (tab, port) {
    if (this.tab && tab.id !== this.tab.id) {
      this.reset();
    }
    port.onDisconnect.addListener(() => this.onPortDisconnected(port));
    this.tab = tab;
    this.port = port;
  }
};

module.exports = GhoulProxy;
