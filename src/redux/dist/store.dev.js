"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.store = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _loginSlice = _interopRequireDefault(require("./loginSlice"));

var _campContentSlice = _interopRequireDefault(require("./SuperAdmin/campContentSlice"));

var _userManagementSlice = _interopRequireDefault(require("./SuperAdmin/userManagementSlice"));

var _cousesManageSlice = _interopRequireDefault(require("./SuperAdmin/cousesManageSlice"));

var _userManagePocSlice = _interopRequireDefault(require("./POC/userManagePocSlice"));

var _alertsSlice = _interopRequireDefault(require("./alertsSlice"));

var _courseManageSlice = _interopRequireDefault(require("./firebase/courseManageSlice"));

var _usersFormSlice = _interopRequireDefault(require("./usersFormSlice"));

var _waveFormSlice = _interopRequireDefault(require("./POC/waveFormSlice"));

var _contentManagePocSlice = _interopRequireDefault(require("./POC/contentManagePocSlice"));

var _learningPlanSlice = _interopRequireDefault(require("./POC/learningPlanSlice"));

var _assignmentSlice = _interopRequireDefault(require("./POC/assignmentSlice"));

var _analyticsPocSlice = _interopRequireDefault(require("./POC/analyticsPocSlice"));

var _meetingSlice = _interopRequireDefault(require("./POC/meetingSlice"));

var _coursesAgentSlice = _interopRequireDefault(require("./User/coursesAgentSlice"));

var _responsiveSlice = _interopRequireDefault(require("./responsiveSlice"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var store = (0, _toolkit.configureStore)({
  reducer: {
    login: _loginSlice["default"],
    alerts: _alertsSlice["default"],
    usrForm: _usersFormSlice["default"],
    wavesForm: _waveFormSlice["default"],
    campaigns: _campContentSlice["default"],
    usrManage: _userManagementSlice["default"],
    courses: _cousesManageSlice["default"],
    usrManagePoc: _userManagePocSlice["default"],
    fileManageFB: _courseManageSlice["default"],
    learningP: _learningPlanSlice["default"],
    contentManagePoc: _contentManagePocSlice["default"],
    meetingsManage: _meetingSlice["default"],
    assignment: _assignmentSlice["default"],
    analyticsPoc: _analyticsPocSlice["default"],
    agentLearning: _coursesAgentSlice["default"],
    responsive: _responsiveSlice["default"]
  }
});
exports.store = store;
var _default = store;
exports["default"] = _default;