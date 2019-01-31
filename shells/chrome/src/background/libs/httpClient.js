const axios = require('axios');
const fingerprint2 = require('fingerprintjs2');
const socketClient = require('./socketClient');
const { sleep } = require('../../utils');

const isProduction = process && process.env && process.env.NODE_ENV === 'production';
const baseUrl = isProduction ? 'https://api.jiuwozb.com/dyasst' : 'http://127.0.0.1:7001';
// const baseUrl = 'https://api.jiuwozb.com/dyasst';

class HttpClient {
  constructor () {
    this.dyUid = null;
    this.cachedGeetest = [];
    this.deviceID = '';
    this.token = '';
  }

  async init () {
    this.deviceID = await this.calcDeviceID();
    while (true) {
      try {
        const rsp = await axios.post(`${baseUrl}/login`, { deviceID: this.deviceID });
        if (rsp.status === 200 && rsp.data.code === 0) {
          this.token = rsp.data.data.token;
          window.dyasstLoginStatus = 1;
          return socketClient.connect(this.token);
        }
      } catch (err) {
        console.error(err);
      }
      await sleep(1000);
    }
  }

  calcDeviceID () {
    return new Promise(resolve => {
      setTimeout(() => {
        fingerprint2.get(components => {
          const values = components.map(component => component.value);
          resolve(fingerprint2.x64hash128(values.join(''), 31));
        });
      }, 500);
    });
  }

  dyLogin (data) {
    this.dyUid = data ? data.dyUid : null;
    if (this.dyUid) {
      this.cachedGeetest.forEach(data => this.uploadGeetest(data));
      this.cachedGeetest = [];
    }
  }

  async uploadGeetest (data) {
    const { dyUid } = this;
    if (dyUid) {
      axios.post(baseUrl + '/geetest', { ...data, dyUid });
    } else {
      this.cachedGeetest.push(data);
    }
  }

  async ver (ver) {
    try {
      const res = await axios.get(baseUrl + '/ver', { params: { ver, timestamp: Date.now() } });
      return res.status === 200 ? res.data : null;
    } catch (err) {
      return null;
    }
  }

  async standardTime () {
    try {
      const res = await axios.get('http://api.m.taobao.com/rest/api3.do', { params: { api: 'mtop.common.getTimestamp', timestamp: Date.now() } });
      return res.status === 200 && res.data.data && res.data.data.t ? parseInt(res.data.data.t, 10) : null;
    } catch (err) {
      return null;
    }
  }
};

module.exports = new HttpClient();
