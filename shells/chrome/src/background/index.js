const localStorageProxy = require('./localStorageProxy');
const BackgroundProxy = require('./backgroundProxy');
const installGlobals = require('./installGlobals');

localStorageProxy.init({ entryKey: 'dyasst' });

const backgroundProxy = new BackgroundProxy();
backgroundProxy.setup();

installGlobals();

console.log('background setup');
