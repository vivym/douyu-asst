const { EventEmitter } = require('events');
const FastPriorityQueue = require('fastpriorityqueue');
const webpackHelper = require('./webpackHelper');
const { sleep } = require('../../utils');
const decode = require('./decode');

class WebpackHooker extends EventEmitter {
  constructor ({ setting }) {
    super();
    this.setting = setting;
    this.state = 'IDLE';
    this.pendingBox = new FastPriorityQueue((a, b) => a.surplusTime < b.surplusTime);
    this.pendingRoom = new FastPriorityQueue((a, b) => a.surplusTime < b.surplusTime);
    this.noTs = true;
    this.muteService = null;
    this.autoBarrageSent = false;
    this.sentRooms = new Map();
    this.openedRooms = new Set();
    this.openedRoomCnt = 0;
    this.currBoxId = 0;
  }

  handlePendingRoom (box) {
    if (box) {
      const surplusTime = Math.max(box.surplusTime * 1000 - Date.now() - (this.setting.timeDelta || 0), 0);
      if (surplusTime < 15 * 1000 || this.sentRooms.has(box.roomId)) {
        return;
      }
      this.sentRooms.set(box.roomId, box);
      this.pendingRoom.add(box);
    }

    if (!this.pendingRoom.isEmpty() && this.openedRoomCnt < 3) {
      ++this.openedRoomCnt;
      const box = this.pendingRoom.poll();
      this.openedRooms.add(box.roomId);
      console.log('ts_new_bg_tab', box.roomId);
      this.emit('ts_new_bg_tab', box.roomId);
    }
  }

  onBgTabClosed (roomId) {
    --this.openedRoomCnt;
    this.handlePendingRoom();
  }

  handlePendingBoxes (boxes) {
    if (boxes && boxes instanceof Array) {
      boxes.forEach(box => {
        this.setting.ghoulMode === 'pro' && this.handlePendingRoom(box);
        this.pendingBox.add(box);
      });
    } else if (boxes) {
      this.setting.ghoulMode === 'pro' && this.handlePendingRoom(boxes);
      this.pendingBox.add(boxes);
    }

    if (!this.pendingBox.isEmpty() && this.state === 'IDLE') {
      this.noTs = false;
      this.state = 'WAITING';
      this.autoSendBarrage();
      const { delayRange } = this.setting;
      const delay = Math.max(delayRange[1] - delayRange[0], 0) * Math.random() + delayRange[0];
      const box = this.pendingBox.poll();
      if (this.setting.ghoulMode === 'normal' || this.openedRooms.has(box.roomId)) {
        const limit = this.setting.rocketOnly ? 102 : 0;
        const surplusTime = box.treasureType >= limit ? Math.max(box.surplusTime * 1000 - Date.now() - (this.setting.timeDelta || 0) + delay + 5, 0) : 1;
        setTimeout(() => this.handleTimeupBox(box), surplusTime);
      } else {
        this.state = 'IDLE';
        setTimeout(() => this.handlePendingBoxes(), 1);
      }
    }

    if (this.pendingBox.isEmpty() && this.state === 'IDLE') {
      this.noTs = true;
    }
  }

  handleTimeupBox (box) {
    if (this.state === 'WAITING') {
      const time = parseInt((Date.now() + this.setting.timeDelta) / 1000, 10);
      if (this.setting.ghoulMode === 'pro' && box.surplusTime + 5 < time) {
        console.log('miss');
        this.state = 'IDLE';
        return this.handlePendingBoxes();
      }
      const limit = this.setting.rocketOnly ? 102 : 0;
      if (box.treasureType >= limit) {
        console.log('picking', box);
        this.state = 'PICKING';
        this.currBoxId = box.treasureId;
        window.PlayerAsideApp.container.registry.store.dispatch({
          type: 'DRAW_TREASURE',
          payload: { data: box, type: 'init' },
        });
      } else {
        console.log('pass');
        this.state = 'IDLE';
        this.handlePendingBoxes();
      }
    }
  }

  async autoSendBarrage () {
    if (!this.setting.autoSendBarrageEnabled || this.autoBarrageSent) {
      return;
    }
    this.autoBarrageSent = true;

    while (true) {
      if (window.socketProxy) {
        break;
      }
      await sleep(333);
    }

    const msg = {
      type: 'chatmessage',
      col: 0,
      content: ' ',
      dy: this.getDid(),
      ifs: 0,
      nc: 0,
      rev: 0,
      sender: this.getUid(),
    };
    window.socketProxy.sendMessage(msg);
    console.log('send', msg);
  }

  async showGeeTestPanel () { // dirty
    let state = 'INIT';
    while (true) {
      if (state === 'INIT') {
        const elems = document.getElementsByClassName('geetest_radar_tip');
        if (elems && elems.length > 0) {
          elems[0].onmouseenter && elems[0].onmouseenter();
          elems[0].click && elems[0].click();
          state = 'GEE';
        }
      } else if (state === 'GEE') {
        const elems = document.getElementsByClassName('geetest_popup_box');
        if (elems && elems.length > 0) {
          elems[0].style['width'] = '347px';
          state = 'WAIT';
        }
      } else if (state === 'WAIT') {
        const elems = document.getElementsByClassName('geetest_popup_box');
        if (!elems || elems.length <= 0) {
          break;
        }
      }
      await sleep(200);
    }
  }

  handleBarrages (t, n) {
    try {
      if (this.setting.blockEnterBarrage) {
        t = t.filter(msg => msg.barrageName !== 'userEnter-barrage');
      }
      t.forEach(msg => {
        const { senderId, senderNick, userLevel, hasCard, fansMedal, barrageContent, uniqueIdentifier } = msg;
        if (barrageContent) {
          this.emit('barrage', {
            senderId,
            senderNick,
            userLevel,
            hasCard,
            fansMedal,
            barrageContent,
            uniqueIdentifier,
          });
        }
      });
    } catch (e) {
      console.log('err:', e);
    }
    return t;
  }

  dyLogin () {
    try {
      this.emit('dy_login', { dyUid: window.socketProxy.info.user.userName });
    } catch (err) {
      // do nothing
    }
  }

  getUid () {
    if (!this.uid) {
      for (let kv of document.cookie.split(';')) {
        if (kv.indexOf('acf_uid') >= 0) {
          this.uid = kv.split('=')[1];
          break;
        }
      }
    }

    return this.uid;
  }

  getDid () {
    if (!this.did) {
      for (let kv of document.cookie.split(';')) {
        if (kv.indexOf('acf_did') >= 0) {
          this.did = kv.split('=')[1];
          break;
        }
      }
    }

    return this.did;
  }

  async waitForObj (obj, key, interval = 100) {
    while (true) {
      if (obj[key]) {
        return;
      }
      await sleep(interval);
    }
  }

  isArray (s) {
    return /@\S\//g.test(String(s));
  }

  getRoomId () {
    return window.socketProxy.info.room.roomId;
  }

  dataMap (boxes) {
    return boxes.map(box => ({
      roomId: this.getRoomId(),
      treasureId: parseInt(box.rpid, 10),
      treasureType: parseInt(box.rpid, 10),
      senderName: box.snk,
      senderUid: +box.sid,
      surplusTime: parseInt(box.ot, 10),
      destroyTime: parseInt(box.dt, 10),
    }));
  }

  async installSocketHook () {
    await this.waitForObj(window, 'socketProxy');
    const { socketStream } = window.socketProxy;
    socketStream.subscribe('tsbox', boxes => {
      console.log('tsbox', boxes);
      // this.setting.ghoulEnabled && this.handlePendingBoxes(boxes);
    });

    socketStream.subscribe('tslist', msg => {
      const list = msg.list || [];
      const boxes = [];
      (this.isArray(list) ? decode(list) : [list]).forEach(data => {
        data && boxes.push(decode(data));
      });
      this.handlePendingBoxes(this.dataMap(boxes));
    });
  }

  async installHttpHook () {
    await this.waitForObj(window, 'sdkf30fc3f26aeee28b73b0');
    const httpClient = window.sdkf30fc3f26aeee28b73b0('0b1d3').default;
    httpClient.applyMiddleWare('post', /\/member\/task\/redPacketReceive/i, rsp => {
      if (this.state === 'PICKING') {
        if (rsp.geetest) {
          this.state = 'GEE_TESTING';
          this.emit('got');
          this.showGeeTestPanel();
        } else {
          this.state = 'IDLE';
          console.log('miss.');
          this.handlePendingBoxes();
        }
      } else if (this.state === 'GEE_TESTING') {
        if (parseInt(rsp.code, 10) === 0) {
          this.emit('got_res', rsp);
        }
        this.state = 'IDLE';
        this.handlePendingBoxes();
      }
      return rsp;
    });
  }

  install () { // c8c37
    this.setting.ghoulEnabled && this.installSocketHook();
    this.installHttpHook();
    webpackHelper.hook([
      {
        name: '1c14c',
        path: ['a', 'prototype', ['drawTreasureRequest']],
        hooks: {
          drawTreasureRequest (modules, fn, t) {
            const payload = t.payload || {};
            const { type, data } = payload;
            const douyuDid = this.global.get('douyuDid');
            let info = {};
            if (type === 'init') {
              this.config.treasureId = data.treasureId;
              this.config.ownRid = data.roomId;
              info = {
                room_id: data.roomId,
                package_room_id: data.roomId,
                device_id: douyuDid,
                packerid: data.treasureId || 0,
                version: 1,
              };
              this.config.isGeeChecking = true;
            } else {
              info = Object.assign({}, {
                room_id: this.config.ownRid || 0,
                package_room_id: this.config.ownRid || 0,
                device_id: douyuDid,
                packerid: this.config.treasureId || 0,
                version: 1,
              }, data);
              this.config.isGeeChecking = false;
            }
            const httpClient = window.sdkf30fc3f26aeee28b73b0('0b1d3').default;
            return httpClient.post(String, '/member/task/redPacketReceive', info, {
              headers: { 'content-type': 'application/x-www-form-urlencoded' },
            });
          },
        },
      },
    ]);
  }
}

module.exports = WebpackHooker;
