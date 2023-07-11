"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upImageCourse = exports.upImageMeet = exports.deleteActivityFB = exports.upFiles = exports["default"] = exports.clearURL = exports.upProgress = exports.upImageFB = exports.upfileFB = exports.courseManageFBSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _firebase = require("../../firebase/firebase.config");

var _storage = require("firebase/storage");

var _cousesManageSlice = require("../SuperAdmin/cousesManageSlice");

var _alertsSlice = require("../alertsSlice");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  url: "",
  urlImage: "",
  progress: 0,
  isLoading: false,
  isLoadingI: false,
  loadingCourses: false
};
var courseManageFBSlice = (0, _toolkit.createSlice)({
  name: "filesFB",
  initialState: initialState,
  reducers: {
    //carga de imagenes de meetings
    upfileFB: function upfileFB(state, action) {
      return _objectSpread({}, state, {
        isLoading: action.payload.loading,
        url: action.payload.url
      });
    },
    //carga de imagenes de los Cursos
    upImageFB: function upImageFB(state, action) {
      return _objectSpread({}, state, {
        isLoadingI: action.payload.loading,
        urlImage: action.payload.url
      });
    },
    //lipiar el estado de la url
    clearURL: function clearURL(state) {
      return _objectSpread({}, state, {
        url: "",
        progress: 0
      });
    },
    upImage: function upImage(state, action) {
      return _objectSpread({}, state, {
        isLoading: action.payload.loading,
        url: action.payload.url
      });
    },
    upProgress: function upProgress(state, action) {
      return _objectSpread({}, state, {
        progress: action.payload
      });
    }
  }
});
exports.courseManageFBSlice = courseManageFBSlice;
var _courseManageFBSlice$ = courseManageFBSlice.actions,
    upfileFB = _courseManageFBSlice$.upfileFB,
    upImageFB = _courseManageFBSlice$.upImageFB,
    upProgress = _courseManageFBSlice$.upProgress,
    clearURL = _courseManageFBSlice$.clearURL;
exports.clearURL = clearURL;
exports.upProgress = upProgress;
exports.upImageFB = upImageFB;
exports.upfileFB = upfileFB;
var _default = courseManageFBSlice.reducer; /////////////////////////////THUNK SECTION////////////////////////////////
//Funcion para cargar archivos de actividades a firebase

exports["default"] = _default;
var upFiles = (0, _toolkit.createAsyncThunk)("data/su/upfiles", function _callee(params, ThunkAPI) {
  var file, selectFile, activity, storageRef, uploadTask;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          ThunkAPI.dispatch(upfileFB({
            loading: true
          }));
          file = params.file, selectFile = params.selectFile, activity = params.activity;
          storageRef = (0, _storage.ref)(_firebase.storage, "/feel/".concat(selectFile.type, "/").concat(activity.nameActivity + Date.now()));
          uploadTask = (0, _storage.uploadBytesResumable)(storageRef, file);
          uploadTask.on("state_changed", function (snapshot) {
            var prog = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
            ThunkAPI.dispatch(upProgress(prog));
          }, function (err) {}, function () {
            (0, _storage.getDownloadURL)(uploadTask.snapshot.ref).then(function (url) {
              ThunkAPI.dispatch(upfileFB({
                loading: false,
                url: url
              }));
              ThunkAPI.dispatch((0, _cousesManageSlice.newActivity)({
                urlActivity: url
              }));
            });
          });
          return _context.abrupt("return");

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}); //funcion para Eliminar Actividades de FireBase

exports.upFiles = upFiles;
var deleteActivityFB = (0, _toolkit.createAsyncThunk)("data/su/delActivityFireBase", function _callee2(activity, ThunkAPI) {
  var desertRef;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          desertRef = (0, _storage.ref)(_firebase.storage, activity);
          (0, _storage.deleteObject)(desertRef).then(function () {})["catch"](function (error) {
            ThunkAPI.dispatch((0, _alertsSlice.showToast)({
              type: "warning",
              title: error,
              msj: "The activity does not have a resource assigned or has been deleted!",
              show: true,
              diration: 2000
            }));
          });

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //Funcion para cargar imagenes de un Meeting a firebase

exports.deleteActivityFB = deleteActivityFB;
var upImageMeet = (0, _toolkit.createAsyncThunk)("data/poc/upimage", function _callee3(params, ThunkAPI) {
  var file, activity, storageRef, uploadTask;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          ThunkAPI.dispatch(upfileFB({
            loading: true
          }));
          file = params.file, activity = params.activity;
          storageRef = (0, _storage.ref)(_firebase.storage, "/feel/meets/".concat(Date.now()));
          uploadTask = (0, _storage.uploadBytesResumable)(storageRef, file);
          uploadTask.on("state_changed", function (snapshot) {
            var prog = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
            ThunkAPI.dispatch(upProgress(prog));
          }, function (err) {}, function () {
            (0, _storage.getDownloadURL)(uploadTask.snapshot.ref).then(function (url) {
              ThunkAPI.dispatch(upfileFB({
                loading: false,
                url: url
              }));
            });
          });
          return _context3.abrupt("return");

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //Funcion para cargar imagenes de un Curso a firebase

exports.upImageMeet = upImageMeet;
var upImageCourse = (0, _toolkit.createAsyncThunk)("admin/upimagecourse", function _callee4(params, ThunkAPI) {
  var file, name, userName, f, storageRef, uploadTask;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          ThunkAPI.dispatch(upImageFB({
            loading: true
          }));
          file = params.file, name = params.name, userName = params.userName, f = params.f;
          storageRef = (0, _storage.ref)(_firebase.storage, "/feel/course/".concat(name + userName));
          uploadTask = (0, _storage.uploadBytesResumable)(storageRef, file);
          uploadTask.on("state_changed", function (snapshot) {
            var prog = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
          }, function (err) {}, function () {
            (0, _storage.getDownloadURL)(uploadTask.snapshot.ref).then(function (url) {
              ThunkAPI.dispatch(upImageFB({
                loading: false,
                urlImage: url
              }));
              ThunkAPI.dispatch((0, _cousesManageSlice.addCourse)({
                name: "urlImgCourse",
                value: url
              }));
            });
          });
          return _context4.abrupt("return");

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.upImageCourse = upImageCourse;