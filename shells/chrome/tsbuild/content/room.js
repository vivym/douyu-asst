/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"room": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/content/room.js","vender"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../config/99999.js":
/*!**************************************************!*\
  !*** /Users/viv/Proj/douyu-asst/config/99999.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  headerTitle: '99999摸金助手',\n  avatarUrl: 'https://apic.douyucdn.cn/upload/avatar_v3/201808/650168b922e4aae868b29fec672c4fa9_big.jpg',\n  version: '1.0.0',\n  roomUrl: 'https://www.douyu.com/99999',\n  roomId: '99999',\n\n  notification: {\n    enabled: false,\n    label2_0: '专属',\n  },\n\n  proModeEnabled: false,\n\n  jsBundleUrl: 'https://static.jiuwozb.com/tsbuild_99999',\n\n  key: 'b322b2',\n};\n\n\n//# sourceURL=webpack:////Users/viv/Proj/douyu-asst/config/99999.js?");

/***/ }),

/***/ "../../config/index.js":
/*!**************************************************!*\
  !*** /Users/viv/Proj/douyu-asst/config/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./99999 */ \"../../config/99999.js\");\n\n\n//# sourceURL=webpack:////Users/viv/Proj/douyu-asst/config/index.js?");

/***/ }),

/***/ "./src/content/libs/decode.js":
/*!************************************!*\
  !*** ./src/content/libs/decode.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var { isPlainObject } = __webpack_require__(/*! lodash */ \"../../node_modules/lodash/lodash.js\");\n\nfunction addItem (e, t) {\n  return e ? { key: e, value: t } : [t];\n}\n\nfunction scan (e) {\n  var n = [];\n  for (var t = '', r = '', o = 0, i = e.length; o < i; o++) {\n    var a = e.charAt(o);\n    if (a === '/') {\n      n.push(addItem(t, r));\n      t = '';\n      r = '';\n    } else {\n      if (a === '@') {\n        o += 1;\n        a = e.charAt(o);\n        if (a === 'A') {\n          r += '@';\n        } else {\n          if (a === 'S') {\n            r += '/';\n          } else {\n            if (a === '=') {\n              t = r;\n              r = '';\n            }\n          }\n        }\n      } else {\n        r += a;\n      }\n    }\n  }\n  return n;\n}\n\nfunction parse (e) {\n  var t = String(e);\n  if (t) {\n    t.charAt(t.length - 1) !== '/' && (t += '/');\n    return scan(t);\n  } else {\n    return [];\n  }\n}\n\nfunction decode (e) {\n  var t = void 0;\n  parse(e).forEach(e => {\n    if (Array.isArray(e)) {\n      t = t || [];\n      e.length === 1 ? t.push(e[0]) : t.push(e);\n    }\n    if (isPlainObject(e)) {\n      var r = e.key;\n      var o = e.value;\n      (t = t || {})[r] = o;\n    }\n  });\n  return t;\n}\n\nmodule.exports = decode;\n\n\n//# sourceURL=webpack:///./src/content/libs/decode.js?");

/***/ }),

/***/ "./src/content/libs/installNotification2.js":
/*!**************************************************!*\
  !*** ./src/content/libs/installNotification2.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var { sleep, injectRemoteJS } = __webpack_require__(/*! ../../utils */ \"./src/utils/index.js\");\n\nasync function installNotification () {\n  while (true) {\n    if (document.body) {\n      break;\n    }\n    await sleep(333);\n  }\n  var wrapper = document.createElement('div');\n  wrapper.id = 'dyasst-notification';\n  document.body.insertBefore(wrapper, document.body.firstElementChild);\n\n  injectRemoteJS('chrome-extension://gbbpngofangjplfgakjffjfcphngbolm/tsbuild/content/notification.js');\n}\n\nmodule.exports = installNotification;\n\n\n//# sourceURL=webpack:///./src/content/libs/installNotification2.js?");

/***/ }),

/***/ "./src/content/libs/installPanel.js":
/*!******************************************!*\
  !*** ./src/content/libs/installPanel.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var { sleep, injectRemoteJS } = __webpack_require__(/*! ../../utils */ \"./src/utils/index.js\");\n\nasync function installPanel () {\n  while (true) {\n    if (document.body) {\n      break;\n    }\n    await sleep(333);\n  }\n  var wrapper = document.createElement('div');\n  wrapper.id = 'dyasst';\n  document.body.insertBefore(wrapper, document.body.firstElementChild);\n\n  injectRemoteJS('chrome-extension://gbbpngofangjplfgakjffjfcphngbolm/tsbuild/content/panel.js');\n}\n\nmodule.exports = installPanel;\n\n\n//# sourceURL=webpack:///./src/content/libs/installPanel.js?");

/***/ }),

/***/ "./src/content/libs/installTsbox.js":
/*!******************************************!*\
  !*** ./src/content/libs/installTsbox.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var { injectRemoteJS, waitForDom } = __webpack_require__(/*! ../../utils */ \"./src/utils/index.js\");\n\nasync function installTsbox () {\n  var el = await waitForDom('.TreasureWrap');\n  el.style.visibility = 'hidden';\n\n  var wrapper = document.createElement('div');\n  wrapper.id = 'dyasst-tsbox';\n  var layout = document.getElementsByClassName('layout-Player-effect')[0];\n  layout.insertBefore(wrapper, layout.firstElementChild);\n\n  injectRemoteJS('chrome-extension://gbbpngofangjplfgakjffjfcphngbolm/tsbuild/content/tsbox.js');\n}\n\nmodule.exports = installTsbox;\n\n\n//# sourceURL=webpack:///./src/content/libs/installTsbox.js?");

/***/ }),

/***/ "./src/content/libs/pluginProxy.js":
/*!*****************************************!*\
  !*** ./src/content/libs/pluginProxy.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var WebpackHooker = __webpack_require__(/*! ./webpackHooker */ \"./src/content/libs/webpackHooker.js\");\nvar { sleep } = __webpack_require__(/*! ../../utils */ \"./src/utils/index.js\");\n\nclass PluginProxy {\n  constructor () {\n    this.webpackHooker = new WebpackHooker();\n    this.plugins = [];\n    this.objPromises = new Map();\n  }\n\n  async waitForObj (obj, key, interval = 200) {\n    while (true) {\n      if (obj[key]) {\n        return;\n      }\n      await sleep(interval);\n    }\n  }\n\n  push (plugin) {\n    plugin.grant() && this.plugins.push(plugin);\n  }\n\n  install () {\n    this.plugins.forEach(plugin => {\n      plugin.registerWebpackHooks(this.webpackHooker);\n      var objs = plugin.getDepObjs();\n      if (objs && objs.length > 0) {\n        objs.forEach(obj => {\n          if (!this.objPromises.has(obj)) {\n            this.objPromises.set(obj, this.waitForObj(window, obj));\n          }\n          this.objPromises.get(obj).then(() => plugin.depObjReady(obj));\n        });\n      }\n    });\n    this.webpackHooker.install();\n    this.plugins.forEach(plugin => plugin.install());\n  }\n};\n\nmodule.exports = PluginProxy;\n\n\n//# sourceURL=webpack:///./src/content/libs/pluginProxy.js?");

/***/ }),

/***/ "./src/content/libs/webpackHelper.js":
/*!*******************************************!*\
  !*** ./src/content/libs/webpackHelper.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var { sleep } = __webpack_require__(/*! ../../utils */ \"./src/utils/index.js\");\n\nasync function getWebpackModules () {\n  while (!window.shark_room_jsonp) { // dirty\n    await sleep(333);\n  }\n  return new Promise((resolve) => {\n    var id = 'fakeModule';\n    var fakeModule = {\n      [id]: (module, exports, __webpack_require__) => { // eslint-disable-line\n        resolve(__webpack_require__.c);\n      },\n    };\n    window.shark_room_jsonp.push([[10000], fakeModule, [[id]]]);\n  });\n}\n\nfunction hookWalk (obj, config, modules) {\n  Object.keys(config).forEach(key => {\n    if (key === 'prototype') {\n      return hookWalk(obj.prototype, config[key], modules);\n    }\n    var backup = obj[key];\n    var { leaf } = config[key];\n    Object.defineProperty(obj, key, {\n      get: () => {\n        if (leaf) {\n          return function (...args) {\n            if (config[key].subscribers) {\n              config[key].subscribers.forEach(subscriber => subscriber(modules, backup, ...args));\n            }\n            if (config[key].replace) {\n              return config[key].replace.call(this, modules, backup, ...args);\n            }\n            return backup.call(this, ...args);\n          };\n        } else {\n          return obj[`_${key}`];\n        }\n      },\n      set: val => {\n        !leaf && hookWalk(val, config[key], modules);\n        obj[`_${key}`] = val;\n      },\n    });\n    backup && (obj[key] = backup);\n  });\n}\n\nfunction hookImpl (modules, mId, config) {\n  Object.defineProperty(modules, mId, {\n    get: () => modules[`_${mId}`],\n    set: mod => {\n      var exp = mod.exports;\n      Object.defineProperty(mod, 'exports', {\n        get: () => mod._exports,\n        set: val => {\n          hookWalk(val, config, modules);\n          mod._exports = val;\n        },\n      });\n      mod.exports = exp;\n      modules[`_${mId}`] = mod;\n    },\n  });\n}\n\nasync function hook (config) {\n  var modules = await getWebpackModules();\n  console.log(modules);\n  Object.keys(config).forEach(mId => hookImpl(modules, mId, config[mId]));\n}\n\nmodule.exports = {\n  hook,\n};\n\n\n//# sourceURL=webpack:///./src/content/libs/webpackHelper.js?");

/***/ }),

/***/ "./src/content/libs/webpackHooker.js":
/*!*******************************************!*\
  !*** ./src/content/libs/webpackHooker.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var webpackHelper = __webpack_require__(/*! ./webpackHelper */ \"./src/content/libs/webpackHelper.js\");\n\nclass WebpackHooker {\n  constructor () {\n    this.hooks = {};\n  }\n\n  replace (mId, path, fn) {\n    if (!this.hooks[mId]) {\n      this.hooks[mId] = {};\n    }\n    var curObj = this.hooks[mId];\n    while (path.length > 0) {\n      var idx = path.shift();\n      if (!curObj[idx]) {\n        curObj[idx] = {};\n      }\n      curObj = curObj[idx];\n    }\n    curObj.leaf = true;\n    if (curObj.replace) {\n      console.log('webpackHooker replace conflict:', mId, path);\n    }\n    curObj.replace = fn;\n  }\n\n  subscribe (mId, path, cb) {\n    if (!this.hooks[mId]) {\n      this.hooks[mId] = {};\n    }\n    var curObj = this.hooks[mId];\n    while (path.length > 0) {\n      var idx = path.shift();\n      if (!curObj[idx]) {\n        curObj[idx] = {};\n      }\n      curObj = curObj[idx];\n    }\n    curObj.leaf = true;\n    if (!curObj.subscribers) {\n      curObj.subscribers = [];\n    }\n    curObj.subscribers.push(cb);\n  }\n\n  install () {\n    webpackHelper.hook(this.hooks);\n  }\n};\n\nmodule.exports = WebpackHooker;\n\n\n//# sourceURL=webpack:///./src/content/libs/webpackHooker.js?");

/***/ }),

/***/ "./src/content/plugins/barrage.js":
/*!****************************************!*\
  !*** ./src/content/plugins/barrage.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Plugin = __webpack_require__(/*! ./plugin */ \"./src/content/plugins/plugin.js\");\n\nclass BarragePlugin extends Plugin {\n  constructor (setting) {\n    super();\n    this.setting = setting;\n  }\n\n  getDepObjs () {\n    return ['socketProxy'];\n  }\n\n  depObjReady (obj) {\n    if (obj === 'socketProxy') {\n      this.installSocketHook();\n    }\n  }\n\n  barrageHandler (msg) {\n    // console.log(msg);\n  }\n\n  installSocketHook () {\n    var { socketStream } = window.socketProxy;\n    var { setting } = this;\n\n    var uenterThrottle = socketStream.MODULE.uenter.throttle;\n    socketStream.MODULE.uenter.throttle = function (...argv) {\n      return setting.blockEnterBarrage || uenterThrottle.call(this, ...argv);\n    };\n\n    var chatmsgThrottle = socketStream.MODULE.chatmsg.throttle;\n    socketStream.MODULE.chatmsg.throttle = function (...argv) { // TODO: block draw barrage\n      return chatmsgThrottle.call(this, ...argv);\n    };\n    socketStream.subscribe('chatmsg', this.barrageHandler.bind(this));\n  }\n};\n\nmodule.exports = BarragePlugin;\n\n\n//# sourceURL=webpack:///./src/content/plugins/barrage.js?");

/***/ }),

/***/ "./src/content/plugins/capture.js":
/*!****************************************!*\
  !*** ./src/content/plugins/capture.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Plugin = __webpack_require__(/*! ./plugin */ \"./src/content/plugins/plugin.js\");\nvar { waitForDom, waitForObj, injectRemoteJS } = __webpack_require__(/*! ../../utils */ \"./src/utils/index.js\");\n\nclass CapturePlugin extends Plugin {\n  constructor (setting) {\n    super();\n    this.setting = setting;\n    this.data = [];\n  }\n\n  grant () {\n    return true;\n  }\n\n  push (data) {\n    console.log(data);\n    this.data.push(data);\n    while (this.data.length > 30) {\n      this.data.shift();\n    }\n  }\n\n  startRecording (stream) {\n    var recorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9,opus' });\n    recorder.ondataavailable = evt => this.push(evt.data);\n    recorder.start(1000);\n  }\n\n  install () {\n    waitForDom('body').then(() => {\n      var wrapper = document.createElement('div');\n      wrapper.id = 'dyasst-capture';\n      document.body.insertBefore(wrapper, document.body.firstElementChild);\n\n      injectRemoteJS('chrome-extension://gbbpngofangjplfgakjffjfcphngbolm/tsbuild/content/capture.js');\n    });\n    waitForDom('video').then(videoEl => {\n      waitForObj(videoEl, 'currentTime').then(() => {\n        // this.startRecording(videoEl.captureStream());\n      });\n    });\n\n    window.dyasstGetCapturedVideo = () => {\n      return this.data;\n      // return new Blob(this.data, { type: 'video/webm; codecs=vp9' });\n    };\n  }\n};\n\nmodule.exports = CapturePlugin;\n\n\n//# sourceURL=webpack:///./src/content/plugins/capture.js?");

/***/ }),

/***/ "./src/content/plugins/plugin.js":
/*!***************************************!*\
  !*** ./src/content/plugins/plugin.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var { EventEmitter } = __webpack_require__(/*! events */ \"../../node_modules/events/events.js\");\n\nclass Plugin extends EventEmitter {\n  grant () { return true; }\n\n  getDepObjs () { return null; }\n\n  depObjReady () {}\n\n  registerWebpackHooks () {}\n\n  install () {}\n};\n\nmodule.exports = Plugin;\n\n\n//# sourceURL=webpack:///./src/content/plugins/plugin.js?");

/***/ }),

/***/ "./src/content/plugins/tsbox.js":
/*!**************************************!*\
  !*** ./src/content/plugins/tsbox.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var FastPriorityQueue = __webpack_require__(/*! fastpriorityqueue */ \"../../node_modules/fastpriorityqueue/FastPriorityQueue.js\");\nvar Plugin = __webpack_require__(/*! ./plugin */ \"./src/content/plugins/plugin.js\");\nvar decode = __webpack_require__(/*! ../libs/decode */ \"./src/content/libs/decode.js\");\nvar { sleep } = __webpack_require__(/*! ../../utils */ \"./src/utils/index.js\");\n\nclass TsboxPlugin extends Plugin {\n  constructor (setting) {\n    super();\n    this.name = 'tsbox';\n    this.setting = setting;\n    this.state = 'IDLE';\n    this.pendingBox = new FastPriorityQueue((a, b) => a.surplusTime < b.surplusTime);\n    this.noTs = true;\n  }\n\n  grant () {\n    return this.setting.ghoulEnabled;\n  }\n\n  registerWebpackHooks (webpackHooker) {\n    webpackHooker.replace('1c14c', ['a', 'prototype', 'drawTreasureRequest'], this.drawTreasureRequest);\n  }\n\n  drawTreasureRequest (modules, fn, t) {\n    var payload = t.payload || {};\n    var { type, data } = payload;\n    var douyuDid = this.global.get('douyuDid');\n    var info = {};\n    if (type === 'init') {\n      this.config.treasureId = data.treasureId;\n      this.config.ownRid = data.roomId;\n      info = {\n        room_id: data.roomId,\n        package_room_id: data.roomId,\n        device_id: douyuDid,\n        packerid: data.treasureId || 0,\n        version: 1,\n      };\n      this.config.isGeeChecking = true;\n    } else {\n      info = Object.assign({}, {\n        room_id: this.config.ownRid || 0,\n        package_room_id: this.config.ownRid || 0,\n        device_id: douyuDid,\n        packerid: this.config.treasureId || 0,\n        version: 1,\n      }, data);\n      this.config.isGeeChecking = false;\n    }\n    var httpClient = window.sdkf30fc3f26aeee28b73b0('0b1d3').default;\n    return httpClient.post(String, '/member/task/redPacketReceive', info, {\n      headers: { 'content-type': 'application/x-www-form-urlencoded' },\n    });\n  }\n\n  handlePendingBoxes (boxes) {\n    if (boxes && boxes instanceof Array) {\n      boxes.forEach(box => this.pendingBox.add(box));\n    } else if (boxes) {\n      this.pendingBox.add(boxes);\n    }\n\n    if (!this.pendingBox.isEmpty() && this.state === 'IDLE') {\n      this.noTs = false;\n      this.state = 'WAITING';\n      var { delayRange } = this.setting;\n      var delay = Math.max(delayRange[1] - delayRange[0], 0) * Math.random() + delayRange[0];\n      var box = this.pendingBox.poll();\n      var limit = this.setting.rocketOnly ? 102 : 0;\n      var surplusTime = box.treasureType >= limit ? Math.max(box.surplusTime * 1000 - Date.now() - (this.setting.timeDelta || 0) + delay + 5, 0) : 1;\n      setTimeout(() => this.handleTimeupBox(box), surplusTime);\n    }\n\n    if (this.pendingBox.isEmpty() && this.state === 'IDLE') {\n      this.noTs = true;\n    }\n  }\n\n  handleTimeupBox (box) {\n    if (this.state === 'WAITING') {\n      var time = parseInt((Date.now() + this.setting.timeDelta) / 1000, 10);\n      if (this.setting.ghoulMode === 'pro' && box.surplusTime + 5 < time) {\n        console.log('miss');\n        this.state = 'IDLE';\n        return this.handlePendingBoxes();\n      }\n      var limit = this.setting.rocketOnly ? 102 : 0;\n      if (box.treasureType >= limit) {\n        console.log('picking', box);\n        this.state = 'PICKING';\n        window.PlayerAsideApp.container.registry.store.dispatch({\n          type: 'DRAW_TREASURE',\n          payload: { data: box, type: 'init' },\n        });\n      } else {\n        console.log('pass');\n        this.state = 'IDLE';\n        this.handlePendingBoxes();\n      }\n    }\n  }\n\n  async setDocTitle () {\n    if (!document.title_src) {\n      document.title_src = document.title;\n      document.title = '[新箱子验证] ' + document.title;\n      while (true) {\n        if (!document.hidden) {\n          document.title = document.title_src;\n          delete document.title_src;\n          break;\n        }\n        await sleep(1000);\n      }\n    }\n  }\n\n  async showGeeTestPanel () { // dirty\n    var state = 'INIT';\n    while (true) {\n      if (state === 'INIT') {\n        var elems = document.getElementsByClassName('geetest_radar_tip');\n        if (elems && elems.length > 0) {\n          elems[0].onmouseenter && elems[0].onmouseenter();\n          elems[0].click && elems[0].click();\n          state = 'GEE';\n        }\n      } else if (state === 'GEE') {\n        var elems$1 = document.getElementsByClassName('geetest_popup_box');\n        if (elems$1 && elems$1.length > 0) {\n          elems$1[0].style['width'] = '347px';\n          state = 'WAIT';\n        }\n      } else if (state === 'WAIT') {\n        var elems$2 = document.getElementsByClassName('geetest_popup_box');\n        if (!elems$2 || elems$2.length <= 0) {\n          break;\n        }\n      }\n      await sleep(200);\n    }\n  }\n\n  isArray (s) {\n    return /@\\S\\//g.test(String(s));\n  }\n\n  dataMap (boxes) {\n    return boxes.map(box => ({\n      roomId: window.socketProxy.info.room.roomId,\n      treasureId: parseInt(box.rpid, 10),\n      treasureType: parseInt(box.rpt, 10),\n      senderName: box.snk,\n      senderUid: +box.sid,\n      surplusTime: parseInt(box.ot, 10),\n      destroyTime: parseInt(box.dt, 10),\n    }));\n  }\n\n  installSocketHook () {\n    var { socketStream } = window.socketProxy;\n    var { setting } = this;\n    if (setting.ghoulEnabled) {\n      socketStream.subscribe('tsbox', boxes => {\n        console.log('tsbox', boxes);\n        // this.setting.ghoulEnabled && this.handlePendingBoxes(boxes);\n      });\n\n      socketStream.subscribe('tslist', msg => {\n        var list = msg.list || [];\n        var boxes = [];\n        (this.isArray(list) ? decode(list) : [list]).forEach(data => {\n          data && boxes.push(decode(data));\n        });\n        this.handlePendingBoxes(this.dataMap(boxes));\n      });\n    }\n\n    var uenterThrottle = socketStream.MODULE.uenter.throttle;\n    socketStream.MODULE.uenter.throttle = function (...argv) {\n      return setting.blockEnterBarrage || uenterThrottle.call(this, ...argv);\n    };\n  }\n\n  installHttpHook () {\n    var httpClient = window.sdkf30fc3f26aeee28b73b0('0b1d3').default;\n    httpClient.applyMiddleWare('post', /\\/member\\/task\\/redPacketReceive/i, rsp => {\n      if (rsp.geetest) {\n        this.state = 'GEE_TESTING';\n        this.setDocTitle();\n        this.emit('got');\n        this.showGeeTestPanel();\n      } else if (rsp.award_type) {\n        this.emit('got_res', rsp);\n        this.state = 'IDLE';\n        this.handlePendingBoxes();\n      } else {\n        this.state = 'IDLE';\n        console.log('miss.');\n        this.handlePendingBoxes();\n      }\n      return rsp;\n    });\n  }\n\n  getDepObjs () {\n    return ['socketProxy', 'sdkf30fc3f26aeee28b73b0'];\n  }\n\n  depObjReady (obj) {\n    if (obj === 'socketProxy') {\n      this.installSocketHook();\n    } else if (obj === 'sdkf30fc3f26aeee28b73b0') {\n      this.installHttpHook();\n    }\n  }\n};\n\nmodule.exports = TsboxPlugin;\n\n\n//# sourceURL=webpack:///./src/content/plugins/tsbox.js?");

/***/ }),

/***/ "./src/content/room.js":
/*!*****************************!*\
  !*** ./src/content/room.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var config = __webpack_require__(/*! config */ \"../../config/index.js\");\nvar installNotification = __webpack_require__(/*! ./libs/installNotification2 */ \"./src/content/libs/installNotification2.js\");\nvar installPanel = __webpack_require__(/*! ./libs/installPanel */ \"./src/content/libs/installPanel.js\");\nvar installTsbox = __webpack_require__(/*! ./libs/installTsbox */ \"./src/content/libs/installTsbox.js\");\nvar PluginProxy = __webpack_require__(/*! ./libs/pluginProxy */ \"./src/content/libs/pluginProxy.js\");\nvar TsboxPlugin = __webpack_require__(/*! ./plugins/tsbox */ \"./src/content/plugins/tsbox.js\");\nvar BarragePlugin = __webpack_require__(/*! ./plugins/barrage */ \"./src/content/plugins/barrage.js\");\nvar CapturePlugin = __webpack_require__(/*! ./plugins/capture */ \"./src/content/plugins/capture.js\");\n\nfunction roomSetup (setting) {\n  var tsboxPlugin = new TsboxPlugin(setting);\n  tsboxPlugin.on('got', () => {\n    console.log('got');\n    window.postMessage({ source: 'treasure_got', target: 'bg' }, '*');\n  });\n  tsboxPlugin.on('got_res', data => {\n    window.postMessage({ source: 'treasure_got_res', data, target: 'bg' }, '*');\n  });\n  tsboxPlugin.on('miss', () => {\n    if (setting.ghoulEnabled && setting.autoClose && tsboxPlugin.noTs) {\n      window.close();\n    }\n  });\n  var barragePlugin = new BarragePlugin(setting);\n  var capturePlugin = new CapturePlugin(setting);\n\n  var pluginProxy = new PluginProxy();\n  pluginProxy.push(tsboxPlugin);\n  pluginProxy.push(barragePlugin);\n  pluginProxy.push(capturePlugin);\n  // pluginProxy.push(h5plugin);\n  pluginProxy.install();\n\n  if (setting.ghoulMode === 'pro' && setting.ghoulEnabled && document.location.href.startsWith(config.roomUrl)) {\n    window.postMessage({ source: 'pro_tab', target: 'bg' }, '*');\n  }\n\n  window.addEventListener('message', (evt) => {\n    if (evt.source === window && evt.data && evt.data.source === 'sync') {\n      if (setting.ghoulMode === 'normal' && setting.autoClose && tsboxPlugin.noTs) {\n        window.close();\n      }\n    } else if (evt.source === window && evt.data && evt.data.source === 'tsbox') {\n      if (setting.ghoulMode === 'pro' && setting.ghoulEnabled) {\n        tsboxPlugin.handlePendingBoxes(evt.data.data);\n      }\n    }\n  });\n\n  if (document.location.href.startsWith(config.roomUrl)) {\n    installNotification();\n  }\n  installTsbox();\n  installPanel();\n}\n\nvar hookWrapper = {};\nfunction hookOnloadNotify () {\n  var originOnloadNotify = window.onload_notify;\n  var accessCnt = 0;\n  var hookPromise = new Promise((resolve, reject) => {\n    hookWrapper.resolve = resolve;\n    hookWrapper.reject = () => {\n      reject(new Error('minimalism'));\n    };\n  });\n\n  Object.defineProperty(window, 'onload_notify', {\n    get: () => {\n      if (++accessCnt > 1) {\n        return originOnloadNotify;\n      } else {\n        return hookPromise;\n      }\n    },\n    set: value => {\n      originOnloadNotify = value;\n    },\n  });\n}\n\n(() => {\n  hookOnloadNotify();\n  var done = false;\n  window.postMessage({ source: 'backend_installed' }, '*');\n  window.addEventListener('message', (evt) => {\n    if (evt.source === window && evt.data && evt.data.source === 'setting' && !done) {\n      done = true;\n      var setting = evt.data.data;\n      if (setting.key === config.key) {\n        setting.minimalism ? hookWrapper.reject() : hookWrapper.resolve();\n        roomSetup(setting);\n      }\n    }\n  });\n})();\n\n\n//# sourceURL=webpack:///./src/content/room.js?");

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(process) {var { jsBundleUrl } = __webpack_require__(/*! config */ \"../../config/index.js\");\n\nasync function sleep (timeout) {\n  return new Promise(resolve => setTimeout(() => resolve(), timeout));\n}\n\nfunction injectRemoteJS (url) {\n  var isProduction = process && process.env && \"development\" === 'production';\n  if (isProduction) {\n    url = url.startsWith('/tsbuild') ? url.slice(8) : url;\n    url = jsBundleUrl + url;\n  } else {\n    url = url.startsWith('chrome-extension') ? url : chrome.extension.getURL(url);\n  }\n\n  var script = document.createElement('script');\n  script.src = url;\n  document.documentElement.appendChild(script);\n  script.parentNode.removeChild(script);\n}\n\nfunction playAudio (src, vol) {\n  if (vol > 0) {\n    var audio = new Audio();\n    audio.src = src;\n    audio.volume = vol;\n    audio.play();\n  }\n}\n\nasync function waitForObj (obj, key, interval = 200) {\n  while (true) {\n    if (obj[key]) {\n      return;\n    }\n    await sleep(interval);\n  }\n}\n\nasync function waitForDom (selector, interval = 200) {\n  while (true) {\n    var el = document.querySelector(selector);\n    if (el) {\n      return el;\n    }\n    await sleep(interval);\n  }\n}\n\nmodule.exports = {\n  sleep,\n  injectRemoteJS,\n  playAudio,\n  waitForObj,\n  waitForDom,\n};\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/process/browser.js */ \"../../node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./src/utils/index.js?");

/***/ })

/******/ });