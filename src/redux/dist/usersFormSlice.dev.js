

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUser = exports.createUser = exports.updateUser = exports["default"] = exports.changeWavesUsersForm = exports.setWavesUsersForm = exports.viewModal = exports.dataTemplate = exports.resetForm = exports.formValidate = exports.formChanges = exports.setForm = exports.userFormSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _requestTypes = require("../apis/requestTypes");

var _alertsSlice = require("./alertsSlice");

var _userManagePocSlice = require("./POC/userManagePocSlice");

var _userManagementSlice = require("./SuperAdmin/userManagementSlice");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  showModal: false,
  editParams: false,
  waves: [],
  form: {
    role: "Poc",
    ccms: "",
    email: "",
    name: "",
    lastname: "",
    country: "",
    position: "",
    inDate: "",
    wave: {
      namewave: "",
      idwave: 0
    }
  },
  tempForm: {
    role: "Poc",
    ccms: "",
    email: "",
    name: "",
    lastname: "",
    country: "",
    position: "",
    inDate: "",
    wave: {
      namewave: "",
      idwave: 0
    }
  },
  errorForm: {
    ccms: false,
    email: false,
    name: false,
    lastname: false,
    country: false,
    position: false,
    inDate: false,
    wave: {
      value: false,
      desc: ""
    }
  },
  templateRows: []
};
var userFormSlice = (0, _toolkit.createSlice)({
  name: "usersform",
  initialState: initialState,
  reducers: {
    setForm: function setForm(state, action) {
      if (state.waves.length > 0) {
        var wave = state.waves.filter(function (el) {
          return el.idwave === action.payload.idWave;
        });
        return _objectSpread({}, state, {
          editParams: true,
          showModal: true,
          form: {
            role: action.payload.role,
            ccms: action.payload.id,
            email: action.payload.email,
            name: action.payload.firstname,
            lastname: action.payload.lastname,
            country: action.payload.country,
            position: action.payload.position,
            inDate: action.payload.hireDate,
            idLob: action.payload.idLob,
            idCampaign: action.payload.idCampaign,
            idEmployee: action.payload.idEmployee,
            wave: wave[0]
          }
        });
      }

      return _objectSpread({}, state, {
        editParams: true,
        showModal: true,
        form: {
          role: action.payload.role,
          ccms: action.payload.id,
          email: action.payload.email,
          name: action.payload.firstname,
          lastname: action.payload.lastname,
          country: action.payload.country,
          position: action.payload.position,
          inDate: action.payload.hireDate,
          idLob: action.payload.idLob,
          idCampaign: action.payload.idCampaign,
          idEmployee: action.payload.idEmployee,
          wave: action.payload.wave
        }
      });
    },
    setWavesUsersForm: function setWavesUsersForm(state, action) {
      return _objectSpread({}, state, {
        waves: action.payload
      });
    },
    changeWavesUsersForm: function changeWavesUsersForm(state, action) {
      var wave = state.waves.filter(function (el) {
        return el.idwave === action.payload;
      });
      return _objectSpread({}, state, {
        form: _objectSpread({}, state.form, {
          wave: wave[0]
        }),
        errorForm: _objectSpread({}, state.errorForm, {
          wave: false
        })
      });
    },
    formChanges: function formChanges(state, action) {
      if (action.payload.rol === "Poc") {
        var _objectSpread2;

        return _objectSpread({}, state, {
          form: _objectSpread({}, state.form, (_objectSpread2 = {}, _defineProperty(_objectSpread2, action.payload.tag, action.payload.value), _defineProperty(_objectSpread2, "role", "Agent"), _objectSpread2)),
          errorForm: _objectSpread({}, state.errorForm, _defineProperty({}, action.payload.tag, false))
        });
      } else {
        var _objectSpread4;

        return _objectSpread({}, state, {
          form: _objectSpread({}, state.form, (_objectSpread4 = {}, _defineProperty(_objectSpread4, action.payload.tag, action.payload.value), _defineProperty(_objectSpread4, "wave", "0"), _defineProperty(_objectSpread4, "idLob", 0), _defineProperty(_objectSpread4, "idCampaign", 0), _objectSpread4)),
          errorForm: _objectSpread({}, state.errorForm, _defineProperty({}, action.payload.tag, false))
        });
      }
    },
    formValidate: function formValidate(state, action) {
      return _objectSpread({}, state, {
        errorForm: action.payload
      });
    },
    resetForm: function resetForm(state) {
      return _objectSpread({}, state, {
        editParams: false,
        showModal: false,
        form: _objectSpread({}, initialState.form),
        tempForm: _objectSpread({}, initialState.tempForm),
        errorForm: _objectSpread({}, initialState.errorForm)
      });
    },
    dataTemplate: function dataTemplate(state, action) {
      return _objectSpread({}, state, {
        templateRows: action.payload
      });
    },
    viewModal: function viewModal(state) {
      return _objectSpread({}, state, {
        showModal: true
      });
    }
  }
}); // Action creators are generated for each case reducer function

exports.userFormSlice = userFormSlice;
var _userFormSlice$action = userFormSlice.actions,
    setForm = _userFormSlice$action.setForm,
    formChanges = _userFormSlice$action.formChanges,
    formValidate = _userFormSlice$action.formValidate,
    resetForm = _userFormSlice$action.resetForm,
    dataTemplate = _userFormSlice$action.dataTemplate,
    viewModal = _userFormSlice$action.viewModal,
    setWavesUsersForm = _userFormSlice$action.setWavesUsersForm,
    changeWavesUsersForm = _userFormSlice$action.changeWavesUsersForm;
exports.changeWavesUsersForm = changeWavesUsersForm;
exports.setWavesUsersForm = setWavesUsersForm;
exports.viewModal = viewModal;
exports.dataTemplate = dataTemplate;
exports.resetForm = resetForm;
exports.formValidate = formValidate;
exports.formChanges = formChanges;
exports.setForm = setForm;
var _default = userFormSlice.reducer;
exports["default"] = _default;
var updateUser = (0, _toolkit.createAsyncThunk)("data/updateUser", function _callee(params, ThunkAPI) {
  var updateUser;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _requestTypes.reqWithData)("updateuser", {
            user: {
              idccms: params.ccms,
              idEmployee: params.idEmployee,
              name: params.name,
              lastName: params.lastname,
              email: params.email,
              position: params.position,
              hireDate: params.inDate,
              country: params.country,
              role: params.role,
              wave: params.wave.idwave ? params.wave.idwave : 0,
              idLob: params.idLob,
              idCampaign: params.idCampaign
            },
            context: 1
          }));

        case 2:
          updateUser = _context.sent;

          if (!updateUser.error) {
            _context.next = 6;
            break;
          }

          ThunkAPI.dispatch((0, _alertsSlice.fullLoadingOff)());
          return _context.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.showToast)({
            type: "warning",
            title: "Error",
            msj: updateUser.error,
            show: true,
            duration: 4000
          })));

        case 6:
          if (!(params.role === "Agent")) {
            _context.next = 11;
            break;
          }

          _context.next = 9;
          return regeneratorRuntime.awrap(ThunkAPI.dispatch((0, _userManagePocSlice.userMgeInitData)()));

        case 9:
          _context.next = 13;
          break;

        case 11:
          _context.next = 13;
          return regeneratorRuntime.awrap(ThunkAPI.dispatch((0, _userManagementSlice.getDataUsrMge)()));

        case 13:
          ThunkAPI.dispatch((0, _alertsSlice.showToast)({
            type: "success",
            title: "User Updated",
            msj: "The user has been updated",
            show: true,
            duration: 4000
          }));
          ThunkAPI.dispatch(resetForm());
          return _context.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.fullLoadingOff)()));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.updateUser = updateUser;
var createUser = (0, _toolkit.createAsyncThunk)("data/createUser", function _callee2(params, ThunkAPI) {
  var createUsers;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _requestTypes.reqWithData)("insertusers", {
            usersInfo: params
          }));

        case 2:
          createUsers = _context2.sent;

          if (!createUsers.error) {
            _context2.next = 6;
            break;
          }

          ThunkAPI.dispatch((0, _alertsSlice.fullLoadingOff)());
          return _context2.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.showToast)({
            type: "warning",
            title: "Error in the request",
            msj: createUsers.error,
            show: true,
            duration: 4000
          })));

        case 6:
          if (!(params[0][8] === "Agent")) {
            _context2.next = 11;
            break;
          }

          _context2.next = 9;
          return regeneratorRuntime.awrap(ThunkAPI.dispatch((0, _userManagePocSlice.userMgeInitData)()));

        case 9:
          _context2.next = 13;
          break;

        case 11:
          _context2.next = 13;
          return regeneratorRuntime.awrap(ThunkAPI.dispatch((0, _userManagementSlice.getDataUsrMge)()));

        case 13:
          ThunkAPI.dispatch((0, _alertsSlice.showToast)({
            type: "success",
            title: "User Created",
            msj: "The user has been created",
            show: true,
            duration: 4000
          }));
          ThunkAPI.dispatch(resetForm());
          return _context2.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.fullLoadingOff)()));

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.createUser = createUser;
var deleteUser = (0, _toolkit.createAsyncThunk)("data/deleteUser", function _callee3(params, ThunkAPI) {
  var body, delUser;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          body = {
            context: 2,
            user: {
              idccms: params.ccms ? params.ccms : 0,
              idEmployee: params.idEmployee ? params.idEmployee : 0,
              name: params.name ? params.name : "0",
              lastName: params.lastname ? params.lastname : "0",
              email: params.email ? params.email : "0",
              position: params.position ? params.position : "0",
              hireDate: params.inDate ? params.inDate : "0",
              country: params.country ? params.country : "0",
              role: params.role ? params.role : "0",
              wave: params.wave.idwave ? params.wave.idwave : "0",
              idLob: params.idLob ? params.idLob : 0,
              idCampaign: params.idCampaign ? params.idCampaign : 0
            }
          };
          _context3.next = 3;
          return regeneratorRuntime.awrap((0, _requestTypes.reqWithData)("updateuser", body));

        case 3:
          delUser = _context3.sent;

          if (!delUser.error) {
            _context3.next = 7;
            break;
          }

          ThunkAPI.dispatch((0, _alertsSlice.fullLoadingOff)());
          return _context3.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.showToast)({
            type: "warning",
            title: "Error in the request",
            msj: delUser.error,
            show: true,
            duration: 4000
          })));

        case 7:
          if (!(params.role === "Agent")) {
            _context3.next = 12;
            break;
          }

          _context3.next = 10;
          return regeneratorRuntime.awrap(ThunkAPI.dispatch((0, _userManagePocSlice.userMgeInitData)()));

        case 10:
          _context3.next = 14;
          break;

        case 12:
          _context3.next = 14;
          return regeneratorRuntime.awrap(ThunkAPI.dispatch((0, _userManagementSlice.getDataUsrMge)()));

        case 14:
          ThunkAPI.dispatch((0, _alertsSlice.showToast)({
            type: "success",
            title: "Delete!",
            msj: "The POC has been deleted",
            show: true
          }));
          return _context3.abrupt("return", ThunkAPI.dispatch((0, _alertsSlice.fullLoadingOff)()));

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.deleteUser = deleteUser;