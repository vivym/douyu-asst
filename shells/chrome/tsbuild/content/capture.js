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
/******/ 		"capture": 0
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
/******/ 	deferredModules.push(["./src/content/capture.js","vender"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../node_modules/buble-loader/index.js?!../../node_modules/cache-loader/dist/cjs.js?!../../node_modules/vue-loader/lib/index.js?!../../src/capture/App.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/viv/Proj/douyu-asst/node_modules/buble-loader??ref--0!/Users/viv/Proj/douyu-asst/node_modules/cache-loader/dist/cjs.js??ref--1-0!/Users/viv/Proj/douyu-asst/node_modules/vue-loader/lib??vue-loader-options!/Users/viv/Proj/douyu-asst/src/capture/App.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'dyasst-capture',\n});\n\n\n//# sourceURL=webpack:////Users/viv/Proj/douyu-asst/src/capture/App.vue?/Users/viv/Proj/douyu-asst/node_modules/buble-loader??ref--0!/Users/viv/Proj/douyu-asst/node_modules/cache-loader/dist/cjs.js??ref--1-0!/Users/viv/Proj/douyu-asst/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "../../node_modules/buble-loader/index.js?!../../node_modules/cache-loader/dist/cjs.js?!../../node_modules/vue-loader/lib/index.js?!../../src/capture/views/Home.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/viv/Proj/douyu-asst/node_modules/buble-loader??ref--0!/Users/viv/Proj/douyu-asst/node_modules/cache-loader/dist/cjs.js??ref--1-0!/Users/viv/Proj/douyu-asst/node_modules/vue-loader/lib??vue-loader-options!/Users/viv/Proj/douyu-asst/src/capture/views/Home.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  data: () => ({\n    show: false,\n    paused: false,\n    startTime: 3,\n    endTime: 15,\n  }),\n\n  computed: {\n    controlBtnIconUrl () {\n      return this.paused ? 'https://static.jiuwozb.com/assets/images/capture/icon_play.png' :\n        'https://static.jiuwozb.com/assets/images/capture/icon_pause.png';\n    },\n  },\n\n  mounted () {\n    window.dyasstShowCapturePanel = (data, show) => {\n      this.show = show === undefined ? !this.show : show;\n      if (this.show) {\n        var videoEl = this.$refs.inputVideo;\n        videoEl.src = URL.createObjectURL(new Blob(data));\n        videoEl.play();\n        /*\n        const mediaSource = new MediaSource();\n        videoEl.src = URL.createObjectURL(mediaSource);\n        mediaSource.addEventListener('sourceopen', () => {\n          const mime = 'video/webm; codecs=vp9';\n          const sourceBuffer = mediaSource.addSourceBuffer(mime);\n          const videoReader = new FileReader();\n          videoReader.addEventListener('loadend', e => {\n            console.log('loadend');\n            sourceBuffer.appendBuffer(e.srcElement.result);\n            sourceBuffer.addEventListener('updateend', () => {\n              console.log('updateend');\n              videoEl.play();\n            });\n          });\n          videoReader.readAsArrayBuffer(new Blob(data));\n        });\n        */\n      }\n    };\n    window.updateVideo = (data) => {\n      var videoEl = this.$refs.video;\n      videoEl.src = URL.createObjectURL(data);\n      videoEl.play();\n      /*\n      const mediaSource = new MediaSource();\n      videoEl.src = URL.createObjectURL(mediaSource);\n      mediaSource.addEventListener('sourceopen', () => {\n        console.log('here');\n        const mime = 'video/webm; codecs=vp8';\n        const sourceBuffer = mediaSource.addSourceBuffer(mime);\n        const videoReader = new FileReader();\n        videoReader.addEventListener('loadend', e => {\n          sourceBuffer.appendBuffer(e.srcElement.result);\n        });\n        videoReader.readAsArrayBuffer(data);\n      });\n      */\n    };\n  },\n\n  methods: {\n    close () {\n      this.show = false;\n    },\n    pause () {\n      this.paused = !this.paused;\n    },\n  },\n});\n\n\n//# sourceURL=webpack:////Users/viv/Proj/douyu-asst/src/capture/views/Home.vue?/Users/viv/Proj/douyu-asst/node_modules/buble-loader??ref--0!/Users/viv/Proj/douyu-asst/node_modules/cache-loader/dist/cjs.js??ref--1-0!/Users/viv/Proj/douyu-asst/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\".cache/vue-loader\",\"cacheIdentifier\":\"8575ac2a-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/cache-loader/dist/cjs.js?!../../node_modules/vue-loader/lib/index.js?!../../src/capture/App.vue?vue&type=template&id=2897f06f&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/viv/Proj/douyu-asst/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":".cache/vue-loader","cacheIdentifier":"8575ac2a-vue-loader-template"}!/Users/viv/Proj/douyu-asst/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/Users/viv/Proj/douyu-asst/node_modules/cache-loader/dist/cjs.js??ref--1-0!/Users/viv/Proj/douyu-asst/node_modules/vue-loader/lib??vue-loader-options!/Users/viv/Proj/douyu-asst/src/capture/App.vue?vue&type=template&id=2897f06f&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    { attrs: { id: \"dyasst-capture\" } },\n    [_c(\"router-view\", { staticClass: \"r-box\" })],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:////Users/viv/Proj/douyu-asst/src/capture/App.vue?/Users/viv/Proj/douyu-asst/node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22.cache/vue-loader%22,%22cacheIdentifier%22:%228575ac2a-vue-loader-template%22%7D!/Users/viv/Proj/douyu-asst/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/Users/viv/Proj/douyu-asst/node_modules/cache-loader/dist/cjs.js??ref--1-0!/Users/viv/Proj/douyu-asst/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\".cache/vue-loader\",\"cacheIdentifier\":\"8575ac2a-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/cache-loader/dist/cjs.js?!../../node_modules/vue-loader/lib/index.js?!../../src/capture/views/Home.vue?vue&type=template&id=558c1582&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/viv/Proj/douyu-asst/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":".cache/vue-loader","cacheIdentifier":"8575ac2a-vue-loader-template"}!/Users/viv/Proj/douyu-asst/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/Users/viv/Proj/douyu-asst/node_modules/cache-loader/dist/cjs.js??ref--1-0!/Users/viv/Proj/douyu-asst/node_modules/vue-loader/lib??vue-loader-options!/Users/viv/Proj/douyu-asst/src/capture/views/Home.vue?vue&type=template&id=558c1582&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", { class: [\"home-wrapper\", _vm.show ? \"\" : \"hidden\"] }, [\n    _c(\"div\", { staticClass: \"panel-wrapper\" }, [\n      _c(\"img\", {\n        staticClass: \"close-btn\",\n        attrs: {\n          src: \"https://static.jiuwozb.com/assets/images/capture/icon_close.png\"\n        },\n        on: { click: _vm.close }\n      }),\n      _c(\n        \"div\",\n        { staticClass: \"input-panel\" },\n        [\n          _c(\n            \"el-row\",\n            [_c(\"el-col\", { staticClass: \"title\" }, [_vm._v(\"原始视图\")])],\n            1\n          ),\n          _c(\"video\", { ref: \"inputVideo\", attrs: { controls: \"\" } }),\n          _c(\"div\", { staticClass: \"controls\" }, [\n            _c(\"img\", {\n              staticClass: \"control-btn\",\n              attrs: { src: _vm.controlBtnIconUrl },\n              on: { click: _vm.pause }\n            })\n          ]),\n          _vm._m(0)\n        ],\n        1\n      ),\n      _c(\n        \"div\",\n        { staticClass: \"output-panel\" },\n        [\n          _c(\n            \"el-row\",\n            [_c(\"el-col\", { staticClass: \"title\" }, [_vm._v(\"预览视图\")])],\n            1\n          ),\n          _c(\"video\", { staticClass: \"previewVideo\" }),\n          _c(\"div\", {})\n        ],\n        1\n      )\n    ])\n  ])\n}\nvar staticRenderFns = [\n  function() {\n    var _vm = this\n    var _h = _vm.$createElement\n    var _c = _vm._self._c || _h\n    return _c(\"div\", { staticClass: \"info-panel\" }, [\n      _c(\"div\", { staticClass: \"col\" }, [\n        _c(\"i\", [_vm._v(\"开始时间\")]),\n        _c(\"div\", { staticClass: \"time-input\" }, [_vm._v(\"00:03\")])\n      ]),\n      _c(\"div\", { staticClass: \"col\" }, [\n        _c(\"i\", [_vm._v(\"结束时间\")]),\n        _c(\"div\", { staticClass: \"time-input\" }, [_vm._v(\"00:15\")])\n      ]),\n      _c(\"div\", { staticClass: \"col\" }, [\n        _c(\"i\", [_vm._v(\"截取长度\")]),\n        _c(\"div\", { staticClass: \"time-input red\" }, [_vm._v(\"00:12\")])\n      ])\n    ])\n  }\n]\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:////Users/viv/Proj/douyu-asst/src/capture/views/Home.vue?/Users/viv/Proj/douyu-asst/node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22.cache/vue-loader%22,%22cacheIdentifier%22:%228575ac2a-vue-loader-template%22%7D!/Users/viv/Proj/douyu-asst/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/Users/viv/Proj/douyu-asst/node_modules/cache-loader/dist/cjs.js??ref--1-0!/Users/viv/Proj/douyu-asst/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js?!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src/index.js?!../../node_modules/cache-loader/dist/cjs.js?!../../node_modules/vue-loader/lib/index.js?!../../src/capture/App.vue?vue&type=style&index=0&id=2897f06f&scoped=true&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/viv/Proj/douyu-asst/node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!/Users/viv/Proj/douyu-asst/node_modules/vue-loader/lib/loaders/stylePostLoader.js!/Users/viv/Proj/douyu-asst/node_modules/postcss-loader/src??ref--7-oneOf-1-2!/Users/viv/Proj/douyu-asst/node_modules/cache-loader/dist/cjs.js??ref--1-0!/Users/viv/Proj/douyu-asst/node_modules/vue-loader/lib??vue-loader-options!/Users/viv/Proj/douyu-asst/src/capture/App.vue?vue&type=style&index=0&id=2897f06f&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"../../node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"\\n#dyasst-capture[data-v-2897f06f] {\\n  position: fixed;\\n  top: 0;\\n  bottom: 0;\\n  left: 0;\\n  right: 0;\\n  display: flex;\\n  z-index: 3000;\\n  pointer-events: none;\\n  box-sizing: border-box;\\n}\\n.r-box[data-v-2897f06f] {\\n  display: flex;\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:////Users/viv/Proj/douyu-asst/src/capture/App.vue?/Users/viv/Proj/douyu-asst/node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!/Users/viv/Proj/douyu-asst/node_modules/vue-loader/lib/loaders/stylePostLoader.js!/Users/viv/Proj/douyu-asst/node_modules/postcss-loader/src??ref--7-oneOf-1-2!/Users/viv/Proj/douyu-asst/node_modules/cache-loader/dist/cjs.js??ref--1-0!/Users/viv/Proj/douyu-asst/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js?!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src/index.js?!../../node_modules/cache-loader/dist/cjs.js?!../../node_modules/vue-loader/lib/index.js?!../../src/capture/views/Home.vue?vue&type=style&index=0&id=558c1582&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/viv/Proj/douyu-asst/node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!/Users/viv/Proj/douyu-asst/node_modules/vue-loader/lib/loaders/stylePostLoader.js!/Users/viv/Proj/douyu-asst/node_modules/postcss-loader/src??ref--7-oneOf-1-2!/Users/viv/Proj/douyu-asst/node_modules/cache-loader/dist/cjs.js??ref--1-0!/Users/viv/Proj/douyu-asst/node_modules/vue-loader/lib??vue-loader-options!/Users/viv/Proj/douyu-asst/src/capture/views/Home.vue?vue&type=style&index=0&id=558c1582&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"../../node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"\\n.home-wrapper[data-v-558c1582] {\\n  background-color: rgba(0, 0, 0, .6);\\n  position: absolute;\\n  top: 0;\\n  bottom: 0;\\n  left: 0;\\n  right: 0;\\n}\\n.panel-wrapper[data-v-558c1582] {\\n  position: absolute;\\n  left: 50%;\\n  top: 50%;\\n  margin-left: -350px;\\n  margin-top: -205px;\\n  width: 700px;\\n  height: 410px;\\n  background-color: white;\\n  z-index: 10;\\n  pointer-events: all;\\n  display: flex;\\n  flex-direction: row;\\n  padding: 33px 20px 20px 20px;\\n  box-sizing: border-box;\\n}\\n.hidden[data-v-558c1582] {\\n  visibility: hidden;\\n}\\n.video-src[data-v-558c1582] {\\n  width: 400px;\\n  height: 300px;\\n}\\n.close-btn[data-v-558c1582] {\\n  width: 30px;\\n  height: 30px;\\n  position: absolute;\\n  right: -40px;\\n  top: 13px;\\n}\\n.close-btn[data-v-558c1582]:hover {\\n  cursor: pointer;\\n}\\n.input-panel[data-v-558c1582] {\\n  flex-direction: column;\\n  align-items: stretch;\\n}\\n.input-panel .title[data-v-558c1582] {\\n  font-size: 16px;\\n  line-height: 22px;\\n}\\n.input-panel video[data-v-558c1582] {\\n  width: 400px;\\n  height: 225px;\\n  background-color: black;\\n  margin-top: 10px;\\n}\\n.output-panel[data-v-558c1582] {\\n  margin-left: 35px;\\n}\\n.output-panel .title[data-v-558c1582] {\\n  font-size: 16px;\\n  line-height: 22px;\\n}\\n.controls[data-v-558c1582] {\\n  margin-top: 5px;\\n  flex-direction: row;\\n}\\n.control-btn[data-v-558c1582] {\\n  width: 16px;\\n  height: 16px;\\n}\\n.info-panel[data-v-558c1582] {\\n  display: flex;\\n  margin-top: 23px;\\n  flex-direction: row;\\n  justify-content: space-between;\\n}\\n.info-panel i[data-v-558c1582] {\\n  color: #888888;\\n  font-size: 14px;\\n  line-height: 20px;\\n}\\n.info-panel .col[data-v-558c1582] {\\n  display: flex;\\n  flex-direction: row;\\n}\\n.time-input[data-v-558c1582] {\\n  color: #888888;\\n  background-color: #f4f4f4;\\n  width: 60px;\\n  height: 20px;\\n  border-radius: 10px;\\n  text-align: center;\\n  line-height: 20px;\\n  margin-left: 5px;\\n  font-size: 14px;\\n}\\n.time-input.red[data-v-558c1582] {\\n  color: #E04E4F;\\n}\\n.output-panel video[data-v-558c1582] {\\n  width: 225px;\\n  height: 225px;\\n  background-color: black;\\n  margin-top: 10px;\\n}\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:////Users/viv/Proj/douyu-asst/src/capture/views/Home.vue?/Users/viv/Proj/douyu-asst/node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!/Users/viv/Proj/douyu-asst/node_modules/vue-loader/lib/loaders/stylePostLoader.js!/Users/viv/Proj/douyu-asst/node_modules/postcss-loader/src??ref--7-oneOf-1-2!/Users/viv/Proj/douyu-asst/node_modules/cache-loader/dist/cjs.js??ref--1-0!/Users/viv/Proj/douyu-asst/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "../../node_modules/vue-style-loader/index.js?!../../node_modules/css-loader/dist/cjs.js?!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src/index.js?!../../node_modules/cache-loader/dist/cjs.js?!../../node_modules/vue-loader/lib/index.js?!../../src/capture/App.vue?vue&type=style&index=0&id=2897f06f&scoped=true&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/viv/Proj/douyu-asst/node_modules/vue-style-loader??ref--7-oneOf-1-0!/Users/viv/Proj/douyu-asst/node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!/Users/viv/Proj/douyu-asst/node_modules/vue-loader/lib/loaders/stylePostLoader.js!/Users/viv/Proj/douyu-asst/node_modules/postcss-loader/src??ref--7-oneOf-1-2!/Users/viv/Proj/douyu-asst/node_modules/cache-loader/dist/cjs.js??ref--1-0!/Users/viv/Proj/douyu-asst/node_modules/vue-loader/lib??vue-loader-options!/Users/viv/Proj/douyu-asst/src/capture/App.vue?vue&type=style&index=0&id=2897f06f&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--7-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&id=2897f06f&scoped=true&lang=css& */ \"../../node_modules/css-loader/dist/cjs.js?!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src/index.js?!../../node_modules/cache-loader/dist/cjs.js?!../../node_modules/vue-loader/lib/index.js?!../../src/capture/App.vue?vue&type=style&index=0&id=2897f06f&scoped=true&lang=css&\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"../../node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"7b0433b6\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:////Users/viv/Proj/douyu-asst/src/capture/App.vue?/Users/viv/Proj/douyu-asst/node_modules/vue-style-loader??ref--7-oneOf-1-0!/Users/viv/Proj/douyu-asst/node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!/Users/viv/Proj/douyu-asst/node_modules/vue-loader/lib/loaders/stylePostLoader.js!/Users/viv/Proj/douyu-asst/node_modules/postcss-loader/src??ref--7-oneOf-1-2!/Users/viv/Proj/douyu-asst/node_modules/cache-loader/dist/cjs.js??ref--1-0!/Users/viv/Proj/douyu-asst/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "../../node_modules/vue-style-loader/index.js?!../../node_modules/css-loader/dist/cjs.js?!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src/index.js?!../../node_modules/cache-loader/dist/cjs.js?!../../node_modules/vue-loader/lib/index.js?!../../src/capture/views/Home.vue?vue&type=style&index=0&id=558c1582&scoped=true&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/viv/Proj/douyu-asst/node_modules/vue-style-loader??ref--7-oneOf-1-0!/Users/viv/Proj/douyu-asst/node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!/Users/viv/Proj/douyu-asst/node_modules/vue-loader/lib/loaders/stylePostLoader.js!/Users/viv/Proj/douyu-asst/node_modules/postcss-loader/src??ref--7-oneOf-1-2!/Users/viv/Proj/douyu-asst/node_modules/cache-loader/dist/cjs.js??ref--1-0!/Users/viv/Proj/douyu-asst/node_modules/vue-loader/lib??vue-loader-options!/Users/viv/Proj/douyu-asst/src/capture/views/Home.vue?vue&type=style&index=0&id=558c1582&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--7-oneOf-1-2!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=style&index=0&id=558c1582&scoped=true&lang=css& */ \"../../node_modules/css-loader/dist/cjs.js?!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src/index.js?!../../node_modules/cache-loader/dist/cjs.js?!../../node_modules/vue-loader/lib/index.js?!../../src/capture/views/Home.vue?vue&type=style&index=0&id=558c1582&scoped=true&lang=css&\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"../../node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"72108394\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:////Users/viv/Proj/douyu-asst/src/capture/views/Home.vue?/Users/viv/Proj/douyu-asst/node_modules/vue-style-loader??ref--7-oneOf-1-0!/Users/viv/Proj/douyu-asst/node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!/Users/viv/Proj/douyu-asst/node_modules/vue-loader/lib/loaders/stylePostLoader.js!/Users/viv/Proj/douyu-asst/node_modules/postcss-loader/src??ref--7-oneOf-1-2!/Users/viv/Proj/douyu-asst/node_modules/cache-loader/dist/cjs.js??ref--1-0!/Users/viv/Proj/douyu-asst/node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "../../src/capture/App.vue":
/*!******************************************************!*\
  !*** /Users/viv/Proj/douyu-asst/src/capture/App.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App_vue_vue_type_template_id_2897f06f_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=2897f06f&scoped=true& */ \"../../src/capture/App.vue?vue&type=template&id=2897f06f&scoped=true&\");\n/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ \"../../src/capture/App.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _App_vue_vue_type_style_index_0_id_2897f06f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&id=2897f06f&scoped=true&lang=css& */ \"../../src/capture/App.vue?vue&type=style&index=0&id=2897f06f&scoped=true&lang=css&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"../../node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _App_vue_vue_type_template_id_2897f06f_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _App_vue_vue_type_template_id_2897f06f_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"2897f06f\",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/capture/App.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:////Users/viv/Proj/douyu-asst/src/capture/App.vue?");

/***/ }),

/***/ "../../src/capture/App.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** /Users/viv/Proj/douyu-asst/src/capture/App.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_buble_loader_index_js_ref_0_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/buble-loader??ref--0!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=js& */ \"../../node_modules/buble-loader/index.js?!../../node_modules/cache-loader/dist/cjs.js?!../../node_modules/vue-loader/lib/index.js?!../../src/capture/App.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_buble_loader_index_js_ref_0_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:////Users/viv/Proj/douyu-asst/src/capture/App.vue?");

/***/ }),

/***/ "../../src/capture/App.vue?vue&type=style&index=0&id=2897f06f&scoped=true&lang=css&":
/*!***************************************************************************************************************!*\
  !*** /Users/viv/Proj/douyu-asst/src/capture/App.vue?vue&type=style&index=0&id=2897f06f&scoped=true&lang=css& ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_2897f06f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--7-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--7-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&id=2897f06f&scoped=true&lang=css& */ \"../../node_modules/vue-style-loader/index.js?!../../node_modules/css-loader/dist/cjs.js?!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src/index.js?!../../node_modules/cache-loader/dist/cjs.js?!../../node_modules/vue-loader/lib/index.js?!../../src/capture/App.vue?vue&type=style&index=0&id=2897f06f&scoped=true&lang=css&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_2897f06f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_2897f06f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_2897f06f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_2897f06f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_2897f06f_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=webpack:////Users/viv/Proj/douyu-asst/src/capture/App.vue?");

/***/ }),

/***/ "../../src/capture/App.vue?vue&type=template&id=2897f06f&scoped=true&":
/*!*************************************************************************************************!*\
  !*** /Users/viv/Proj/douyu-asst/src/capture/App.vue?vue&type=template&id=2897f06f&scoped=true& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cache_loader_cacheDirectory_cache_vue_loader_cacheIdentifier_8575ac2a_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_2897f06f_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!cache-loader?{\"cacheDirectory\":\".cache/vue-loader\",\"cacheIdentifier\":\"8575ac2a-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=template&id=2897f06f&scoped=true& */ \"../../node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\".cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"8575ac2a-vue-loader-template\\\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/cache-loader/dist/cjs.js?!../../node_modules/vue-loader/lib/index.js?!../../src/capture/App.vue?vue&type=template&id=2897f06f&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _cache_loader_cacheDirectory_cache_vue_loader_cacheIdentifier_8575ac2a_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_2897f06f_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _cache_loader_cacheDirectory_cache_vue_loader_cacheIdentifier_8575ac2a_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_2897f06f_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:////Users/viv/Proj/douyu-asst/src/capture/App.vue?");

/***/ }),

/***/ "../../src/capture/index.js":
/*!*******************************************************!*\
  !*** /Users/viv/Proj/douyu-asst/src/capture/index.js ***!
  \*******************************************************/
/*! exports provided: initApp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initApp\", function() { return initApp; });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"../../node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var element_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! element-ui */ \"../../node_modules/element-ui/lib/element-ui.common.js\");\n/* harmony import */ var element_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(element_ui__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var element_ui_lib_theme_chalk_index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! element-ui/lib/theme-chalk/index.css */ \"../../node_modules/element-ui/lib/theme-chalk/index.css\");\n/* harmony import */ var element_ui_lib_theme_chalk_index_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(element_ui_lib_theme_chalk_index_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-router */ \"../../node_modules/vue-router/dist/vue-router.esm.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./App.vue */ \"../../src/capture/App.vue\");\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./router */ \"../../src/capture/router.js\");\n\n\n\n\n\n\n// import store from './store';\n\nvar app = null; // eslint-disable-line\n\nfunction initApp (shell) {\n  vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(element_ui__WEBPACK_IMPORTED_MODULE_1___default.a);\n  vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(vue_router__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\n\n  var RouterConfig = {\n    routes: _router__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n  };\n  var router = new vue_router__WEBPACK_IMPORTED_MODULE_3__[\"default\"](RouterConfig);\n\n  vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].mixin(shell.mixin);\n  app = new vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n    router: router,\n    extends: _App_vue__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n    // store,\n  }).$mount('#dyasst-capture');\n}\n\n\n//# sourceURL=webpack:////Users/viv/Proj/douyu-asst/src/capture/index.js?");

/***/ }),

/***/ "../../src/capture/router.js":
/*!********************************************************!*\
  !*** /Users/viv/Proj/douyu-asst/src/capture/router.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _views_Home_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./views/Home.vue */ \"../../src/capture/views/Home.vue\");\n\n\nvar routers = [\n  { path: '/', component: _views_Home_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"] },\n];\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (routers);\n\n\n//# sourceURL=webpack:////Users/viv/Proj/douyu-asst/src/capture/router.js?");

/***/ }),

/***/ "../../src/capture/views/Home.vue":
/*!*************************************************************!*\
  !*** /Users/viv/Proj/douyu-asst/src/capture/views/Home.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Home_vue_vue_type_template_id_558c1582_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Home.vue?vue&type=template&id=558c1582&scoped=true& */ \"../../src/capture/views/Home.vue?vue&type=template&id=558c1582&scoped=true&\");\n/* harmony import */ var _Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Home.vue?vue&type=script&lang=js& */ \"../../src/capture/views/Home.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _Home_vue_vue_type_style_index_0_id_558c1582_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Home.vue?vue&type=style&index=0&id=558c1582&scoped=true&lang=css& */ \"../../src/capture/views/Home.vue?vue&type=style&index=0&id=558c1582&scoped=true&lang=css&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"../../node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _Home_vue_vue_type_template_id_558c1582_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Home_vue_vue_type_template_id_558c1582_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"558c1582\",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/capture/views/Home.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:////Users/viv/Proj/douyu-asst/src/capture/views/Home.vue?");

/***/ }),

/***/ "../../src/capture/views/Home.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** /Users/viv/Proj/douyu-asst/src/capture/views/Home.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_buble_loader_index_js_ref_0_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/buble-loader??ref--0!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=script&lang=js& */ \"../../node_modules/buble-loader/index.js?!../../node_modules/cache-loader/dist/cjs.js?!../../node_modules/vue-loader/lib/index.js?!../../src/capture/views/Home.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_buble_loader_index_js_ref_0_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:////Users/viv/Proj/douyu-asst/src/capture/views/Home.vue?");

/***/ }),

/***/ "../../src/capture/views/Home.vue?vue&type=style&index=0&id=558c1582&scoped=true&lang=css&":
/*!**********************************************************************************************************************!*\
  !*** /Users/viv/Proj/douyu-asst/src/capture/views/Home.vue?vue&type=style&index=0&id=558c1582&scoped=true&lang=css& ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_id_558c1582_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader??ref--7-oneOf-1-0!../../../node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--7-oneOf-1-2!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=style&index=0&id=558c1582&scoped=true&lang=css& */ \"../../node_modules/vue-style-loader/index.js?!../../node_modules/css-loader/dist/cjs.js?!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src/index.js?!../../node_modules/cache-loader/dist/cjs.js?!../../node_modules/vue-loader/lib/index.js?!../../src/capture/views/Home.vue?vue&type=style&index=0&id=558c1582&scoped=true&lang=css&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_id_558c1582_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_id_558c1582_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_id_558c1582_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_id_558c1582_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_id_558c1582_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=webpack:////Users/viv/Proj/douyu-asst/src/capture/views/Home.vue?");

/***/ }),

/***/ "../../src/capture/views/Home.vue?vue&type=template&id=558c1582&scoped=true&":
/*!********************************************************************************************************!*\
  !*** /Users/viv/Proj/douyu-asst/src/capture/views/Home.vue?vue&type=template&id=558c1582&scoped=true& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cache_loader_cacheDirectory_cache_vue_loader_cacheIdentifier_8575ac2a_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_558c1582_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!cache-loader?{\"cacheDirectory\":\".cache/vue-loader\",\"cacheIdentifier\":\"8575ac2a-vue-loader-template\"}!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=template&id=558c1582&scoped=true& */ \"../../node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\".cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"8575ac2a-vue-loader-template\\\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js?!../../node_modules/cache-loader/dist/cjs.js?!../../node_modules/vue-loader/lib/index.js?!../../src/capture/views/Home.vue?vue&type=template&id=558c1582&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _cache_loader_cacheDirectory_cache_vue_loader_cacheIdentifier_8575ac2a_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_558c1582_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _cache_loader_cacheDirectory_cache_vue_loader_cacheIdentifier_8575ac2a_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_558c1582_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:////Users/viv/Proj/douyu-asst/src/capture/views/Home.vue?");

/***/ }),

/***/ "./src/content/capture.js":
/*!********************************!*\
  !*** ./src/content/capture.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var src_capture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/capture */ \"../../src/capture/index.js\");\n\n\nObject(src_capture__WEBPACK_IMPORTED_MODULE_0__[\"initApp\"])({\n  mixin: {\n    methods: {\n    },\n  },\n});\n\n\n//# sourceURL=webpack:///./src/content/capture.js?");

/***/ })

/******/ });