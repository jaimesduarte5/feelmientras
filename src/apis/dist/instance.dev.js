"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.axiosInstance = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

var _authHelper = require("../helpers/authHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var axiosInstance = _axios["default"].create({
  //Localhost
  baseURL: "http://localhost:4343/api/",
  //baseURL: "https://feelsdev.teleperformance.co/api/",
  //baseURL: "https://tpfeeltest.teleperformance.co/api/",
  // baseURL: "https://feel.teleperformance.co/api/",
  transformRequest: [function (data, headers) {
    //    console.log("lo que se envia", data);
    var encrypted = (0, _authHelper.encrypt)(JSON.stringify(data));
    data = {
      data: encrypted
    };

    var hash = _cryptoJs["default"].SHA512(encrypted).toString();

    headers.refreshAuthorization = headers.refreshAuthorization + "&#&" + hash;
    return JSON.stringify(data);
  }].concat(_toConsumableArray(_axios["default"].defaults.transformRequest)),
  transformResponse: [function (data) {
    var decryptedData = (0, _authHelper.decrypt)(data.replace(/['"]+/g, ""));
    data = decryptedData; //  console.log("lo que llega.....", decryptedData);

    return data;
  }].concat(_toConsumableArray(_axios["default"].defaults.transformResponse))
});

exports.axiosInstance = axiosInstance;
axiosInstance.interceptors.request.use(function (config) {
  var user = (0, _authHelper.decrypt)(sessionStorage.getItem("userFeel"));
  config.headers["Content-Type"] = "application/json; charset=ISO-8859-1";
  config.headers.responseEncoding = "utf8";
  config.headers.authorization = "Bearer " + user.token;
  config.headers.refreshAuthorization = "Bearer " + user.refreshToken;
  config.headers["Access-Control-Allow-Origin"] = "*";
  config.data = _objectSpread({}, config.data, {
    requestedBy: user.email
  });
  return config;
});