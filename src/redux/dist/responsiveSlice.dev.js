"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.toggleMenu = exports.toggleVideoFull = exports.responsiveSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var initialState = {
  videoFull: false,
  showMenu: false
};
var responsiveSlice = (0, _toolkit.createSlice)({
  name: "responsive",
  initialState: initialState,
  reducers: {
    toggleVideoFull: function toggleVideoFull(state) {
      state.videoFull = !state.videoFull;
    },
    toggleMenu: function toggleMenu(state) {
      state.showMenu = !state.showMenu;
    }
  }
});
exports.responsiveSlice = responsiveSlice;
var _responsiveSlice$acti = responsiveSlice.actions,
    toggleVideoFull = _responsiveSlice$acti.toggleVideoFull,
    toggleMenu = _responsiveSlice$acti.toggleMenu;
exports.toggleMenu = toggleMenu;
exports.toggleVideoFull = toggleVideoFull;
var _default = responsiveSlice.reducer;
exports["default"] = _default;