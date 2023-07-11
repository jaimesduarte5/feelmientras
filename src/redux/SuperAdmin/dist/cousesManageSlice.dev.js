"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteActivityDB = exports.deleteActivity = exports.sendCourseEdit = exports.deleteCourses = exports.createCourses = exports.getDataCourses = exports["default"] = exports.errorsValidation = exports.orderActivities = exports.addActivity = exports.newActivity = exports.editCourse = exports.addCourse = exports.cleanCourse = exports.loadingCourses = exports.getCourses = exports.courseSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _requestTypes = require("../../apis/requestTypes");

var _alertsSlice = require("../alertsSlice");

var _courseManageSlice = require("../firebase/courseManageSlice");

var _userManagementSlice = require("./userManagementSlice");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  isLoading: false,
  campaigns: [],
  courses: [],
  errors: {
    idCampaign: {
      status: false,
      msj: "You need to select a campaign"
    },
    nameCourse: {
      status: false,
      msj: "The name of the course is required"
    },
    nameCourseFound: {
      status: false,
      msj: "There is a course with the same name"
    },
    descCourse: {
      status: false,
      msj: "All courses required a description"
    },
    activities: {
      status: false,
      msj: "The course requires at least one activity"
    },
    nameActivity: {
      status: false,
      msj: "The name of the arctivity is requiered"
    },
    descActivity: {
      status: false,
      msj: "The  arctivity requiered a description"
    },
    urlActivity: {
      status: false,
      msj: "Need to load a resource"
    }
  },
  newCourse: {
    descCourse: "",
    idCampaign: 0,
    nameCourse: "",
    "private": false,
    activities: []
  },
  activity: {
    descActivity: "",
    idActivity: 0,
    nameActivity: "",
    typeContent: 0,
    urlActivity: ""
  },
  activities: []
};
var courseSlice = (0, _toolkit.createSlice)({
  name: "courses",
  initialState: initialState,
  reducers: {
    //Loading courses
    loadingCourses: function loadingCourses(state, action) {
      return _objectSpread({}, state, {
        isLoading: action.payload
      });
    },
    //trae los cursos de la base de datos
    getCourses: function getCourses(state, action) {
      return _objectSpread({}, state, {
        campaigns: action.payload.campaigns,
        courses: action.payload.courses
      });
    },
    //crea un curso de manera local
    addCourse: function addCourse(state, action) {
      return _objectSpread({}, state, {
        newCourse: _objectSpread({}, state.newCourse, _defineProperty({}, action.payload.name, action.payload.value))
      });
    },
    //crear actividades temporales para agregar a un curso
    newActivity: function newActivity(state, action) {
      return _objectSpread({}, state, {
        activity: _objectSpread({}, state.activity, _defineProperty({
          idActivity: Date.now(),
          urlActivity: action.payload.urlActivity
        }, action.payload.name, action.payload.value))
      });
    },
    addActivity: function addActivity(state) {
      return _objectSpread({}, state, {
        newCourse: _objectSpread({}, state.newCourse, {
          activities: [].concat(_toConsumableArray(state.newCourse.activities), [state.activity])
        }),
        activity: initialState.activity
      });
    },
    orderActivities: function orderActivities(state, action) {
      return _objectSpread({}, state, {
        newCourse: _objectSpread({}, state.newCourse, {
          activities: action.payload
        })
      });
    },
    //
    cleanCourse: function cleanCourse(state) {
      return _objectSpread({}, state, {
        newCourse: initialState.newCourse
      });
    },
    editCourse: function editCourse(state, action) {
      return _objectSpread({}, state, {
        newCourse: action.payload
      });
    },
    //maneja el estado de los errores de creacion de cursos y actividades
    errorsValidation: function errorsValidation(state, action) {
      return _objectSpread({}, state, {
        errors: _objectSpread({}, state.errors, {}, action.payload)
      });
    }
  }
});
exports.courseSlice = courseSlice;
var _courseSlice$actions = courseSlice.actions,
    getCourses = _courseSlice$actions.getCourses,
    loadingCourses = _courseSlice$actions.loadingCourses,
    cleanCourse = _courseSlice$actions.cleanCourse,
    addCourse = _courseSlice$actions.addCourse,
    editCourse = _courseSlice$actions.editCourse,
    newActivity = _courseSlice$actions.newActivity,
    addActivity = _courseSlice$actions.addActivity,
    orderActivities = _courseSlice$actions.orderActivities,
    errorsValidation = _courseSlice$actions.errorsValidation;
exports.errorsValidation = errorsValidation;
exports.orderActivities = orderActivities;
exports.addActivity = addActivity;
exports.newActivity = newActivity;
exports.editCourse = editCourse;
exports.addCourse = addCourse;
exports.cleanCourse = cleanCourse;
exports.loadingCourses = loadingCourses;
exports.getCourses = getCourses;
var _default = courseSlice.reducer; ///////////////////////Thunk Section//////////////////////////
//Funcion para consultar el listado de Cursos

exports["default"] = _default;
var getDataCourses = (0, _toolkit.createAsyncThunk)("data/getCourses", function _callee(account, ThunkAPI) {
  var campaigns, data, resp;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(ThunkAPI.dispatch((0, _userManagementSlice.campaignsData)()));

        case 2:
          campaigns = _context.sent;

          if (!campaigns.error) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.showToast)({
            type: "warning",
            title: "Error",
            msj: "We have a problem with campaigns",
            show: true,
            duration: 4000
          })));

        case 5:
          ThunkAPI.dispatch(loadingCourses(true));
          _context.next = 8;
          return regeneratorRuntime.awrap((0, _requestTypes.reqWithData)("su/getcourses", {
            idCampaign: account || campaigns.payload.data[0].Campaign[0].id,
            idCourse: 0,
            context: 1
          }));

        case 8:
          data = _context.sent;

          if (!data.error) {
            _context.next = 12;
            break;
          }

          ThunkAPI.dispatch(loadingCourses(false));
          return _context.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.showToast)({
            type: "warning",
            title: "Error",
            msj: "We have a problem with courses",
            show: true,
            duration: 4000
          })));

        case 12:
          resp = {
            campaigns: campaigns.payload.data[0].Campaign,
            courses: data.data
          };
          ThunkAPI.dispatch(loadingCourses(false));
          return _context.abrupt("return", ThunkAPI.dispatch(getCourses(resp)));

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
}); //Funcion para crear Cursos en la base de datos

exports.getDataCourses = getDataCourses;
var createCourses = (0, _toolkit.createAsyncThunk)("data/createCourses", function _callee2(course, ThunkAPI) {
  var create;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _requestTypes.reqWithData)("su/postcreatecourse", course));

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
            msj: "We have a problem with the creation of this course",
            show: true,
            duration: 4000
          })));

        case 6:
          if (create.status === 200) {
            ThunkAPI.dispatch((0, _alertsSlice.showToast)({
              type: "success",
              title: "Great!",
              msj: "The course has been created successfully",
              show: true,
              duration: 4000
            }));
          }

          ThunkAPI.dispatch((0, _alertsSlice.fullLoadingOff)());
          ThunkAPI.dispatch(getDataCourses(course.idCampaign));
          ThunkAPI.dispatch(cleanCourse());
          return _context2.abrupt("return");

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //Funcion para eliminar Cursos de la base de datos

exports.createCourses = createCourses;
var deleteCourses = (0, _toolkit.createAsyncThunk)("data/su/deleteCourses", function _callee3(course, ThunkAPI) {
  var activities, del;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          //culsultar campañas
          activities = course.activities; // Ciclo para eliminar los recursos de las actividades del curso de FB
          // activities.map(({ urlActivity }) => {
          //   ThunkAPI.dispatch(deleteActivityFB(urlActivity));
          // });

          _context3.next = 3;
          return regeneratorRuntime.awrap((0, _requestTypes.reqWithData)("su/updateCourse", _objectSpread({
            context: 2
          }, course)));

        case 3:
          del = _context3.sent;

          if (!del.error) {
            _context3.next = 7;
            break;
          }

          ThunkAPI.dispatch((0, _alertsSlice.fullLoadingOff)());
          return _context3.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.showToast)({
            type: "warning",
            title: "Error",
            msj: "We have a problem with the deletion of the course",
            show: true,
            duration: 4000
          })));

        case 7:
          if (del.status === 200) {
            ThunkAPI.dispatch((0, _alertsSlice.showToast)({
              type: "success",
              title: "Great!",
              msj: "The course has been removed successfully",
              show: true,
              duration: 4000
            }));
          }

          ThunkAPI.dispatch(getDataCourses(course.idCampaign));
          ThunkAPI.dispatch((0, _alertsSlice.fullLoadingOff)());
          return _context3.abrupt("return");

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //funcion para editar cursos en la base de datos

exports.deleteCourses = deleteCourses;
var sendCourseEdit = (0, _toolkit.createAsyncThunk)("data/su/editCourses", function _callee4(course, ThunkAPI) {
  var edit;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap((0, _requestTypes.reqWithData)("su/updateCourse", _objectSpread({
            context: 1
          }, course)));

        case 2:
          edit = _context4.sent;

          if (!edit.error) {
            _context4.next = 6;
            break;
          }

          ThunkAPI.dispatch((0, _alertsSlice.fullLoadingOff)());
          return _context4.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.showToast)({
            type: "warning",
            title: "Error",
            msj: "We have a problem with the edition of this course",
            show: true,
            duration: 4000
          })));

        case 6:
          if (edit.status === 200) {
            ThunkAPI.dispatch((0, _alertsSlice.fullLoadingOff)());
            ThunkAPI.dispatch(getDataCourses(course.idCampaign));
            ThunkAPI.dispatch(cleanCourse());
            ThunkAPI.dispatch((0, _alertsSlice.showToast)({
              type: "success",
              title: "Great!",
              msj: "The course has been edited successfully",
              show: true,
              duration: 4000
            }));
          }

          return _context4.abrupt("return");

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //funcion para eliminar Actividades

exports.sendCourseEdit = sendCourseEdit;
var deleteActivity = (0, _toolkit.createAsyncThunk)("data/su/delActivity", function _callee5(_ref, ThunkAPI) {
  var activity, newCourse, typeAction, idActivity, urlActivity, nameActivity, deldb, newActivities;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          activity = _ref.activity, newCourse = _ref.newCourse, typeAction = _ref.typeAction;
          idActivity = activity.idActivity, urlActivity = activity.urlActivity, nameActivity = activity.nameActivity;

          if (!(typeAction === "Edit")) {
            _context5.next = 8;
            break;
          }

          _context5.next = 5;
          return regeneratorRuntime.awrap(ThunkAPI.dispatch(deleteActivityDB({
            idActivity: idActivity,
            course: newCourse
          })));

        case 5:
          deldb = _context5.sent;
          _context5.next = 8;
          break;

        case 8:
          //crea el nuevo array de actividades sin la actividad eliminada
          newActivities = newCourse.activities.filter(function (actividad) {
            return actividad.nameActivity !== nameActivity;
          });
          ThunkAPI.dispatch(orderActivities(newActivities));

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  });
}); //Funcion para elimar Actividades de la base de datos

exports.deleteActivity = deleteActivity;
var deleteActivityDB = (0, _toolkit.createAsyncThunk)("data/su/delActivityDB", function _callee6(_ref2, ThunkAPI) {
  var idActivity, course, del;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          idActivity = _ref2.idActivity, course = _ref2.course;
          _context6.next = 3;
          return regeneratorRuntime.awrap((0, _requestTypes.reqWithData)("su/updateCourse", _objectSpread({
            context: 3,
            idActivity: idActivity
          }, course)));

        case 3:
          del = _context6.sent;

          if (!del.error) {
            _context6.next = 7;
            break;
          }

          ThunkAPI.dispatch((0, _alertsSlice.fullLoadingOff)());
          return _context6.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.showToast)({
            type: "warning",
            title: "Error",
            msj: "We have a problem with deleting this activity in the database.",
            show: true,
            duration: 4000
          })));

        case 7:
          if (del.status === 200) {
            ThunkAPI.dispatch((0, _alertsSlice.fullLoadingOff)());
            ThunkAPI.dispatch((0, _alertsSlice.showToast)({
              type: "success",
              title: "Great!",
              msj: "The activity has been deleted successfully",
              show: true,
              duration: 4000
            }));
          }

          return _context6.abrupt("return");

        case 9:
        case "end":
          return _context6.stop();
      }
    }
  });
});
exports.deleteActivityDB = deleteActivityDB;