const socketClient = require('./socketClient');

class NotificationProxy {
  notificationHandler (data) {
    const { cmd, notificationId, options } = data;
    if (!cmd || cmd === 'create') {
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
        socketClient.register('noti', data => this.notificationHandler.bind(this));
      } else {
        // TODO
      }
    });
  }
};

module.exports = NotificationProxy;
