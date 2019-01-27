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
/******/ 		"index": 0
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
/******/ 	deferredModules.push(["./src/background/index.js","vender"]);
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

/***/ "./src/background/backgroundProxy.js":
/*!*******************************************!*\
  !*** ./src/background/backgroundProxy.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var httpClient = __webpack_require__(/*! ./libs/httpClient */ \"./src/background/libs/httpClient.js\");\nvar localStorageProxy = __webpack_require__(/*! ./libs/localStorageProxy */ \"./src/background/libs/localStorageProxy.js\");\nvar GhoulProxy = __webpack_require__(/*! ./libs/ghoulProxy */ \"./src/background/libs/ghoulProxy.js\");\nvar { playAudio } = __webpack_require__(/*! ../utils */ \"./src/utils/index.js\");\nvar config = __webpack_require__(/*! config */ \"../../config/index.js\");\n\nclass BackgroundProxy {\n  constructor () {\n    this.ghoulProxy = new GhoulProxy();\n  }\n\n  setup () {\n    chrome.runtime.onConnect.addListener(port => {\n      if (port.name === 'content') {\n        this.onContentConnected(port);\n      }\n    });\n  }\n\n  onContentConnected (port) {\n    var { setting } = localStorageProxy.entry();\n    if (setting) {\n      new Promise(resolve => {\n        if (setting.netTimeSync) {\n          httpClient.standardTime().then(time => {\n            resolve(time - Date.now() + 20);\n          }).catch(err => resolve(err));\n        } else {\n          resolve(0);\n        }\n      }).then(timeDelta => {\n        if (setting.netTimeSync && timeDelta > 0) {\n          setting.timeDelta = timeDelta;\n        } else {\n          setting.timeDelta = 0;\n        }\n        setting.key = config.key;\n        port && !port.isDisconnected && port.postMessage({ type: 'setting', data: setting });\n      });\n    }\n\n    port.onMessage.addListener(this.contentMessageHandler.bind(this, port));\n  }\n\n  contentMessageHandler (port, msg) {\n    var funcMap = {\n      treasure_got: msg => this.onTreasureGot(msg, port),\n      treasure_got_res: msg => this.onTreasureGot(msg, port),\n      geetest_data: msg => this.geetestAgent.update(msg.data, port),\n      dy_login: msg => httpClient.dyLogin(msg.data, port),\n      pro_tab: msg => this.onProTab(port),\n      fans_medal_list: msg => this.onFansMedalList(msg.data, port),\n    };\n\n    var { type } = msg;\n    funcMap[type] && funcMap[type](msg);\n  }\n\n  onFansMedalList (data) {\n    this.ghoulProxy.setFansMedalList(data);\n  }\n\n  onProTab (port) {\n    this.ghoulProxy.setTab(port.sender.tab, port);\n  }\n\n  resetStat (stat, today) {\n    stat.day = today;\n    stat.box = 0;\n    stat.zan = 0;\n    stat.wen = 0;\n    stat.song = 0;\n    stat.silver = 0;\n  }\n\n  getToday () {\n    var obj = new Date();\n    return `${obj.getFullYear()}${obj.getMonth()}${obj.getDate()}`;\n  }\n\n  onTreasureGot (msg, port) {\n    var { type, data } = msg;\n    if (type === 'got') {\n      var { setting } = localStorageProxy.entry();\n      playAudio('https://static.jiuwozb.com/assets/audio/ding.wav', setting.vol / 100);\n      var { stat } = localStorageProxy.entry();\n      var today = this.getToday();\n      if (stat.day !== today) {\n        this.resetStat(stat, today);\n      }\n      ++stat.box;\n      localStorageProxy.set('stat', stat);\n    } else if (type === 'got_res') {\n      // this.geetestAgent.upload(data);\n      var { stat$1 } = localStorageProxy.entry();\n      var today$1 = this.getToday();\n      if (stat$1.day !== today$1) {\n        this.resetStat(stat$1, today$1);\n      }\n      /* eslint-disable */\n      var { award_type, silver, prop_count, prop_id, prop_name } = data;\n      if (award_type === '1') {\n        stat$1.silver += parseInt(silver, 10);\n      } else if (award_type === '2') {\n        if (prop_name === '赞') {\n          stat$1.zan += parseInt(prop_count, 10);\n        } else if (prop_name === '稳') {\n          stat$1.wen += parseInt(prop_count, 10);\n        } else if (prop_name === '怂') {\n          stat$1.song += parseInt(prop_count, 10);\n        } else {\n          console.log('unknown prop_name:', data);\n        }\n      } else {\n        console.log('unknown award_type:', data);\n      }\n      /* eslint-enable */\n      localStorageProxy.set('stat', stat$1);\n      port && !port.isDisconnected && port.postMessage({ type: 'sync' });\n    }\n  }\n};\n\nmodule.exports = BackgroundProxy;\n\n\n//# sourceURL=webpack:///./src/background/backgroundProxy.js?");

/***/ }),

/***/ "./src/background/index.js":
/*!*********************************!*\
  !*** ./src/background/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var localStorageProxy = __webpack_require__(/*! ./libs/localStorageProxy */ \"./src/background/libs/localStorageProxy.js\");\nvar socketClient = __webpack_require__(/*! ./libs/socketClient */ \"./src/background/libs/socketClient.js\");\nvar BackgroundProxy = __webpack_require__(/*! ./backgroundProxy */ \"./src/background/backgroundProxy.js\");\nvar NotificationProxy = __webpack_require__(/*! ./libs/notificationProxy */ \"./src/background/libs/notificationProxy.js\");\nvar installGlobals = __webpack_require__(/*! ./installGlobals */ \"./src/background/installGlobals.js\");\n\nlocalStorageProxy.init({ entryKey: 'dyasst' });\n\nsocketClient.connect();\n\nvar backgroundProxy = new BackgroundProxy();\nbackgroundProxy.setup();\n\nvar notificationProxy = new NotificationProxy();\nnotificationProxy.init();\n\ninstallGlobals();\n\nconsole.log('background setup');\n\n\n//# sourceURL=webpack:///./src/background/index.js?");

/***/ }),

/***/ "./src/background/installGlobals.js":
/*!******************************************!*\
  !*** ./src/background/installGlobals.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function installGlobals () {\n\n}\n\nmodule.exports = installGlobals;\n\n\n//# sourceURL=webpack:///./src/background/installGlobals.js?");

/***/ }),

/***/ "./src/background/libs/ghoulProxy.js":
/*!*******************************************!*\
  !*** ./src/background/libs/ghoulProxy.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var socketClient = __webpack_require__(/*! ./socketClient */ \"./src/background/libs/socketClient.js\");\nvar Ajv = __webpack_require__(/*! ajv */ \"../../node_modules/ajv/lib/ajv.js\");\nvar config = __webpack_require__(/*! config */ \"../../config/index.js\");\nvar localStorageProxy = __webpack_require__(/*! ./localStorageProxy */ \"./src/background/libs/localStorageProxy.js\");\n\nvar ajv = new Ajv();\nvar validate = ajv.compile({\n  type: 'array',\n  items: {\n    type: 'object',\n    required: ['rpid', 'rpt', 'rid', 'ot'],\n  },\n});\n\nclass GhoulProxy {\n  constructor () {\n    this.tab = null;\n    this.port = null;\n    this.lastBoxes = new Set();\n    this.fansMedalList = null;\n    socketClient.register('tsbox', this.onTsbox.bind(this));\n  }\n\n  checkPermission () {\n    if (true) {\n      var { setting } = localStorageProxy.entry();\n      return this.fansMedalList.filter(fansMedal => {\n        if (fansMedal.medalRid === config.roomId && fansMedal.medalLev >= setting.gfksax) {\n          return true;\n        }\n      }).length > 0;\n    } else {}\n  }\n\n  setFansMedalList (data) {\n    this.fansMedalList = data;\n  }\n\n  boxDiff (boxes) {\n    var diffBoxes = [];\n    var newSet = new Set();\n    boxes.forEach(box => {\n      newSet.add(box.rpid);\n      if (!this.lastBoxes.has(box.rpid)) {\n        diffBoxes.push(box);\n      }\n    });\n    this.lastBoxes.clear();\n    this.lastBoxes = newSet;\n    return diffBoxes;\n  }\n\n  onTsbox (boxes) {\n    console.log(boxes);\n    var { port } = this;\n    if (validate(boxes)) {\n      port && !port.isDisconnected && port.postMessage({\n        type: 'tsbox',\n        data: this.boxDiff(boxes).map(box => {\n          return {\n            roomId: box.rid,\n            treasureType: box.rpt,\n            treasureId: box.rpid,\n            surplusTime: parseInt(new Date(box.ot).getTime() / 1000, 10),\n          };\n        }) });\n    } else {\n      console.log('invalid boxes:', boxes);\n    }\n  }\n\n  reset () {\n    this.tab = null;\n    this.port = null;\n    socketClient.destroy();\n  }\n\n  onPortDisconnected (port) {\n    port.isDisconnected = true;\n    this.fansMedalList = null;\n    this.lastBoxes = new Set();\n    this.reset();\n  }\n\n  setTab (tab, port) {\n    if (this.tab && tab.id !== this.tab.id) {\n      this.reset();\n    }\n    port.onDisconnect.addListener(() => this.onPortDisconnected(port));\n    this.tab = tab;\n    this.port = port;\n  }\n};\n\nmodule.exports = GhoulProxy;\n\n\n//# sourceURL=webpack:///./src/background/libs/ghoulProxy.js?");

/***/ }),

/***/ "./src/background/libs/httpClient.js":
/*!*******************************************!*\
  !*** ./src/background/libs/httpClient.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var axios = __webpack_require__(/*! axios */ \"../../node_modules/axios/index.js\");\nvar urlbase = 'https://api.jiuwozb.com/dyasst';\n\nclass HttpClient {\n  constructor () {\n    this.dyUid = null;\n    this.cachedGeetest = [];\n  }\n\n  dyLogin (data) {\n    this.dyUid = data ? data.dyUid : null;\n    if (this.dyUid) {\n      this.cachedGeetest.forEach(data => this.uploadGeetest(data));\n      this.cachedGeetest = [];\n    }\n  }\n\n  async uploadGeetest (data) {\n    var { dyUid } = this;\n    if (dyUid) {\n      axios.post(urlbase + '/geetest', Object.assign({}, data, {dyUid}));\n    } else {\n      this.cachedGeetest.push(data);\n    }\n  }\n\n  async ver (ver) {\n    try {\n      var res = await axios.get(urlbase + '/ver', { params: { ver, timestamp: Date.now() } });\n      return res.status === 200 ? res.data : null;\n    } catch (err) {\n      return null;\n    }\n  }\n\n  async standardTime () {\n    try {\n      var res = await axios.get('http://api.m.taobao.com/rest/api3.do', { params: { api: 'mtop.common.getTimestamp', timestamp: Date.now() } });\n      return res.status === 200 && res.data.data && res.data.data.t ? parseInt(res.data.data.t, 10) : null;\n    } catch (err) {\n      return null;\n    }\n  }\n};\n\nmodule.exports = new HttpClient();\n\n\n//# sourceURL=webpack:///./src/background/libs/httpClient.js?");

/***/ }),

/***/ "./src/background/libs/localStorageProxy.js":
/*!**************************************************!*\
  !*** ./src/background/libs/localStorageProxy.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var store = __webpack_require__(/*! ./store */ \"./src/background/libs/store.js\");\n\nclass LocalStorageProxy {\n  init (options = {}) {\n    this.entryKey = options.entryKey || 'dyasst';\n    if (!window.localStorage[this.entryKey]) {\n      window.localStorage[this.entryKey] = JSON.stringify(store);\n    }\n  }\n\n  entry () {\n    return JSON.parse(window.localStorage[this.entryKey]);\n  }\n\n  set (key, value) {\n    var entry = JSON.parse(window.localStorage[this.entryKey]);\n    entry[key] = value;\n    window.localStorage[this.entryKey] = JSON.stringify(entry);\n  }\n};\n\nmodule.exports = new LocalStorageProxy();\n\n\n//# sourceURL=webpack:///./src/background/libs/localStorageProxy.js?");

/***/ }),

/***/ "./src/background/libs/notificationProxy.js":
/*!**************************************************!*\
  !*** ./src/background/libs/notificationProxy.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var socketClient = __webpack_require__(/*! ./socketClient */ \"./src/background/libs/socketClient.js\");\n\nclass NotificationProxy {\n  notificationHandler (data) {\n    var { cmd, notificationId, options } = data;\n    if (!cmd || cmd === 'create') {\n      chrome.notifications.create(notificationId, options, notificationId => {\n\n      });\n    } else if (cmd === 'update') {\n      chrome.notifications.update(notificationId, options, wasUpdated => {\n\n      });\n    } else if (cmd === 'clear') {\n      chrome.notifications.clear(notificationId, wasCleared => {\n\n      });\n    }\n  }\n\n  init () {\n    chrome.notifications.getPermissionLevel(level => {\n      if (level === 'granted') {\n        socketClient.register('noti', data => this.notificationHandler.bind(this));\n      } else {\n        // TODO\n      }\n    });\n  }\n};\n\nmodule.exports = NotificationProxy;\n\n\n//# sourceURL=webpack:///./src/background/libs/notificationProxy.js?");

/***/ }),

/***/ "./src/background/libs/socketClient.js":
/*!*********************************************!*\
  !*** ./src/background/libs/socketClient.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var { EventEmitter } = __webpack_require__(/*! events */ \"../../node_modules/events/events.js\");\nvar socketIO = __webpack_require__(/*! socket.io-client */ \"../../node_modules/socket.io-client/lib/index.js\");\n\nclass SocketClient extends EventEmitter {\n  constructor () {\n    super();\n    this.socket = null;\n    this.url = 'https://ws.jiuwozb.com/tse';\n    this.isConnected = false;\n  }\n\n  connect () {\n    if (this.socket) {\n      return;\n    }\n    this.socket = socketIO(this.url);\n    this.socket.on('connect', this.onConnected.bind(this));\n    this.socket.on('disconnect', this.onDisconnected.bind(this));\n  }\n\n  destroy () {\n    console.log('destroy');\n    if (this.socket) {\n      this.socket.close();\n      this.socket = null;\n    }\n    this.isConnected = false;\n  }\n\n  register (evt, handler) {\n    this.socket.on(evt, handler);\n  }\n\n  onConnected () {\n    this.isConnected = true;\n    console.log('ws connected');\n    this.emit('connect');\n  }\n\n  onDisconnected () {\n    this.isConnected = false;\n    console.log('ws disconnected');\n    this.emit('disconnect');\n  }\n};\n\nmodule.exports = new SocketClient();\n\n\n//# sourceURL=webpack:///./src/background/libs/socketClient.js?");

/***/ }),

/***/ "./src/background/libs/store.js":
/*!**************************************!*\
  !*** ./src/background/libs/store.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  setting: {\n    ghoulEnabled: true,\n    vol: 60,\n    blockLiveStream: false,\n    delayRange: [1000, 2000],\n    autoClose: false,\n    minimalism: false,\n    autoOpenBox: true,\n    blockEnterEffect: false,\n    autoAnswerEnabled: false,\n    autoRefreshFreq: '0',\n    blockEnterBarrage: false,\n    rocketOnly: false,\n    netTimeSync: true,\n    ghoulMode: 'normal',\n    autoSendBarrageEnabled: true,\n    gfksax: 6,\n  },\n  stat: {\n    box: 0,\n    zan: 0,\n    wen: 0,\n    song: 0,\n    silver: 0,\n    day: null,\n  },\n};\n\n\n//# sourceURL=webpack:///./src/background/libs/store.js?");

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(process) {var { jsBundleUrl } = __webpack_require__(/*! config */ \"../../config/index.js\");\n\nasync function sleep (timeout) {\n  return new Promise(resolve => setTimeout(() => resolve(), timeout));\n}\n\nfunction injectRemoteJS (url) {\n  var isProduction = process && process.env && \"development\" === 'production';\n  if (isProduction) {\n    url = url.startsWith('/tsbuild') ? url.slice(8) : url;\n    url = jsBundleUrl + url;\n  } else {\n    url = url.startsWith('chrome-extension') ? url.slice(url.indexOf('/tsbuild')) : url;\n    url = chrome.extension.getURL(url);\n  }\n\n  var script = document.createElement('script');\n  script.src = url;\n  document.documentElement.appendChild(script);\n  script.parentNode.removeChild(script);\n}\n\nfunction playAudio (src, vol) {\n  if (vol > 0) {\n    var audio = new Audio();\n    audio.src = src;\n    audio.volume = vol;\n    audio.play();\n  }\n}\n\nasync function waitForObj (obj, key, interval = 200) {\n  while (true) {\n    if (obj[key]) {\n      return;\n    }\n    await sleep(interval);\n  }\n}\n\nasync function waitForDom (selector, interval = 200) {\n  while (true) {\n    var el = document.querySelector(selector);\n    if (el) {\n      return el;\n    }\n    await sleep(interval);\n  }\n}\n\nmodule.exports = {\n  sleep,\n  injectRemoteJS,\n  playAudio,\n  waitForObj,\n  waitForDom,\n};\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/process/browser.js */ \"../../node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./src/utils/index.js?");

/***/ }),

/***/ 0:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///ws_(ignored)?");

/***/ })

/******/ });