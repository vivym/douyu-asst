const httpClient = require('./libs/httpClient');
const localStorageProxy = require('./libs/localStorageProxy');
const GhoulProxy = require('./libs/ghoulProxy');
const { playAudio } = require('../utils');
const config = require('config');

class BackgroundProxy {
  constructor () {
    this.ghoulProxy = new GhoulProxy();
  }

  setup () {
    chrome.runtime.onConnect.addListener(port => {
      if (port.name === 'content') {
        this.onContentConnected(port);
      }
    });
  }

  onContentConnected (port) {
    const { setting } = localStorageProxy.entry();
    if (setting) {
      new Promise(resolve => {
        if (setting.netTimeSync) {
          httpClient.standardTime().then(time => {
            resolve(time - Date.now() + 20);
          }).catch(err => resolve(err));
        } else {
          resolve(0);
        }
      }).then(timeDelta => {
        if (setting.netTimeSync && timeDelta > 0) {
          setting.timeDelta = timeDelta;
        } else {
          setting.timeDelta = 0;
        }
        setting.key = config.key;
        port && !port.isDisconnected && port.postMessage({ type: 'setting', data: setting });
      });
    }

    port.onMessage.addListener(this.contentMessageHandler.bind(this, port));
  }

  contentMessageHandler (port, msg) {
    const funcMap = {
      got: msg => this.onTreasureGot(msg, port),
      got_res: msg => this.onTreasureGot(msg, port),
      geetest_data: msg => this.geetestAgent.update(msg.data, port),
      dy_login: msg => httpClient.dyLogin(msg.data, port),
      pro_tab: msg => this.onProTab(port),
      fans_medal_list: msg => this.onFansMedalList(msg.data, port),
    };

    const { type } = msg;
    funcMap[type] && funcMap[type](msg);
  }

  onFansMedalList (data) {
    this.ghoulProxy.setFansMedalList(data);
  }

  onProTab (port) {
    this.ghoulProxy.setTab(port.sender.tab, port);
  }

  resetStat (stat, today) {
    stat.day = today;
    stat.box = 0;
    stat.zan = 0;
    stat.wen = 0;
    stat.song = 0;
    stat.silver = 0;
  }

  getToday () {
    const obj = new Date();
    return `${obj.getFullYear()}${obj.getMonth()}${obj.getDate()}`;
  }

  onTreasureGot (msg, port) {
    const { type, data } = msg;
    if (type === 'got') {
      const { setting } = localStorageProxy.entry();
      playAudio('https://static.jiuwozb.com/assets/audio/ding.wav', setting.vol / 100);
      const { stat } = localStorageProxy.entry();
      const today = this.getToday();
      if (stat.day !== today) {
        this.resetStat(stat, today);
      }
      ++stat.box;
      localStorageProxy.set('stat', stat);
    } else if (type === 'got_res') {
      // this.geetestAgent.upload(data);
      const { stat } = localStorageProxy.entry();
      const today = this.getToday();
      if (stat.day !== today) {
        this.resetStat(stat, today);
      }
      /* eslint-disable */
      const { award_type, silver, prop_count, prop_id, prop_name } = data;
      if (award_type === '1') {
        stat.silver += parseInt(silver, 10);
      } else if (award_type === '2') {
        if (prop_name === '赞') {
          stat.zan += parseInt(prop_count, 10);
        } else if (prop_name === '稳') {
          stat.wen += parseInt(prop_count, 10);
        } else if (prop_name === '怂') {
          stat.song += parseInt(prop_count, 10);
        } else {
          console.log('unknown prop_name:', data);
        }
      } else {
        console.log('unknown award_type:', data);
      }
      /* eslint-enable */
      localStorageProxy.set('stat', stat);
      port && !port.isDisconnected && port.postMessage({ type: 'sync' });
    }
  }
};

module.exports = BackgroundProxy;
