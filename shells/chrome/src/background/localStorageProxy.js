const store = require('./store');

class LocalStorageProxy {
  init (options = {}) {
    this.entryKey = options.entryKey || 'dyasst';
    if (!window.localStorage[this.entryKey]) {
      window.localStorage[this.entryKey] = JSON.stringify(store);
    }
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
