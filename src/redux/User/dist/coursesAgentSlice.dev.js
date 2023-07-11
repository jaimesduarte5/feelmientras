"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postAgentTrackEvents = exports.getDataAssignment = exports["default"] = exports.loadingUpTracks = exports.clearEvent = exports.addEvent = exports.getCoursesA = exports.getLP = exports.loadingData = exports.courseAgentSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _requestTypes = require("../../apis/requestTypes");

var _alertsSlice = require("../alertsSlice");

var _contentManagePocSlice = require("../POC/contentManagePocSlice");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  isLoading: false,
  loadingUpTracks: false,
  courses: [],
  learningPlans: [],
  trackEvents: {
    idActivity: 0,
    dateOpen: "",
    timeToActivity: "",
    typeConten: "",
    progress: 0,
    timeVideo: "",
    timeView: "",
    context: 0,
    views: 0,
    idEvent: 0
  }
};
var courseAgentSlice = (0, _toolkit.createSlice)({
  name: "coursesAgent",
  initialState: initialState,
  reducers: {
    //Loading courses
    loadingData: function loadingData(state, action) {
      return _objectSpread({}, state, {
        isLoading: action.payload
      });
    },
    //Loading carga de avence de actividades a la db
    loadingUpTracks: function loadingUpTracks(state, action) {
      return _objectSpread({}, state, {
        loadingUpTracks: action.payload
      });
    },
    //MAnejo del estado de los Learning PLan del agente
    getLP: function getLP(state, action) {
      return _objectSpread({}, state, {
        isLoading: false,
        learningPlans: action.payload.learningPlan
      });
    },
    //MAnejo del estado de los  Cursos del agente
    getCoursesA: function getCoursesA(state, action) {
      return _objectSpread({}, state, {
        isLoading: false,
        courses: action.payload.courses
      });
    },
    addEvent: function addEvent(state, action) {
      return _objectSpread({}, state, {
        trackEvents: action.payload
      });
    },
    clearEvent: function clearEvent(state) {
      return _objectSpread({}, state, {
        trackEvents: initialState.trackEvents
      });
    }
  }
});
exports.courseAgentSlice = courseAgentSlice;
var _courseAgentSlice$act = courseAgentSlice.actions,
    loadingData = _courseAgentSlice$act.loadingData,
    getLP = _courseAgentSlice$act.getLP,
    getCoursesA = _courseAgentSlice$act.getCoursesA,
    addEvent = _courseAgentSlice$act.addEvent,
    clearEvent = _courseAgentSlice$act.clearEvent,
    loadingUpTracks = _courseAgentSlice$act.loadingUpTracks;
exports.loadingUpTracks = loadingUpTracks;
exports.clearEvent = clearEvent;
exports.addEvent = addEvent;
exports.getCoursesA = getCoursesA;
exports.getLP = getLP;
exports.loadingData = loadingData;
var _default = courseAgentSlice.reducer; ///////////////////////Thunk Section//////////////////////////
//Funcion para consultar el listado de Cursos y LP del agente
//Funcion para consultar el listado de Cursos

exports["default"] = _default;
var getDataAssignment = (0, _toolkit.createAsyncThunk)("data/getAssignmentAgent", function _callee(context, ThunkAPI) {
  var data, resp, _resp;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          ThunkAPI.dispatch(loadingData(true)); //consultar Learning Plans  Asignados

          _context.next = 3;
          return regeneratorRuntime.awrap((0, _requestTypes.reqWithData)("a/getassignments", {
            context: context
          }));

        case 3:
          data = _context.sent;

          if (!data.error) {
            _context.next = 8;
            break;
          }

          ThunkAPI.dispatch(loadingData(false));
          ThunkAPI.dispatch(getCoursesA([]));
          return _context.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.showToast)({
            type: "warning",
            title: "Error",
            msj: "We have a problem with the courses",
            show: true,
            duration: 4000
          })));

        case 8:
          if (context === 1) {
            resp = {
              learningPlan: data.data.Result
            };
            ThunkAPI.dispatch(getLP(resp));
          } else {
            _resp = {
              courses: data.data.Result
            };
            ThunkAPI.dispatch(getCoursesA(_resp));
          }

          return _context.abrupt("return");

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
}); //funcion para el manejo de eventos de seguimiento a un Learning Plan, Curso o Actividad

exports.getDataAssignment = getDataAssignment;
var postAgentTrackEvents = (0, _toolkit.createAsyncThunk)("data/postagenttrackevents", function _callee2(datatrack, ThunkAPI) {
  var data, actualization, idCourse, idCampaign;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          //Envia los datos para ser almacenados
          // Context 1: Eventos relacionados con LP
          // Context 2: Eventos relacionados con cursos
          // Context 3: Eventos relacionados con actividades
          // idActivity: hace referencia al id del LearningPlan, Course o activity respectivamente
          ThunkAPI.dispatch(loadingUpTracks(true));
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _requestTypes.reqWithData)("a/posttrackevents", datatrack.eventActivity));

        case 3:
          data = _context2.sent;

          if (data.error) {}

          actualization = true;
          idCourse = datatrack.idCourse, idCampaign = datatrack.idCampaign;
          ThunkAPI.dispatch((0, _contentManagePocSlice.getCourse)({
            idCourse: idCourse,
            idCampaign: idCampaign,
            actualization: actualization
          }));
          ThunkAPI.dispatch(loadingUpTracks(false));
          return _context2.abrupt("return");

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.postAgentTrackEvents = postAgentTrackEvents;