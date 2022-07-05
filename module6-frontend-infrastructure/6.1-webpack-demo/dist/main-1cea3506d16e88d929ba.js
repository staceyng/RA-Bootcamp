/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/arrowFunction.js":
/*!******************************!*\
  !*** ./src/arrowFunction.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "arrow": function() { return /* binding */ arrow; }
/* harmony export */ });
const arrow = () => {
  return "arrow function example for babel polyfill";
};

/***/ }),

/***/ "./src/cat.js":
/*!********************!*\
  !*** ./src/cat.js ***!
  \********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cat": function() { return /* binding */ cat; }
/* harmony export */ });
let cat = "tom";

/***/ }),

/***/ "./src/mouse.js":
/*!**********************!*\
  !*** ./src/mouse.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mouse": function() { return /* binding */ mouse; }
/* harmony export */ });
let mouse = "jerry";

/***/ }),

/***/ "./node_modules/cat-names/index.js":
/*!*****************************************!*\
  !*** ./node_modules/cat-names/index.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


const uniqueRandomArray = __webpack_require__(/*! unique-random-array */ "./node_modules/unique-random-array/index.js");
const catNames = __webpack_require__(/*! ./cat-names.json */ "./node_modules/cat-names/cat-names.json");

exports.all = catNames;
exports.random = uniqueRandomArray(catNames);


/***/ }),

/***/ "./src/styles.scss":
/*!*************************!*\
  !*** ./src/styles.scss ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/unique-random-array/index.js":
/*!***************************************************!*\
  !*** ./node_modules/unique-random-array/index.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


const uniqueRandom = __webpack_require__(/*! unique-random */ "./node_modules/unique-random/index.js");

module.exports = array => {
	const random = uniqueRandom(0, array.length - 1);
	return () => array[random()];
};


/***/ }),

/***/ "./node_modules/unique-random/index.js":
/*!*********************************************!*\
  !*** ./node_modules/unique-random/index.js ***!
  \*********************************************/
/***/ (function(module) {



module.exports = (minimum, maximum) => {
	let previousValue;
	return function random() {
		const number = Math.floor(
			(Math.random() * (maximum - minimum + 1)) + minimum
		);
		previousValue = number === previousValue && minimum !== maximum ? random() : number;
		return previousValue;
	};
};


/***/ }),

/***/ "./node_modules/cat-names/cat-names.json":
/*!***********************************************!*\
  !*** ./node_modules/cat-names/cat-names.json ***!
  \***********************************************/
/***/ (function(module) {

module.exports = JSON.parse('["Abby","Angel","Annie","Baby","Bailey","Bandit","Bear","Bella","Bob","Boo","Boots","Bubba","Buddy","Buster","Cali","Callie","Casper","Charlie","Chester","Chloe","Cleo","Coco","Cookie","Cuddles","Daisy","Dusty","Felix","Fluffy","Garfield","George","Ginger","Gizmo","Gracie","Harley","Jack","Jasmine","Jasper","Kiki","Kitty","Leo","Lilly","Lily","Loki","Lola","Lucky","Lucy","Luna","Maggie","Max","Mia","Midnight","Milo","Mimi","Miss kitty","Missy","Misty","Mittens","Molly","Muffin","Nala","Oliver","Oreo","Oscar","Patches","Peanut","Pepper","Precious","Princess","Pumpkin","Rascal","Rocky","Sadie","Salem","Sam","Samantha","Sammy","Sasha","Sassy","Scooter","Shadow","Sheba","Simba","Simon","Smokey","Snickers","Snowball","Snuggles","Socks","Sophie","Spooky","Sugar","Tiger","Tigger","Tinkerbell","Toby","Trouble","Whiskers","Willow","Zoe","Zoey"]');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cat.js */ "./src/cat.js");
/* harmony import */ var _mouse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mouse.js */ "./src/mouse.js");
/* harmony import */ var cat_names__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cat-names */ "./node_modules/cat-names/index.js");
/* harmony import */ var _arrowFunction_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./arrowFunction.js */ "./src/arrowFunction.js");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles.scss */ "./src/styles.scss");

 // webpack import with npm modules

 // webpack import with babel

 // webpack import with css
// import "./main.css";
// webpack import with sass


console.log("This is from index.js");
console.log("This is imported from cat.js = ", _cat_js__WEBPACK_IMPORTED_MODULE_0__.cat);
console.log("This is imported from mouse.js = ", _mouse_js__WEBPACK_IMPORTED_MODULE_1__.mouse);
console.log("This is a random cat name from cat-names library = ", cat_names__WEBPACK_IMPORTED_MODULE_2__.random()); // running index.html will cause these printouts to appear in the web console
// the spread operator is a newer feature that is not compatible with older versions of certain browsers

const obj = {
  a: "apple",
  b: "buffalo"
};
const newObj = { ...obj,
  c: "cheetah"
};
console.log("6.1.3 webpack with babel - new obj with spread operator", newObj); // arrow function from babel polyfill

const arrowTest = (0,_arrowFunction_js__WEBPACK_IMPORTED_MODULE_3__.arrow)();
console.log("arrow function test with babel polyfill: ", arrowTest);
}();
/******/ })()
;