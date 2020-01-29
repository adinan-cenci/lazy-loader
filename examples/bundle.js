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
/******/ 	return __webpack_require__(__webpack_require__.s = "./examples/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/main.js":
/*!**************************!*\
  !*** ./examples/main.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const LazyLoader = __webpack_require__(/*! ../src/LazyLoader.js */ \"./src/LazyLoader.js\");\n\nwindow.lazy;\n\ndocument.addEventListener('DOMContentLoaded', () => \n{\n    window.lazy = new LazyLoader();\n});\n\n//# sourceURL=webpack:///./examples/main.js?");

/***/ }),

/***/ "./src/ElementLoader.js":
/*!******************************!*\
  !*** ./src/ElementLoader.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class ElementLoader \n{\n    constructor(element) \n    {\n        this.element    = element;\n        this.loaded     = false;\n        this.inProgress = false;\n\n        this.element.classList.add('is-set');\n    }\n\n    getSrc() \n    {\n        return this.element.getAttribute('data-src');\n    }\n\n    scroll() \n    {\n        if (this.loaded) {\n            return;\n        }\n\n        if (this.inProgress) {\n            return;\n        }\n\n        if (! this.isElementInView()) {\n            return;\n        }\n\n        this.inProgress = true;\n\n        this.beforeLoading().then( async () => \n        {\n            this.loaded     = true;\n            this.inProgress = false;\n            return this.load();\n\n        }).then( async () => \n        {\n            this.afterLoading();\n\n        });\n    }\n\n    beforeLoading() \n    {\n        this.element.classList.add('is-loading');\n\n        return new Promise( (success, fail) => \n        {\n            setTimeout( () => { success() }, 500);\n        });\n    }\n\n    load() \n    {\n        var src     = this.getSrc();\n\n        var promise = new Promise( (success, fail) => \n        {\n            this.element.onLoad = () => \n            {\n                succes();\n            }\n        });\n\n        this.element.setAttribute('src', src);\n\n        return promise;\n    }\n\n    afterLoading() \n    {\n        this.element.classList.remove('is-loading');\n        this.element.classList.add('is-loaded');\n    }\n\n    isElementInView() \n    {\n        var screenHeight, scrollTop, y, height;\n\n        screenHeight    = window.innerHeight;\n        scrollTop       = document.documentElement.scrollTop;\n        y               = this.element.offsetTop;\n        height          = this.element.offsetHeight;\n        \n        if (y > (scrollTop + screenHeight)) {\n            return false;\n        }\n\n        if (scrollTop > (y + height)) {\n            return false;\n        }\n\n        return true;\n    }\n}\n\nmodule.exports = ElementLoader;\n\n\n//# sourceURL=webpack:///./src/ElementLoader.js?");

/***/ }),

/***/ "./src/LazyLoader.js":
/*!***************************!*\
  !*** ./src/LazyLoader.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const ElementLoader = __webpack_require__(/*! ./ElementLoader.js */ \"./src/ElementLoader.js\");\n\nclass LazyLoader \n{\n    constructor() \n    {\n        this.loaders = [];\n        this.throtle = null;\n\n        window.addEventListener('scroll', this.scroll.bind(this));\n        this.scroll();\n    }\n\n    scroll() \n    {\n        if (this.throtle) {\n            return;\n        }\n\n        this.throtle = setTimeout( () => \n        { \n            this.throtle = null; \n        }, 100);\n\n        this.instantiateLoaders();\n\n        for (var l of this.loaders) {\n            l.scroll();\n        }\n    }\n\n    instantiateLoaders() \n    {\n        this.getElements().forEach( (el) => \n        {\n            this.loaders.push( new ElementLoader(el) );\n        });\n    }\n\n    getElements() \n    {\n        return document.querySelectorAll('.lazy-loading:not(.is-set)');\n    }\n}\n\nmodule.exports = LazyLoader;\n\n//# sourceURL=webpack:///./src/LazyLoader.js?");

/***/ })

/******/ });