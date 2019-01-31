const socketClient = require('./socketClient');
const localStorageProxy = require('./localStorageProxy');

class NotificationProxy {
  notificationHandler (data) {
    const { cmd, notificationId, options } = data;
    if (!cmd || cmd === 'create' || cmd === 'stream_noti') {
      if (cmd === 'stream_noti' && !localStorageProxy.entry().setting.pcNotificationEnabled) {
        return;
      }
      chrome.notifications.create(notificationId, options, notificationId => {

      });
    } else if (cmd === 'update') {
      chrome.notifications.update(notificationId, options, wasUpdated => {

      });
    } else if (cmd === 'clear') {
      chrome.notifications.clear(notificationId, wasCleared => {

      });
    }
  }

  init () {
    chrome.notifications.getPermissionLevel(level => {
      if (level === 'granted') {
        socketClient.subscribe('noti', this.notificationHandler.bind(this));
      } else {
        // TODO
      }
    });
    if (localStorageProxy.entry().setting.pcNotificationEnabled) {
      socketClient.sendMessage('sub', { rid: '99999' });
    }
  }
};

module.exports = NotificationProxy;
