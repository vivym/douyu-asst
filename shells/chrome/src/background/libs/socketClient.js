const { EventEmitter } = require('events');
const socketIO = require('socket.io-client');

class SocketClient extends EventEmitter {
  constructor () {
    super();
    this.socket = null;
    this.url = 'https://ws.jiuwozb.com/tse';
    this.isConnected = false;
  }

  connect () {
    if (this.socket) {
      return;
    }
    this.socket = socketIO(this.url);
    this.socket.on('connect', this.onConnected.bind(this));
    this.socket.on('disconnect', this.onDisconnected.bind(this));
  }

  destroy () {
    console.log('destroy');
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.isConnected = false;
  }

  register (evt, handler) {
    this.socket.on(evt, handler);
  }

  onConnected () {
    this.isConnected = true;
    console.log('ws connected');
    this.emit('connect');
  }

  onDisconnected () {
    this.isConnected = false;
    console.log('ws disconnected');
    this.emit('disconnect');
  }
};

module.exports = new SocketClient();
