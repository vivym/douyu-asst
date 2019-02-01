const { EventEmitter } = require('events');
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

class GhoulProxy extends EventEmitter {
  constructor () {
    super();
    this.boxSet = new Set();
    this.fansMedalList = null;
    socketClient.subscribe('tsbox', this.onTsbox.bind(this));
    this.pendingBox = [];
    setInterval(() => {
      const now = parseInt(Date.now() / 1000, 10);
      while (this.pendingBox.length > 0) {
        const box = this.pendingBox[0];
        if (box.surplusTime + 3 < now) {
          this.pendingBox.shift();
          this.boxSet.delete(box.rpid);
        } else {
          break;
        }
      }
    }, 3 * 60 * 1000);
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
    boxes.forEach(box => {
      if (!this.boxSet.has(box.rpid)) {
        diffBoxes.push(box);
        this.boxSet.add(box.rpid);
      }
    });
    return diffBoxes;
  }

  onTsbox (boxes) {
    if (validate(boxes)) {
      const newBoxes = this.boxDiff(boxes);
      this.emit('tsboxes', newBoxes);
      newBoxes.forEach(box => this.pendingBox.push({
        roomId: box.rid,
        treasureType: box.rpt,
        treasureId: box.rpid,
        surplusTime: parseInt(new Date(box.ot).getTime() / 1000, 10),
        snk: box.snk,
      }));
      this.pendingBox.sort((a, b) => a.surplusTime - b.surplusTime);
    } else {
      console.log('invalid boxes:', boxes);
    }
  }

  fetch (options) {
    const { limit, count = 20 } = options;
    while (this.pendingBox.length > 0) {
      if (this.pendingBox[0].surplusTime < limit) {
        this.pendingBox.shift();
      } else {
        break;
      }
    }
    const { boxFilter } = localStorageProxy.entry().setting;
    return this.pendingBox.filter(box => {
      const treasureType = parseInt(box.treasureType, 10);
      if (boxFilter === 'all') {
        return true;
      } else if (boxFilter === '100') { // 飞机
        return [100, 104, 105].includes(treasureType);
      } else if (boxFilter === '101') { // 火箭
        return treasureType >= 101 && ![104, 105].includes(treasureType);
      } else if (boxFilter === '102') { // 超火
        return treasureType >= 103 && ![104, 105, 119].includes(treasureType);
      } else if (boxFilter === '103') { // 飞船
        return treasureType === 127;
      }
    }).slice(0, Math.min(this.pendingBox.length, count));
  }

  deleteBox (rpid) {
    for (let i = 0; i < this.pendingBox.length; ++i) {
      const box = this.pendingBox[i];
      if (box.treasureId === rpid) {
        this.pendingBox.splice(i, 1);
        return;
      }
    }
  }
};

module.exports = GhoulProxy;
