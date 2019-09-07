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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Animation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
__webpack_require__(1);


$(document).ready(function () {
  _Animation_js__WEBPACK_IMPORTED_MODULE_0__["Animation"].displayTextAsync(_Animation_js__WEBPACK_IMPORTED_MODULE_0__["Intro"].greeting, $('.header'), 80);
  _Animation_js__WEBPACK_IMPORTED_MODULE_0__["Animation"].displayTextAsync(_Animation_js__WEBPACK_IMPORTED_MODULE_0__["Intro"].footer, $('.footer'), 100);
  _Animation_js__WEBPACK_IMPORTED_MODULE_0__["Animation"].displayTextWithDelay(_Animation_js__WEBPACK_IMPORTED_MODULE_0__["Intro"].leftText, $('.log-container-left'), 60, 3000);
  _Animation_js__WEBPACK_IMPORTED_MODULE_0__["Animation"].displayTextWithDelay(_Animation_js__WEBPACK_IMPORTED_MODULE_0__["Intro"].rightText, $('.log-container-right'), 60, 5500);
  _Animation_js__WEBPACK_IMPORTED_MODULE_0__["Animation"].setText($('#login'), "Login");
  _Animation_js__WEBPACK_IMPORTED_MODULE_0__["Animation"].setText($('#pass'), "Password");
});

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Intro", function() { return Intro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Animation", function() { return Animation; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Intro = {
  greeting: "Hi, nice to meet you !",
  footer: "All rights reserved " + new Date().getFullYear(),
  leftText: "I'm just wondering ... ",
  rightText: "Maybe we can talk ?"
};
Object.freeze(Intro);

var Animation =
/*#__PURE__*/
function () {
  function Animation() {
    _classCallCheck(this, Animation);
  }

  _createClass(Animation, null, [{
    key: "displayTextAsync",
    value: function displayTextAsync(text, element, spaceTime) {
      var i = 0;
      var timer = setInterval(function () {
        element.text(text.substr(0, i++));

        if (i == text.length + 1) {
          clearInterval(timer);
        }
      }, spaceTime);
    }
  }, {
    key: "displayTextWithDelay",
    value: function displayTextWithDelay(text, element, spaceTime, delay) {
      setTimeout(Animation.displayTextAsync, delay, text, element, spaceTime);
    }
  }, {
    key: "setText",
    value: function setText(object, text) {
      object.on({
        focus: function focus() {
          object.attr('placeholder', '');
        },
        blur: function blur() {
          object.attr('placeholder', text);
        }
      });
    }
  }]);

  return Animation;
}();



/***/ })

/******/ });
//# sourceMappingURL=app-bundle.js.map