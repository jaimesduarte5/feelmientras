"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.clearConfirmation = exports.showConfirmation = exports.closeToast = exports.showToast = exports.fullLoadingOff = exports.fullLoadingOn = exports.alertSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  Loading: false,
  toast: {
    type: "success",
    title: "esta monduw",
    msj: "Todo bien Amiguito esta vuelta funciona del putas ",
    show: false,
    duration: 4000
  },
  confirmation: {
    show: false,
    title: "Action Validation",
    msj: " Are you sure you want to perform this process?",
    data: [],
    tag: ""
  }
};
var alertSlice = (0, _toolkit.createSlice)({
  name: "alerts",
  initialState: initialState,
  reducers: {
    fullLoadingOn: function fullLoadingOn(state) {
      return _objectSpread({}, state, {
        loading: true
      });
    },
    fullLoadingOff: function fullLoadingOff(state, action) {
      return _objectSpread({}, state, {
        loading: false
      });
    },
    showToast: function showToast(state, action) {
      return _objectSpread({}, state, {
        toast: action.payload
      });
    },
    closeToast: function closeToast(state, action) {
      return _objectSpread({}, state, {
        toast: initialState.toast
      });
    },
    showConfirmation: function showConfirmation(state, action) {
      return _objectSpread({}, state, {
        confirmation: _objectSpread({}, state.confirmation, {
          show: true,
          title: action.payload.title,
          msj: action.payload.msj,
          data: action.payload.data,
          tag: action.payload.tag
        })
      });
    },
    clearConfirmation: function clearConfirmation(state) {
      return _objectSpread({}, state, {
        confirmation: initialState.confirmation
      });
    }
  }
}); // Action creators are generated for each case reducer function

exports.alertSlice = alertSlice;
var _alertSlice$actions = alertSlice.actions,
    fullLoadingOn = _alertSlice$actions.fullLoadingOn,
    fullLoadingOff = _alertSlice$actions.fullLoadingOff,
    showToast = _alertSlice$actions.showToast,
    closeToast = _alertSlice$actions.closeToast,
    showConfirmation = _alertSlice$actions.showConfirmation,
    clearConfirmation = _alertSlice$actions.clearConfirmation;
exports.clearConfirmation = clearConfirmation;
exports.showConfirmation = showConfirmation;
exports.closeToast = closeToast;
exports.showToast = showToast;
exports.fullLoadingOff = fullLoadingOff;
exports.fullLoadingOn = fullLoadingOn;
var _default = alertSlice.reducer;
exports["default"] = _default;