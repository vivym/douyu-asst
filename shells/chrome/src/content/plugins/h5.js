const Plugin = require('./plugin');

class H5Plugin extends Plugin {
  install () {
    require('../libs/h5_video_4db562d');
    Object.defineProperty(window, '_H5PlayerVideoLib', {
      get: () => {
        return window._H5PlayerVideoLib;
      },
      set: val => {
        // do nothing
      },
    });
    Object.defineProperty(window, '_webpackJsonpH5PlayerVideoLib', {
      get: () => {
        return window._webpackJsonpH5PlayerVideoLib;
      },
      set: () => {
        throw new Error('hook h5');
      },
    });
  }
};

module.exports = H5Plugin;
