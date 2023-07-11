"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.logoutAction = exports.lmsSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  scorm12: {},
  scorm2004: {}
};
var lmsSlice = (0, _toolkit.createSlice)({
  name: "lms",
  initialState: initialState,
  reducers: {
    logoutAction: function logoutAction(state, action) {
      return _objectSpread({}, state);
    }
  }
}); // Action creators are generated for each case reducer function

exports.lmsSlice = lmsSlice;
var logoutAction = lmsSlice.actions.logoutAction;
exports.logoutAction = logoutAction;
var _default = lmsSlice.reducer;
exports["default"] = _default;