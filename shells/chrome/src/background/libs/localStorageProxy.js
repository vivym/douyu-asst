const initStore = require('./store');
const { isPlainObject } = require('lodash');

class LocalStorageProxy {
  init (options = {}) {
    this.entryKey = options.entryKey || 'dyasst';
    if (!window.localStorage[this.entryKey]) {
      window.localStorage[this.entryKey] = JSON.stringify(initStore);
    }
    const store = JSON.parse(window.localStorage[this.entryKey]);
    if (this.diff(store, initStore)) {
      window.localStorage[this.entryKey] = JSON.stringify(store);
    }
  }

  diff (objA, objB) {
    return Object.keys(objB).some(key => {
      if (objA[key] === undefined) {
        objA[key] = objB[key];
        return true;
      } else if (isPlainObject(objA[key])) {
        return this.diff(objA[key], objB[key]);
      }
      return false;
    });
  }

  entry () {
    return JSON.parse(window.localStorage[this.entryKey]);
  }

  set (key, value) {
    const entry = JSON.parse(window.localStorage[this.entryKey]);
    entry[key] = value;
    window.localStorage[this.entryKey] = JSON.stringify(entry);
  }
};

module.exports = new LocalStorageProxy();
