const axios = require('axios');
const urlbase = 'https://api.jiuwozb.com/dyasst';

class HttpClient {
  constructor () {
    this.dyUid = null;
    this.cachedGeetest = [];
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
      axios.post(urlbase + '/geetest', { ...data, dyUid });
    } else {
      this.cachedGeetest.push(data);
    }
  }

  async ver (ver) {
    try {
      const res = await axios.get(urlbase + '/ver', { params: { ver, timestamp: Date.now() } });
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
