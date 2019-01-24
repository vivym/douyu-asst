const { EventEmitter } = require('events');
const webpackHelper = require('./webpackHelper');

class WebpackHooker extends EventEmitter {
  constructor ({ setting }) {
    super();
    this.setting = setting;
    this.muteService = null;
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

  async installPlayerAsideAppHook () {
    await this.waitForObj(window, 'PlayerAsideApp');
    let origPush = window.PlayerAsideApp.push;
    function hookedPush (e) {
      console.log('push', e);
      return origPush.call(this, e);
    }
    Object.defineProperty(window.PlayerAsideApp, 'push', {
      get: () => hookedPush,
      set: value => {
        origPush = value;
      },
    });
  }

  install () { // c8c37
    this.installPlayerAsideAppHook();
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
