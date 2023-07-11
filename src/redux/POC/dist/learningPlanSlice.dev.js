"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLPs = exports.createLPs = exports.lobLPs = exports.campaignCourses = exports.lpInitData = exports["default"] = exports.errorLPForm = exports.searchLPs = exports.searchFormCourses = exports.editLP = exports.checkedForm = exports.cancelOrder = exports.coursesOrder = exports.formCoursesOrder = exports.selectLP = exports.formLPChanges = exports.resetLPForm = exports.viewLPModal = exports.initialDataLP = exports.learningPlanSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _requestTypes = require("../../apis/requestTypes");

var _alertsSlice = require("../alertsSlice");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  showModal: false,
  editForm: false,
  changeOrder: false,
  dbLPs: [],
  tempDbLPs: [],
  lpSelected: [],
  dataCourses: [],
  dbDataCourses: [],
  form: {
    name: "",
    description: "",
    courses: []
  },
  errorForm: {
    name: {
      value: false,
      desc: ""
    },
    description: {
      value: false,
      desc: ""
    },
    courses: {
      value: false,
      desc: ""
    }
  },
  dbFormCourses: [],
  tempFormCourses: [],
  courseSearch: "",
  lpSearch: ""
};
var learningPlanSlice = (0, _toolkit.createSlice)({
  name: "learningPlan",
  initialState: initialState,
  reducers: {
    initialDataLP: function initialDataLP(state, action) {
      var c = action.payload.courses.map(function (el) {
        el.checked = false;
        return el;
      });
      return _objectSpread({}, state, {
        dbLPs: action.payload.leaningP,
        tempDbLPs: action.payload.leaningP,
        form: _objectSpread({}, initialState.form, {
          courses: c
        }),
        dbFormCourses: c,
        tempFormCourses: c,
        showModal: false,
        editForm: false,
        changeOrder: false
      });
    },
    viewLPModal: function viewLPModal(state, action) {
      return _objectSpread({}, state, {
        showModal: true
      });
    },
    selectLP: function selectLP(state, action) {
      return _objectSpread({}, state, {
        lpSelected: action.payload,
        dataCourses: action.payload.courses,
        dbDataCourses: action.payload.courses
      });
    },
    formCoursesOrder: function formCoursesOrder(state, action) {
      return _objectSpread({}, state, {
        form: _objectSpread({}, state.form, {
          courses: action.payload
        }),
        tempFormCourses: action.payload
      });
    },
    coursesOrder: function coursesOrder(state, action) {
      return _objectSpread({}, state, {
        dataCourses: action.payload,
        changeOrder: true
      });
    },
    cancelOrder: function cancelOrder(state, action) {
      return _objectSpread({}, state, {
        dataCourses: state.dbDataCourses,
        changeOrder: false
      });
    },
    errorLPForm: function errorLPForm(state, action) {
      return _objectSpread({}, state, {
        errorForm: action.payload
      });
    },
    formLPChanges: function formLPChanges(state, action) {
      return _objectSpread({}, state, {
        form: _objectSpread({}, state.form, _defineProperty({}, action.payload.tag, action.payload.value)),
        errorForm: _objectSpread({}, state.errorForm, _defineProperty({}, action.payload.tag, {
          value: false,
          desc: ""
        }))
      });
    },
    checkedForm: function checkedForm(state, action) {
      var courses = state.tempFormCourses.map(function (course) {
        if (course.idCourse === action.payload) {
          course.checked = !course.checked;
          return course;
        } else {
          return course;
        }
      });
      state.tempFormCourses = courses;
      state.errorForm.courses = {
        value: false,
        desc: ""
      };

      if (state.courseSearch) {
        var filterCourse = state.tempFormCourses.filter(function (el) {
          return el.nameCourse.toString().toLowerCase().includes(action.payload.toLowerCase()) || el.checked;
        });
        state.form = _objectSpread({}, state.form, {
          filterCourse: filterCourse
        });
      } else {
        state.form = _objectSpread({}, state.form, {
          courses: courses
        });
      }
    },
    resetLPForm: function resetLPForm(state, action) {
      return _objectSpread({}, state, {
        showModal: false,
        editForm: false,
        form: _objectSpread({}, initialState.tempForm, {
          courses: state.dbFormCourses
        }),
        tempFormCourses: state.dbFormCourses,
        errorForm: initialState.errorForm
      });
    },
    editLP: function editLP(state, action) {
      return _objectSpread({}, state, {
        showModal: true,
        form: action.payload,
        editForm: true,
        tempFormCourses: action.payload.courses
      });
    },
    searchFormCourses: function searchFormCourses(state, action) {
      var filterCourse = state.tempFormCourses.filter(function (el) {
        return el.nameCourse.toString().toLowerCase().includes(action.payload.toLowerCase()) || el.checked;
      });
      return _objectSpread({}, state, {
        form: _objectSpread({}, state.form, {
          courses: filterCourse
        }),
        courseSearch: action.payload
      });
    },
    searchLPs: function searchLPs(state, action) {
      var filterLP = state.dbLPs.filter(function (el) {
        return el.nameLearningPlan.toString().toLowerCase().includes(action.payload.toLowerCase());
      });
      return _objectSpread({}, state, {
        tempDbLPs: filterLP,
        lpSearch: action.payload
      });
    }
  }
}); // Action creators are generated for each case reducer function

exports.learningPlanSlice = learningPlanSlice;
var _learningPlanSlice$ac = learningPlanSlice.actions,
    initialDataLP = _learningPlanSlice$ac.initialDataLP,
    viewLPModal = _learningPlanSlice$ac.viewLPModal,
    resetLPForm = _learningPlanSlice$ac.resetLPForm,
    formLPChanges = _learningPlanSlice$ac.formLPChanges,
    selectLP = _learningPlanSlice$ac.selectLP,
    formCoursesOrder = _learningPlanSlice$ac.formCoursesOrder,
    coursesOrder = _learningPlanSlice$ac.coursesOrder,
    cancelOrder = _learningPlanSlice$ac.cancelOrder,
    checkedForm = _learningPlanSlice$ac.checkedForm,
    editLP = _learningPlanSlice$ac.editLP,
    searchFormCourses = _learningPlanSlice$ac.searchFormCourses,
    searchLPs = _learningPlanSlice$ac.searchLPs,
    errorLPForm = _learningPlanSlice$ac.errorLPForm;
exports.errorLPForm = errorLPForm;
exports.searchLPs = searchLPs;
exports.searchFormCourses = searchFormCourses;
exports.editLP = editLP;
exports.checkedForm = checkedForm;
exports.cancelOrder = cancelOrder;
exports.coursesOrder = coursesOrder;
exports.formCoursesOrder = formCoursesOrder;
exports.selectLP = selectLP;
exports.formLPChanges = formLPChanges;
exports.resetLPForm = resetLPForm;
exports.viewLPModal = viewLPModal;
exports.initialDataLP = initialDataLP;
var _default = learningPlanSlice.reducer;
exports["default"] = _default;
var lpInitData = (0, _toolkit.createAsyncThunk)("data/poc/lpDataInit", function _callee(params, ThunkAPI) {
  var c, lps, res;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(ThunkAPI.dispatch(campaignCourses(params.idCampaign)));

        case 2:
          c = _context.sent;

          if (!c.payload.error) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.showToast)({
            type: "warning",
            title: "error.title",
            msj: "Users Request Error",
            show: true,
            duration: 4000
          })));

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(ThunkAPI.dispatch(lobLPs(params)));

        case 7:
          lps = _context.sent;

          if (!lps.payload.error) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.showToast)({
            type: "warning",
            title: "error.title",
            msj: "Users Request Error",
            show: true,
            duration: 4000
          })));

        case 10:
          res = {
            courses: c.payload,
            leaningP: lps.payload
          };
          ThunkAPI.dispatch(initialDataLP(res));
          return _context.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.fullLoadingOff)()));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
}); //trae todos los cursos creados para esa campaña

exports.lpInitData = lpInitData;
var campaignCourses = (0, _toolkit.createAsyncThunk)("data/poc/campCourses", function _callee2(params, ThunkAPI) {
  var courses;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _requestTypes.reqWithData)("su/getcourses", {
            idCampaign: params,
            idCourse: 0,
            context: 1
          }));

        case 2:
          courses = _context2.sent;

          if (!courses.error) {
            _context2.next = 6;
            break;
          }

          ThunkAPI.dispatch((0, _alertsSlice.fullLoadingOff)());
          return _context2.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.showToast)({
            type: "warning",
            title: "Error",
            msj: "We have a problem with courses",
            show: true,
            duration: 4000
          })));

        case 6:
          return _context2.abrupt("return", courses.data);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.campaignCourses = campaignCourses;
var lobLPs = (0, _toolkit.createAsyncThunk)("data/poc/lobLPs", function _callee3(params, ThunkAPI) {
  var learningP;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap((0, _requestTypes.reqWithData)("getlearningPlan", {
            idCampaign: params.idCampaign,
            idLob: params.idLob
          }));

        case 2:
          learningP = _context3.sent;

          if (!learningP.error) {
            _context3.next = 6;
            break;
          }

          ThunkAPI.dispatch((0, _alertsSlice.fullLoadingOff)());
          return _context3.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.showToast)({
            type: "warning",
            title: "Error",
            msj: "We have a problem with learning Plan",
            show: true,
            duration: 4000
          })));

        case 6:
          return _context3.abrupt("return", learningP.data);

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.lobLPs = lobLPs;
var createLPs = (0, _toolkit.createAsyncThunk)("data/poc/createLPs", function _callee4(params, ThunkAPI) {
  var learningP;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap((0, _requestTypes.reqWithData)("poc/postcreatelp", params.data));

        case 2:
          learningP = _context4.sent;

          if (!learningP.error) {
            _context4.next = 6;
            break;
          }

          ThunkAPI.dispatch((0, _alertsSlice.fullLoadingOff)());
          return _context4.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.showToast)({
            type: "warning",
            title: "Error",
            msj: "We have a problem with learning Plan",
            show: true,
            duration: 4000
          })));

        case 6:
          return _context4.abrupt("return", ThunkAPI.dispatch(lpInitData(params.rfsh)));

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.createLPs = createLPs;
var updateLPs = (0, _toolkit.createAsyncThunk)("data/poc/updateLPs", function _callee5(params, ThunkAPI) {
  var learningP;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap((0, _requestTypes.reqWithData)("updatelp", params.data));

        case 2:
          learningP = _context5.sent;

          if (!learningP.error) {
            _context5.next = 6;
            break;
          }

          ThunkAPI.dispatch((0, _alertsSlice.fullLoadingOff)());
          return _context5.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.showToast)({
            type: "warning",
            title: "Error",
            msj: "We have a problem with learning Plan",
            show: true,
            duration: 4000
          })));

        case 6:
          return _context5.abrupt("return", ThunkAPI.dispatch(lpInitData(params.rfsh)));

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.updateLPs = updateLPs;