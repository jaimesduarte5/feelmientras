"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDailyMeetings = exports.deleteMeet = exports.updateMeet = exports.createMeet = exports.getMeetings = exports["default"] = exports.showMeetsPerDay = exports.showMeets = exports.editMeet = exports.clearMeetingState = exports.addMeeting = exports.errorsMeetValidation = exports.loadingDayMeets = exports.loadingMeets = exports.meetSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _requestTypes = require("../../apis/requestTypes");

var _alertsSlice = require("../alertsSlice");

var _courseManageSlice = require("../firebase/courseManageSlice");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  isLoading: false,
  loadingDayMeet: false,
  newMeet: {
    meetName: "",
    meetDescription: "",
    dateMeet: "",
    hourIniMeet: "",
    hourEndMeet: "",
    urlImgMeet: "",
    urlMeet: ""
  },
  meetings: [],
  dailyMeetings: [],
  errors: {
    meetName: {
      status: false,
      msj: "The name of the meeting is required"
    },
    meetDescription: {
      status: false,
      msj: "All meeting require a description"
    },
    dateMeet: {
      status: false,
      msj: "You need a to schedule the meeting"
    },
    hourIniMeet: {
      status: false,
      msj: "Start time missing"
    },
    hourEndMeet: {
      status: false,
      msj: "End time missing"
    },
    urlImageMeet: {
      status: false,
      msj: "The Image of the meeting is required"
    },
    urlMeet: {
      status: false,
      msj: "Add the url meeting"
    }
  }
};
var meetSlice = (0, _toolkit.createSlice)({
  name: "meetings",
  initialState: initialState,
  reducers: {
    //dispara el estado de loading
    loadingMeets: function loadingMeets(state, action) {
      return _objectSpread({}, state, {
        isLoading: action.payload
      });
    },
    loadingDayMeets: function loadingDayMeets(state, action) {
      return _objectSpread({}, state, {
        loadingDayMeet: action.payload
      });
    },
    //maneja el estado de los errores de creacion de cursos y actividades
    errorsMeetValidation: function errorsMeetValidation(state, action) {
      return _objectSpread({}, state, {
        errors: action.payload
      });
    },
    // crea la reunion en un stado local
    addMeeting: function addMeeting(state, action) {
      return _objectSpread({}, state, {
        newMeet: _objectSpread({}, state.newMeet, _defineProperty({}, action.payload.name, action.payload.value))
      });
    },
    // limpia el state e inicializa el objeto newMeet
    clearMeetingState: function clearMeetingState(state) {
      return _objectSpread({}, state, {
        newMeet: initialState.newMeet
      });
    },
    editMeet: function editMeet(state, action) {
      return _objectSpread({}, state, {
        newMeet: action.payload
      });
    },
    //asigna las meetings al stado
    showMeets: function showMeets(state, action) {
      return _objectSpread({}, state, {
        meetings: action.payload
      });
    },
    //muestra las meet por fecha
    showMeetsPerDay: function showMeetsPerDay(state, action) {
      return _objectSpread({}, state, {
        dailyMeetings: action.payload
      });
    }
  }
});
exports.meetSlice = meetSlice;
var _meetSlice$actions = meetSlice.actions,
    loadingMeets = _meetSlice$actions.loadingMeets,
    loadingDayMeets = _meetSlice$actions.loadingDayMeets,
    errorsMeetValidation = _meetSlice$actions.errorsMeetValidation,
    addMeeting = _meetSlice$actions.addMeeting,
    clearMeetingState = _meetSlice$actions.clearMeetingState,
    editMeet = _meetSlice$actions.editMeet,
    showMeets = _meetSlice$actions.showMeets,
    showMeetsPerDay = _meetSlice$actions.showMeetsPerDay;
exports.showMeetsPerDay = showMeetsPerDay;
exports.showMeets = showMeets;
exports.editMeet = editMeet;
exports.clearMeetingState = clearMeetingState;
exports.addMeeting = addMeeting;
exports.errorsMeetValidation = errorsMeetValidation;
exports.loadingDayMeets = loadingDayMeets;
exports.loadingMeets = loadingMeets;
var _default = meetSlice.reducer; ///////////////////////Thunk Section//////////////////////////
//Funcion para consultar el listado de meets activas

exports["default"] = _default;
var getMeetings = (0, _toolkit.createAsyncThunk)("data/poc/getMeetings", function _callee(params, ThunkAPI) {
  var data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          ThunkAPI.dispatch(loadingMeets(true));
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _requestTypes.reqWithData)("poc/getmeetings", {
            date: "2023-01-17",
            context: 1
          }));

        case 3:
          data = _context.sent;

          if (!data.error) {
            _context.next = 7;
            break;
          }

          ThunkAPI.dispatch(loadingMeets(false));
          return _context.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.showToast)({
            type: "warning",
            title: "Error",
            msj: "We have a problem with the meetings, try again",
            show: true,
            duration: 4000
          })));

        case 7:
          ThunkAPI.dispatch(loadingMeets(false));
          return _context.abrupt("return", ThunkAPI.dispatch(showMeets(data.data)));

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}); //Funcion para crear  una  meet nueva

exports.getMeetings = getMeetings;
var createMeet = (0, _toolkit.createAsyncThunk)("data/poc/createMeet", function _callee2(newMeet, ThunkAPI) {
  var create;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _requestTypes.reqWithData)("poc/postcreatemeeting", newMeet));

        case 2:
          create = _context2.sent;

          if (!create.error) {
            _context2.next = 6;
            break;
          }

          ThunkAPI.dispatch((0, _alertsSlice.fullLoadingOff)());
          return _context2.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.showToast)({
            type: "warning",
            title: "Error",
            msj: "We have a problem with the creation of this Meeting",
            show: true,
            duration: 4000
          })));

        case 6:
          if (create.status === 200) {
            ThunkAPI.dispatch(clearMeetingState());
            ThunkAPI.dispatch((0, _courseManageSlice.clearURL)());
            ThunkAPI.dispatch((0, _alertsSlice.showToast)({
              type: "success",
              title: "Great!",
              msj: "The Meeting has been created successfully",
              show: true,
              duration: 4000
            }));
          }

          ThunkAPI.dispatch((0, _alertsSlice.fullLoadingOff)());
          ThunkAPI.dispatch(getMeetings());

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //Funcion para editar  una  meet

exports.createMeet = createMeet;
var updateMeet = (0, _toolkit.createAsyncThunk)("data/poc/updateMeet", function _callee3(meet, ThunkAPI) {
  var delMeet;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap((0, _requestTypes.reqWithData)("poc/postupdatemeeting", _objectSpread({}, meet, {
            context: 1
          })));

        case 2:
          delMeet = _context3.sent;

          if (!delMeet.error) {
            _context3.next = 6;
            break;
          }

          ThunkAPI.dispatch((0, _alertsSlice.fullLoadingOff)());
          return _context3.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.showToast)({
            type: "warning",
            title: "Error",
            msj: "We had a problem editing this meeting, please try again.",
            show: true,
            duration: 4000
          })));

        case 6:
          if (delMeet.status === 200) {
            ThunkAPI.dispatch((0, _alertsSlice.showToast)({
              type: "success",
              title: "Great!",
              msj: "The Meeting has been idited successfully",
              show: true,
              duration: 4000
            }));
          }

          ThunkAPI.dispatch((0, _alertsSlice.fullLoadingOff)());
          ThunkAPI.dispatch(getMeetings());

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //Funcion para eliminar  una  meet

exports.updateMeet = updateMeet;
var deleteMeet = (0, _toolkit.createAsyncThunk)("data/poc/deleteMeet", function _callee4(meet, ThunkAPI) {
  var delMeet;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap((0, _requestTypes.reqWithData)("poc/postupdatemeeting", _objectSpread({}, meet, {
            context: 2
          })));

        case 2:
          delMeet = _context4.sent;

          if (!delMeet.error) {
            _context4.next = 6;
            break;
          }

          ThunkAPI.dispatch((0, _alertsSlice.fullLoadingOff)());
          return _context4.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.showToast)({
            type: "warning",
            title: "Error",
            msj: "We had a problem deleting this meeting, please try again.",
            show: true,
            duration: 4000
          })));

        case 6:
          if (delMeet.status === 200) {
            ThunkAPI.dispatch((0, _alertsSlice.showToast)({
              type: "success",
              title: "Great!",
              msj: "The Meeting has been deleted successfully",
              show: true,
              duration: 4000
            }));
          }

          ThunkAPI.dispatch((0, _alertsSlice.fullLoadingOff)());
          ThunkAPI.dispatch(getMeetings());

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //Funcion para consultar el listado de meets por fecha

exports.deleteMeet = deleteMeet;
var getDailyMeetings = (0, _toolkit.createAsyncThunk)("data/poc/getDeilyMeetings", function _callee5(date, ThunkAPI) {
  var data;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          ThunkAPI.dispatch(loadingDayMeets(true));
          _context5.next = 3;
          return regeneratorRuntime.awrap((0, _requestTypes.reqWithData)("poc/getmeetings", {
            date: date,
            context: 2
          }));

        case 3:
          data = _context5.sent;

          if (!data.error) {
            _context5.next = 7;
            break;
          }

          ThunkAPI.dispatch(loadingDayMeets(false));
          return _context5.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.showToast)({
            type: "warning",
            title: "Error",
            msj: "We have a problem with the meetings, try again",
            show: true,
            duration: 4000
          })));

        case 7:
          ThunkAPI.dispatch(loadingDayMeets(false));
          return _context5.abrupt("return", ThunkAPI.dispatch(showMeetsPerDay(data.data)));

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.getDailyMeetings = getDailyMeetings;