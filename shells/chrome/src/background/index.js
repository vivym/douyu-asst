const localStorageProxy = require('./libs/localStorageProxy');
const httpClient = require('./libs/httpClient');
const BackgroundProxy = require('./backgroundProxy');
const NotificationProxy = require('./libs/notificationProxy');
const installGlobals = require('./installGlobals');

window.dyasstLoginStatus = 0;

localStorageProxy.init({ entryKey: 'dyasst' });

httpClient.init();

const backgroundProxy = new BackgroundProxy();
backgroundProxy.setup();

const notificationProxy = new NotificationProxy();
notificationProxy.init();

installGlobals();

console.log('background setup');
