/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/content/yuba.js");
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

/***/ "./src/content/yuba.js":
/*!*****************************!*\
  !*** ./src/content/yuba.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var { key } = __webpack_require__(/*! config */ \"../../config/index.js\");\n\nvar done = false;\nwindow.postMessage({ source: 'backend_installed' }, '*');\nwindow.addEventListener('message', (evt) => {\n  if (evt.source === window && evt.data && evt.data.source === 'setting' && !done) {\n    done = true;\n    var setting = evt.data.data;\n    if (setting.key === key) {\n      setup(setting);\n    }\n  }\n});\n\nfunction setup (setting) {\n}\n\n\n//# sourceURL=webpack:///./src/content/yuba.js?");

/***/ })

/******/ });