const { sleep } = require('../../utils');

async function getWebpackModules () {
  while (!window.shark_room_jsonp) { // dirty
    await sleep(333);
  }
  return new Promise((resolve) => {
    const id = 'fakeModule';
    const fakeModule = {
      [id]: (module, exports, __webpack_require__) => { // eslint-disable-line
        resolve(__webpack_require__.c);
      },
    };
    window.shark_room_jsonp.push([[10000], fakeModule, [[id]]]);
  });
}

function hookWalk (obj, config, modules) {
  Object.keys(config).forEach(key => {
    if (key === 'prototype') {
      return hookWalk(obj.prototype, config[key], modules);
    }
    const backup = obj[key];
    const { leaf } = config[key];
    Object.defineProperty(obj, key, {
      get: () => {
        if (leaf) {
          return function (...args) {
            if (config[key].subscribers) {
              config[key].subscribers.forEach(subscriber => subscriber(modules, backup, ...args));
            }
            if (config[key].replace) {
              return config[key].replace.call(this, modules, backup, ...args);
            }
            return backup.call(this, ...args);
          };
        } else {
          return obj[`_${key}`];
        }
      },
      set: val => {
        !leaf && hookWalk(val, config[key], modules);
        obj[`_${key}`] = val;
      },
    });
    backup && (obj[key] = backup);
  });
}

function hookImpl (modules, mId, config) {
  Object.defineProperty(modules, mId, {
    get: () => modules[`_${mId}`],
    set: mod => {
      const exp = mod.exports;
      Object.defineProperty(mod, 'exports', {
        get: () => mod._exports,
        set: val => {
          hookWalk(val, config, modules);
          mod._exports = val;
        },
      });
      mod.exports = exp;
      modules[`_${mId}`] = mod;
    },
  });
}

async function hook (config) {
  const modules = await getWebpackModules();
  console.log(modules);
  Object.keys(config).forEach(mId => hookImpl(modules, mId, config[mId]));
}

module.exports = {
  hook,
};
