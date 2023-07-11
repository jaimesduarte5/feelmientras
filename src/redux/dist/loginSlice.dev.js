"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.logoutAction = exports.readUserActive = exports.loginSlice = exports.loginSubmit = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _axios = _interopRequireDefault(require("axios"));

var _authHelper = _interopRequireWildcard(require("../helpers/authHelper"));

var _alertsSlice = require("./alertsSlice");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var url = "http://localhost:4343/api/login"; //const url = "https://feelsdev.teleperformance.co/api/login";
//const url = "https://tpfeeltest.teleperformance.co/api/login";
//const url = process.env.OLD_OAUTH_URL;

var loginSubmit = (0, _toolkit.createAsyncThunk)("login/loginSubmit", function _callee(data, ThunkAPI) {
  var res, _data;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post(url, {
            mstoken: data
          })["catch"](function (error) {
            if (error.response) {
              return error.response;
            }
          }));

        case 3:
          res = _context.sent;

          if (!(res.status === 200)) {
            _context.next = 15;
            break;
          }

          _context.prev = 5;
          _data = (0, _authHelper.decrypt)(res.data.replace(/['"]+/g, ""));

          if (!(_data.role === "Poc" && _data.idLob === 1 && _data.idCampaign === 1)) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.showToast)({
            type: "warning",
            title: "You don´t have access",
            msj: "you dont assign in any Campaign",
            show: true
          })));

        case 9:
          return _context.abrupt("return", {
            data: res.data
          });

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](5);
          return _context.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.showToast)({
            type: "warning",
            title: "You don´t have access",
            msj: "Problrem with your creation",
            show: true
          })));

        case 15:
          if (!(res.status === 401)) {
            _context.next = 17;
            break;
          }

          return _context.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.showToast)({
            type: "warning",
            title: "You don´t have access",
            msj: "Check if you have been created",
            show: true
          })));

        case 17:
          return _context.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.showToast)({
            type: "warning",
            title: "You don´t have access",
            msj: "Check if you have been created",
            show: true
          })));

        case 20:
          _context.prev = 20;
          _context.t1 = _context["catch"](0);
          return _context.abrupt("return", Promise.resolve({
            data: null,
            error: _context.t1
          }));

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 20], [5, 12]]);
});
exports.loginSubmit = loginSubmit;

var initialState = function initialState() {
  var data = (0, _authHelper["default"])();

  if (data !== "unauthorized") {
    return {
      loading: false,
      userData: data,
      url: "/admin/home",
      status: "authorized"
    };
  } else {
    return {
      loading: false,
      userData: null,
      url: "/",
      status: "unauthorized"
    };
  }
};

var loginSlice = (0, _toolkit.createSlice)({
  name: "login",
  initialState: initialState,
  reducers: {
    logoutAction: function logoutAction(state, action) {
      sessionStorage.removeItem("userFeel");
      return _objectSpread({}, initialState);
    }
  },
  extraReducers: function extraReducers(builder) {
    builder.addCase(loginSubmit.pending, function (state, action) {
      state.loading = true;
    });
    builder.addCase(loginSubmit.fulfilled, function (state, action) {
      state.loading = false;

      if (action.payload.data) {
        state.userData = (0, _authHelper.decrypt)(action.payload.data.replace(/['"]+/g, ""));
        state.url = "/home";
        state.status = "authorized";
        sessionStorage.setItem("userFeel", action.payload.data.replace(/['"]+/g, ""));
      } else {
        state = {
          loading: false,
          userData: null,
          url: "/",
          status: "unauthorized"
        };
      }
    });
    builder.addCase(loginSubmit.rejected, function (state, action) {
      state.loading = false;
    });
  }
}); // Action creators are generated for each case reducer function

exports.loginSlice = loginSlice;
var _loginSlice$actions = loginSlice.actions,
    readUserActive = _loginSlice$actions.readUserActive,
    logoutAction = _loginSlice$actions.logoutAction;
exports.logoutAction = logoutAction;
exports.readUserActive = readUserActive;
var _default = loginSlice.reducer;
exports["default"] = _default;