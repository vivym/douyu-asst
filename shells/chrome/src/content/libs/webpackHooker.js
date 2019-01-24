const webpackHelper = require('./webpackHelper');

class WebpackHooker {
  constructor () {
    this.hooks = {};
  }

  replace (mId, path, fn) {
    if (!this.hooks[mId]) {
      this.hooks[mId] = {};
    }
    let curObj = this.hooks[mId];
    while (path.length > 0) {
      const idx = path.shift();
      if (!curObj[idx]) {
        curObj[idx] = {};
      }
      curObj = curObj[idx];
    }
    curObj.leaf = true;
    if (curObj.replace) {
      console.log('webpackHooker replace conflict:', mId, path);
    }
    curObj.replace = fn;
  }

  subscribe (mId, path, cb) {
    if (!this.hooks[mId]) {
      this.hooks[mId] = {};
    }
    let curObj = this.hooks[mId];
    while (path.length > 0) {
      const idx = path.shift();
      if (!curObj[idx]) {
        curObj[idx] = {};
      }
      curObj = curObj[idx];
    }
    curObj.leaf = true;
    if (!curObj.subscribers) {
      curObj.subscribers = [];
    }
    curObj.subscribers.push(cb);
  }

  install () {
    webpackHelper.hook(this.hooks);
  }
};

module.exports = WebpackHooker;
