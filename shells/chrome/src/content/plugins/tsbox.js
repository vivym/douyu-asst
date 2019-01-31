const FastPriorityQueue = require('fastpriorityqueue');
const Plugin = require('./plugin');
const decode = require('../libs/decode');
const { sleep, waitForObj } = require('../../utils');
const { getDid, getUid } = require('../libs/utils');
const { Subject } = require('rxjs');

const isProduction = process && process.env && process.env.NODE_ENV === 'production';

class TsboxPlugin extends Plugin {
  constructor (setting) {
    super();
    this.name = 'tsbox';
    this.setting = setting;
    this.state = 'IDLE';
    this.pendingBox = new FastPriorityQueue((a, b) => a.surplusTime < b.surplusTime);
    this.noTs = true;
  }

  grant () {
    return true;
  }

  registerWebpackHooks (webpackHooker) {
    webpackHooker.replace('1c14c', ['a', 'prototype', 'drawTreasureRequest'], this.drawTreasureRequest);
  }

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
  }

  pushPendingBox (box) {
    this.pendingBox.add(box);
    window.dyasstTsboxSubject && window.dyasstTsboxSubject.next(box);
  }

  handleRemotePendingBoxes (boxes) {
    this.handlePendingBoxes(boxes, this.setting.ghoulMode === 'pro');
  }

  checkBoxType (box) {
    const { boxFilter } = this.setting;
    const treasureType = parseInt(box.treasureType, 10);
    if (boxFilter === 'all') {
      return true;
    } else if (boxFilter === '100') { // 飞机
      return treasureType === 100;
    } else if (boxFilter === '101') { // 火箭
      return treasureType >= 101;
    } else if (boxFilter === '102') { // 超火
      return treasureType >= 103;
    } else if (boxFilter === '103') { // 飞船
      return treasureType === 127;
    }
  }

  handlePendingBoxes (boxes, pick = true) {
    if (boxes && boxes instanceof Array) {
      boxes.forEach(box => this.pushPendingBox(box));
    } else if (boxes) {
      this.pushPendingBox(boxes);
    }

    if (!pick) {
      return;
    }

    if (!this.pendingBox.isEmpty() && this.state === 'IDLE') {
      const box = this.pendingBox.poll();
      if (!this.checkBoxType(box)) {
        return this.handlePendingBoxes();
      }
      this.noTs = false;
      this.state = 'WAITING';
      const { delayRange } = this.setting;
      const delay = Math.max(delayRange[1] - delayRange[0], 0) * Math.random() + delayRange[0];
      const surplusTime = Math.max(box.surplusTime * 1000 - Date.now() - (this.setting.timeDelta || 0) + delay + 5, 0);
      setTimeout(() => this.handleTimeupBox(box), surplusTime);
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
      if (this.checkBoxType(box)) {
        console.log('picking', box);
        this.state = 'PICKING';
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

  async setDocTitle () {
    if (!document.title_src) {
      document.title_src = document.title;
      document.title = '[新箱子验证] ' + document.title;
      while (true) {
        if (!document.hidden) {
          document.title = document.title_src;
          delete document.title_src;
          break;
        }
        await sleep(1000);
      }
    }
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

  isArray (s) {
    return /@\S\//g.test(String(s));
  }

  dataMap (boxes) {
    return boxes.map(box => ({
      roomId: window.socketProxy.info.room.roomId,
      treasureId: parseInt(box.rpid, 10),
      treasureType: parseInt(box.rpt, 10),
      senderName: box.snk,
      senderUid: +box.sid,
      surplusTime: parseInt(box.ot, 10),
      destroyTime: parseInt(box.dt, 10),
    }));
  }

  installSocketHook () {
    const { socketStream } = window.socketProxy;
    const { setting } = this;
    if (setting.ghoulEnabled) {
      socketStream.subscribe('tsboxb', box => {
        isProduction || console.log('tsboxb', box);
        this.handlePendingBoxes(this.dataMap([ box ]));
      });

      socketStream.subscribe('tslist', msg => {
        const list = msg.list || [];
        const boxes = [];
        (this.isArray(list) ? decode(list) : [list]).forEach(data => {
          data && boxes.push(decode(data));
        });
        isProduction || console.log(boxes);
        this.handlePendingBoxes(this.dataMap(boxes));
      });
    }
  }

  installHttpHook () {
    const httpClient = window.sdkf30fc3f26aeee28b73b0('0b1d3').default;
    httpClient.applyMiddleWare('post', /\/member\/task\/redPacketReceive/i, rsp => {
      if (rsp.geetest !== undefined) {
        this.state = 'GEE_TESTING';
        this.setDocTitle();
        this.emit('got');
        this.showGeeTestPanel();
      } else if (rsp.award_type !== undefined) {
        this.emit('got_res', rsp);
        this.state = 'IDLE';
        this.handlePendingBoxes();
      } else {
        this.state = 'IDLE';
        console.log('miss.');
        this.handlePendingBoxes();
      }
      return rsp;
    });
  }

  getDepObjs () {
    return ['socketProxy', 'sdkf30fc3f26aeee28b73b0'];
  }

  depObjReady (obj) {
    if (obj === 'socketProxy') {
      this.installSocketHook();
    } else if (obj === 'sdkf30fc3f26aeee28b73b0') {
      this.installHttpHook();
    }
  }

  sendAutoBarrage () {
    waitForObj(window, 'socketProxy').then(() => {
      const msg = {
        type: 'chatmessage',
        col: 0,
        content: '.',
        dy: getDid(),
        ifs: 0,
        nc: 0,
        rev: 0,
        sender: getUid(),
      };
      window.socketProxy.sendMessage(msg);
      console.log('send barrage', msg);
    });
  }

  install () {
    window.dyasstTsboxSubject = new Subject();
    if (this.setting.autoSendBarrageEnabled) {
      waitForObj(window, 'dyasstRid').then(() => {
        const entry = `dyasstAutoSend_${window.dyasstRid}`;
        if (window.localStorage[entry] === undefined) {
          window.localStorage[entry] = '0';
        }
        const now = new Date();
        const last = parseInt(window.localStorage[entry], 10);
        if (new Date(last).toDateString() !== now.toDateString() || now.getTime() - last > 3 * 60 * 60 * 1000) {
          setTimeout(() => {
            this.sendAutoBarrage();
            window.localStorage[entry] = Date.now();
          }, Math.random() * 3000 + 1000);
        }
      });
    }
  }
};

module.exports = TsboxPlugin;
