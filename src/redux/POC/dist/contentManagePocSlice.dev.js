"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getCourse =
  exports["default"] =
  exports.getActivities =
  exports.completeActivityTemp =
  exports.resetCourse =
  exports.showCourse =
  exports.loading =
  exports.contentpocSlice =
    void 0;

var _toolkit = require("@reduxjs/toolkit");

var _requestTypes = require("../../apis/requestTypes");

var _alertsSlice = require("../alertsSlice");

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var initialState = {
  isLoading: false,
  course: [],
  activities: [],
};
var contentpocSlice = (0, _toolkit.createSlice)({
  name: "contentpoc",
  initialState: initialState,
  reducers: {
    loading: function loading(state, action) {
      return _objectSpread({}, state, {
        isLoading: action.payload,
      });
    },
    showCourse: function showCourse(state, action) {
      return _objectSpread({}, state, {
        course: action.payload,
      });
    },
    resetCourse: function resetCourse(state) {
      return _objectSpread({}, state, {
        course: [],
        activities: [],
      });
    },
    getActivities: function getActivities(state, action) {
      return _objectSpread({}, state, {
        activities: action.payload,
      });
    },
    completeActivityTemp: function completeActivityTemp(state, action) {
      state.activities.map(function (activity) {}); // return {
      //   ...state,
      //   activities: {
      //     ...state.activities,
      //     //   modificado: "Modificado............",
      //     // activities[0]: {
      //     //   ...activity[action.payload.index],
      //     //   progressActivity: 100,
      //     // },
      //     // activity[action.index+1]: {
      //     //   ...course.activity[action.payload.index+1],
      //     //   progressLastActivity: 100
      //     // },
      //   },
      // };
    },
  },
});
exports.contentpocSlice = contentpocSlice;
var _contentpocSlice$acti = contentpocSlice.actions,
  loading = _contentpocSlice$acti.loading,
  showCourse = _contentpocSlice$acti.showCourse,
  resetCourse = _contentpocSlice$acti.resetCourse,
  completeActivityTemp = _contentpocSlice$acti.completeActivityTemp,
  getActivities = _contentpocSlice$acti.getActivities;
exports.getActivities = getActivities;
exports.completeActivityTemp = completeActivityTemp;
exports.resetCourse = resetCourse;
exports.showCourse = showCourse;
exports.loading = loading;
var _default = contentpocSlice.reducer; ////////////////////////////Thunk Section///////////////////////
//Funcion para consultar el listado de Cursos

exports["default"] = _default;
var getCourse = (0, _toolkit.createAsyncThunk)(
  "data/poc/getCourse",
  function _callee(_ref, ThunkAPI) {
    var idCampaign, idCourse, actualization, data;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch ((_context.prev = _context.next)) {
          case 0:
            (idCampaign = _ref.idCampaign),
              (idCourse = _ref.idCourse),
              (actualization = _ref.actualization);

            if (!actualization) {
              ThunkAPI.dispatch(loading(true));
            }

            _context.next = 5;
            return regeneratorRuntime.awrap(
              (0, _requestTypes.reqWithData)("su/getcourses", {
                idCampaign: idCampaign,
                idCourse: idCourse,
                context: 2,
              })
            );

          case 5:
            data = _context.sent;

            if (!data.error) {
              _context.next = 9;
              break;
            }

            ThunkAPI.dispatch(loading(false));
            return _context.abrupt(
              "return",
              ThunkAPI.dispatch(
                (0, _alertsSlice.showToast)({
                  type: "warning",
                  title: "Error",
                  msj: "We have a problem with courses",
                  show: true,
                  duration: 4000,
                })
              )
            );

          case 9:
            ThunkAPI.dispatch(loading(false));

            ThunkAPI.dispatch(getActivities(data.data[0].activities));
            return _context.abrupt(
              "return",
              ThunkAPI.dispatch(showCourse(data.data))
            );

          case 13:
          case "end":
            return _context.stop();
        }
      }
    });
  }
);
exports.getCourse = getCourse;
