"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDataAnalytics = exports["default"] = exports.logoutAction = exports.initDataAnalyticsPoc = exports.analyticsPocSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _requestTypes = require("../../apis/requestTypes");

var _alertsSlice = require("../alertsSlice");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  headCount: []
};
var analyticsPocSlice = (0, _toolkit.createSlice)({
  name: "analiticsPoc",
  initialState: initialState,
  reducers: {
    initDataAnalyticsPoc: function initDataAnalyticsPoc(state, action) {
      return _objectSpread({}, state, {
        headCount: action.payload
      });
    },
    logoutAction: function logoutAction(state, action) {
      return _objectSpread({}, state);
    }
  }
}); // Action creators are generated for each case reducer function

exports.analyticsPocSlice = analyticsPocSlice;
var _analyticsPocSlice$ac = analyticsPocSlice.actions,
    initDataAnalyticsPoc = _analyticsPocSlice$ac.initDataAnalyticsPoc,
    logoutAction = _analyticsPocSlice$ac.logoutAction; //export const usrInfo = (state) => state.userData;

exports.logoutAction = logoutAction;
exports.initDataAnalyticsPoc = initDataAnalyticsPoc;
var _default = analyticsPocSlice.reducer;
exports["default"] = _default;
var getDataAnalytics = (0, _toolkit.createAsyncThunk)("data/poc/getDataAnalytics", function _callee(params, ThunkAPI) {
  var data, data2, data3, rank, res;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _requestTypes.reqWithData)("getanalytics", {
            context: 1
          }));

        case 2:
          data = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap((0, _requestTypes.reqWithData)("getanalytics", {
            context: 2
          }));

        case 5:
          data2 = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap((0, _requestTypes.reqWithData)("getanalytics", {
            context: 3
          }));

        case 8:
          data3 = _context.sent;

          if (!data.error) {
            _context.next = 12;
            break;
          }

          ThunkAPI.dispatch((0, _alertsSlice.fullLoadingOff)());
          return _context.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.showToast)({
            type: "warning",
            title: "Error",
            msj: "We have a problem with update Waves",
            show: true,
            duration: 4000
          })));

        case 12:
          rank = data.data.sort(function (a, b) {
            return b.progress - a.progress;
          });
          res = rank.map(function (el, i) {
            return _objectSpread({}, el, {
              progress: el.progress.toFixed(0),
              rank: i + 1
            });
          }); //ThunkAPI.dispatch(getWaves());
          //ThunkAPI.dispatch(resetWavesFrom());

          ThunkAPI.dispatch(initDataAnalyticsPoc(res));
          return _context.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.fullLoadingOff)()));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getDataAnalytics = getDataAnalytics;