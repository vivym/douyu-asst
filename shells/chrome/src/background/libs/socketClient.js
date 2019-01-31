const { EventEmitter } = require('events');
const socketIO = require('socket.io-client');

const isProduction = process && process.env && process.env.NODE_ENV === 'production';

class SocketClient extends EventEmitter {
  constructor () {
    super();
    this.socket = null;
    this.url = isProduction ? 'https://ws.jiuwozb.com/dyasst' : 'http://127.0.0.1:7001/dyasst';
    // this.url = 'https://ws.jiuwozb.com/dyasst';
    this.isConnected = false;
    this.cachedSubscribers = [];
    this.cachedMsg = [];
  }

  connect (token) {
    this.connectTime = Date.now();
    this.socket = socketIO(this.url, {
      query: { token },
    });
    this.socket.on('connect', this.onConnected.bind(this));
    this.socket.on('disconnect', this.onDisconnected.bind(this));
    this.cachedSubscribers.forEach(({ evt, handler }) => this.socket.on(evt, handler));

    if (!isProduction) {
      window.socket = this.socket;
    }
  }

  destroy () {
    console.log('destroy');
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.isConnected = false;
  }

  subscribe (evt, handler) {
    if (this.socket) {
      this.socket.on(evt, handler);
    } else {
      this.cachedSubscribers.push({ evt, handler });
    }
  }

  sendMessage (evt, data) {
    if (this.socket) {
      this.socket.emit(evt, data);
    } else {
      this.cachedMsg.push({ evt, data });
    }
  }

  onConnected () {
    this.isConnected = true;
    console.log('ws connected');
    this.emit('connect');
    this.cachedMsg.forEach(({ evt, data }) => {
      this.socket.emit(evt, data);
    });
  }

  onDisconnected () {
    this.isConnected = false;
    console.log('ws disconnected');
    this.emit('disconnect');
  }
};

module.exports = new SocketClient();
