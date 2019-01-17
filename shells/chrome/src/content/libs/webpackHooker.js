const { EventEmitter } = require('events');
const FastPriorityQueue = require('fastpriorityqueue');
const webpackHelper = require('./webpackHelper');
const { sleep } = require('../../utils');

class WebpackHooker extends EventEmitter {
  constructor ({ setting }) {
    super();
    this.setting = setting;
    this.state = 'IDLE';
    this.pendingBox = new FastPriorityQueue((a, b) => a.surplusTime < b.surplusTime);
    this.noTs = true;
    this.muteService = null;
    this.autoBarrageSent = false;
  }

  handlePendingBoxes (boxes) {
    if (boxes && boxes instanceof Array) {
      boxes.forEach(box => this.pendingBox.add(box));
    } else if (boxes) {
      this.pendingBox.add(boxes);
    }

    if (!this.pendingBox.isEmpty() && this.state === 'IDLE') {
      this.noTs = false;
      this.state = 'WAITING';
      this.autoSendBarrage();
      const { delayRange } = this.setting;
      const delay = Math.max(delayRange[1] - delayRange[0], 0) * Math.random() + delayRange[0];
      const box = this.pendingBox.poll();
      const limit = this.setting.rocketOnly ? 102 : 0;
      const surplusTime = box.treasureType >= limit ? Math.max(box.surplusTime * 1000 - Date.now() - (this.setting.timeDelta || 0) + delay + 5, 0) : 1;
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
        this.handlePendingBoxes();
        return;
      }
      const limit = this.setting.rocketOnly ? 102 : 0;
      if (box.treasureType >= limit) {
        console.log('picking', box);
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

  async hookStore () {
    const self = this;
    while (true) {
      try {
        const { store } = window.PlayerAsideApp.container.registry;
        let curValue = null;
        store.subscribe(() => {
          const prevValue = curValue;
          curValue = store.getState().treasureDrawResult;
          if (curValue !== prevValue) {
            if (curValue.data && curValue.data.geetest && curValue.data.geetest.validate_str) {
              self.emit('got');
              const { autoOpenBox } = self.setting;
              autoOpenBox && self.showGeeTestPanel();
              self.state = 'GEE_SHOW';
            }
          }
        });
        console.log('store hooked');
        return;
      } catch (err) {
      }
      await sleep(100);
    }
  }

  install () { // c8c37
    this.hookStore();
    const self = this;
    webpackHelper.hook([
      {
        name: '1c14c',
        path: ['a', 'prototype', ['mapping', 'dataMap', 'showDrawTips', 'drawTreasure', 'drawTreasureRequest']],
        hooks: {
          mapping (modules, fn, t, n) {
            self.dyLogin();
            const box = fn.call(this, t, n);
            if (self.setting.ghoulEnabled) {
              box.destroyTime -= box.delayTime;
              box.surplusTime -= box.delayTime;
              box.delayTime = 1;
            }
            // console.log('box:', box); // box.treasureType 100 airplane 102 rocket 103 super rocket
            return box;
          },
          dataMap (modules, fn, t, n) { // RCV
            const boxes = fn.call(this, t, n);
            self.setting.ghoulEnabled && self.handlePendingBoxes(boxes);
            return boxes;
          },
          showDrawTips (modules, fn, t) {
            if (self.state === 'WAITING' && parseInt(t.code, 10) !== 0) { // miss
              self.state = 'IDLE';
              self.handlePendingBoxes();
              self.emit('miss');
            } else if (self.state === 'GEE_SHOW' && parseInt(t.code, 10) !== 0) { // geetest error
              self.state = 'IDLE';
              self.handlePendingBoxes();
            } else if (parseInt(t.code, 10) === 0) { // got_res
              self.state = 'IDLE';
              self.handlePendingBoxes();
              self.emit('got_res', t);
            } else if (parseInt(t.code, 10) === -1) { // failed
              self.state = 'IDLE';
              self.handlePendingBoxes();
            } else {
              self.handlePendingBoxes();
              console.log('missing case', t);
            }
            return fn.call(this, t);
          },
          drawTreasure (modules, fn, t, n) {
            if (self.state === 'GEE_SHOW' && n === 'check') { // geetest checking request
              self.state = 'GEE_CHECKING';
            }
            return fn.call(this, t, n);
          },
          drawTreasureRequest (modules, fn, t) {
            const payload = t.payload || {};
            const { type, data } = payload;
            const douyuDid = this.global.get('douyuDid');
            // const roomId = this.global.get('$ROOM.room_id');
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
      {
        name: 'b33f',
        path: ['a', 'prototype', ['render']],
        hooks: {
          render (fn) {
            if (self.setting.blockEnterEffect) {
              this.state.isRender = false;
            }
            return fn.call(this);
          },
        },
      },
      {
        name: '9ce9',
        path: ['a', 'prototype', ['init']],
        hooks: {
          init (fn, t) {
            try {
              const elem = document.getElementsByClassName('AnchorLevelTip-tipBarNum')[0];
              elem.appendChild(document.createTextNode(', '));
              elem.appendChild(document.createTextNode(t.$ROOM.levelInfo.experience));
            } catch (e) {
              console.log('err:', e);
            }
            return fn.call(this, t);
          },
        },
      },
      {
        name: '597a',
        path: ['a', 'WrappedComponent', 'prototype', ['render']],
        hooks: {
          render (fn) {
            try {
              if (this.props.ownerFansRank > 0) {
                this.props.ownerFansRank = -this.props.ownerFansRank;
              }
            } catch (e) {
              console.log('err:', e);
            }
            return fn.call(this);
          },
        },
      },
      {
        name: 'fd73',
        path: ['a', 'WrappedComponent', 'prototype', ['render']],
        hooks: {
          render (fn) {
            try {
              // console.log('here', this);
            } catch (e) {
              console.log('err:', e);
            }
            return fn.call(this);
          },
        },
      },
      {
        name: '7914',
        path: ['a', 'create'],
        hooks: {
          create (fn, t) {
            const obj = fn.call(this, t);
            const oldPush = obj.push;
            obj.push = (t, r) => {
              t = self.handleBarrages(t, r);
              oldPush.call(obj, t, r);
            };
            return obj;
          },
        },
      },
    ]);
  }
}

module.exports = WebpackHooker;
