const localStorageProxy = require('./libs/localStorageProxy');
const socketClient = require('./libs/socketClient');
const BackgroundProxy = require('./backgroundProxy');
const NotificationProxy = require('./libs/notificationProxy');
const installGlobals = require('./installGlobals');

localStorageProxy.init({ entryKey: 'dyasst' });

socketClient.connect();

const backgroundProxy = new BackgroundProxy();
backgroundProxy.setup();

const notificationProxy = new NotificationProxy();
notificationProxy.init();

installGlobals();

console.log('background setup');
