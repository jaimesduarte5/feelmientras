"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.feedbackSheet = exports.dataToSendAdmin = exports.validateFields = exports.validateHeaders = void 0;

var _usersHelper = require("./usersHelper");

var _exceljs = _interopRequireDefault(require("exceljs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultHeadersADM = ["Ident", "Name", "Lastname", "Email", "Position", "Country", "Role", "Hire Day", "Hire Month", "Hire Year"];
var defaultHeadersPOC = ["Ident", "Name", "Lastname", "Email", "Position", "Country", "Role", "Hire Day", "Hire Month", "Hire Year", "Wave"];

var validateHeaders = function validateHeaders(headers) {
  if (headers.length === defaultHeadersADM.length) {
    var diferentsArrays = defaultHeadersADM.filter(function (header, index) {
      return header !== headers[index];
    });
    return diferentsArrays;
  }

  if (headers.length === defaultHeadersPOC.length) {
    var _diferentsArrays = defaultHeadersPOC.filter(function (header, index) {
      return header !== headers[index];
    });

    return _diferentsArrays;
  }
}; ///validar fecha inferior a la actual, email, pais, role, crear array to send


exports.validateHeaders = validateHeaders;

var validateFields = function validateFields(data, userData) {
  var roleOptions = ["Super Admin", "Poc"];
  var countries = ["Colombia", "Peru", "Guyana", "Nicaragua"];
  var obj = {};
  var rep = [];

  if (userData.role === "Poc") {
    var val = data.filter(function (row, i) {
      obj = {
        row: "row # ".concat(i + 2),
        ident: row[0],
        name: row[1],
        lastname: row[2],
        email: row[3],
        position: row[4],
        country: row[5],
        role: row[6],
        hireD: row[7],
        hireM: row[8],
        hireY: row[9],
        wave: row[10]
      };

      if (row.length !== defaultHeadersPOC.length) {
        rep.push(_objectSpread({}, obj, {
          row: "row # ".concat(i + 2, " with extra fields")
        }));
        return true;
      }

      var error = row.filter(function (col, index) {
        if (index === 0) {
          if (col === undefined || isNaN(col)) {
            obj = _objectSpread({}, obj, {
              ident: "Empty value in the row # ".concat(i + 2, ", field Ident")
            });
            return true;
          }

          return false;
        } else if (index === 1) {
          if (col === undefined || col === "") {
            obj = _objectSpread({}, obj, {
              name: "Empty value in the row # ".concat(i + 2, ", field Name")
            });
            return true;
          }

          return false;
        } else if (index === 2) {
          if (col === undefined || col === "") {
            obj = _objectSpread({}, obj, {
              lastname: "Empty value in the row # ".concat(i + 2, ", field Lastname")
            });
            return true;
          }

          return false;
        } else if (index === 3) {
          //email
          if (col === undefined || col === "" || (0, _usersHelper.valEmail)(col)) {
            obj = _objectSpread({}, obj, {
              email: "Empty value or wrong business email in the row # ".concat(i + 1, ", field Email")
            });
            return true;
          }

          return false;
        } else if (index === 4) {
          if (col === undefined || col === "") {
            obj = _objectSpread({}, obj, {
              position: "Empty value in the row # ".concat(i + 2, ", field Position")
            });
            return true;
          }

          return false;
        } else if (index === 5) {
          if (col === undefined || !countries.includes(col)) {
            obj = _objectSpread({}, obj, {
              country: "Empty value or wrong country in the row # ".concat(i + 2, ", field Country")
            });
            return true;
          }

          return false;
        } else if (index === 6) {
          if (col === undefined || !["Agent"].includes(col)) {
            obj = _objectSpread({}, obj, {
              role: "Empty value or wrong role in the row # ".concat(i + 2, ", filed Role")
            });
            return true;
          }

          return false;
        } else if (index === 7) {
          if (col === undefined || isNaN(col) || col < 1 || col > 31) {
            obj = _objectSpread({}, obj, {
              hireD: "Empty value or is not a day value in the row # ".concat(i + 2, ", field Hire Day")
            });
            return true;
          }

          return false;
        } else if (index === 8) {
          if (col === undefined || isNaN(col) || col < 1 || col > 12) {
            obj = _objectSpread({}, obj, {
              hireM: "Empty value or is not a month value in the row # ".concat(i + 2, ", field Hire Month")
            });
            return true;
          }

          return false;
        } else if (index === 9) {
          if (col === undefined || col === "" || isNaN(col) || col > new Date().getFullYear()) {
            obj = _objectSpread({}, obj, {
              hireY: "Empty value or is not a year value in the row # ".concat(i + 2, ", field Hire Year")
            });
            return true;
          }

          return false;
        } else if (index === 10) {
          if (col === undefined || col === "") {
            obj = _objectSpread({}, obj, {
              wave: "Empty value in the row # ".concat(i + 2, ", field Wave")
            });
            return true;
          }

          return false;
        } else {
          return true;
        }
      });

      if (error.length > 0) {
        rep.push(obj);
        return true;
      } else {
        return false;
      }
    });
    return {
      val: val,
      rep: rep
    };
  } else {
    var _val = data.filter(function (row, i) {
      obj = {
        row: "row # ".concat(i + 2),
        ident: row[0],
        name: row[1],
        lastname: row[2],
        email: row[3],
        position: row[4],
        country: row[5],
        role: row[6],
        hireD: row[7],
        hireM: row[8],
        hireY: row[9]
      };

      if (row.length !== defaultHeadersADM.length) {
        rep.push(_objectSpread({}, obj, {
          row: "row # ".concat(i + 2, " with extra fields")
        }));
        return true;
      }

      var error = row.filter(function (col, index) {
        if (index === 0) {
          if (col === undefined || isNaN(col)) {
            obj = _objectSpread({}, obj, {
              ident: "Empty value in the row # ".concat(i + 2, ", field Ident")
            });
            return true;
          }

          return false;
        } else if (index === 1) {
          if (col === undefined || col === "") {
            obj = _objectSpread({}, obj, {
              name: "Empty value in the row # ".concat(i + 2, ", field Name")
            });
            return true;
          }

          return false;
        } else if (index === 2) {
          if (col === undefined || col === "") {
            obj = _objectSpread({}, obj, {
              lastname: "Empty value in the row # ".concat(i + 2, ", field Lastname")
            });
            return true;
          }

          return false;
        } else if (index === 3) {
          //email
          if (col === undefined || col === "" || (0, _usersHelper.valEmail)(col)) {
            obj = _objectSpread({}, obj, {
              email: "Empty value or wrong business email in the row # ".concat(i + 1, ", field Email")
            });
            return true;
          }

          return false;
        } else if (index === 4) {
          if (col === undefined || col === "") {
            obj = _objectSpread({}, obj, {
              position: "Empty value in the row # ".concat(i + 2, ", field Position")
            });
            return true;
          }

          return false;
        } else if (index === 5) {
          if (col === undefined || !countries.includes(col)) {
            obj = _objectSpread({}, obj, {
              country: "Empty value or wrong country in the row # ".concat(i + 2, ", field Country")
            });
            return true;
          }

          return false;
        } else if (index === 6) {
          if (col === undefined || !roleOptions.includes(col)) {
            obj = _objectSpread({}, obj, {
              role: "Empty value or wrong role in the row # ".concat(i + 2, ", filed Role")
            });
            return true;
          }

          return false;
        } else if (index === 7) {
          if (col === undefined || isNaN(col) || col < 1 || col > 31) {
            obj = _objectSpread({}, obj, {
              hireD: "Empty value or is not a day value in the row # ".concat(i + 2, ", field Hire Day")
            });
            return true;
          }

          return false;
        } else if (index === 8) {
          if (col === undefined || isNaN(col) || col < 1 || col > 12) {
            obj = _objectSpread({}, obj, {
              hireM: "Empty value or is not a month value in the row # ".concat(i + 2, ", field Hire Month")
            });
            return true;
          }

          return false;
        } else if (index === 9) {
          if (col === undefined || col === "" || isNaN(col) || col > new Date().getFullYear()) {
            obj = _objectSpread({}, obj, {
              hireY: "Empty value or is not a year value in the row # ".concat(i + 2, ", field Hire Year")
            });
            return true;
          }

          return false;
        } else {
          return true;
        }
      });

      if (error.length > 0) {
        rep.push(obj);
        return true;
      } else {
        return false;
      }
    });

    return {
      val: _val,
      rep: rep
    };
  }
};

exports.validateFields = validateFields;

var dataToSendAdmin = function dataToSendAdmin(data, userData) {
  if (userData.role === "Poc") {
    var dts = data.map(function (el) {
      var date = "".concat(el[8], "-").concat(el[7], "-").concat(el[9]);
      el.splice(5, 0, date);
      el.splice(8, 3);
      el.splice(1, 0, 0);
      el.splice(10, 2, userData.idLob, userData.idCampaign);
      return el;
    });
    return dts;
  } else {
    var _dts = data.map(function (el) {
      var date = "".concat(el[8], "-").concat(el[7], "-").concat(el[9]);
      el.splice(5, 0, date);
      el.splice(1, 0, 0);
      el.splice(9, 3, "0", 0, 0);
      return el;
    });

    return _dts;
  }
};

exports.dataToSendAdmin = dataToSendAdmin;

var feedbackSheet = function feedbackSheet(data, userData) {
  var fbReportSheet, workbook, fecha, uint8Array, blob, url, a, _fbReportSheet, _workbook, _fecha, _uint8Array, _blob, _url, _a;

  return regeneratorRuntime.async(function feedbackSheet$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(userData.role === "Poc")) {
            _context.next = 18;
            break;
          }

          fbReportSheet = function fbReportSheet(workbook) {
            var worksheet = workbook.getWorksheet("Wrong Rows");
            worksheet.columns = [{
              header: "ROW",
              key: "row"
            }, {
              header: "Ident",
              key: "ident"
            }, {
              header: "Name",
              key: "name"
            }, {
              header: "Lastname",
              key: "lastname"
            }, {
              header: "Email",
              key: "email"
            }, {
              header: "Position",
              key: "position"
            }, {
              header: "Country",
              key: "country"
            }, {
              header: "Role",
              key: "role"
            }, {
              header: "Hire Day",
              key: "hireD"
            }, {
              header: "Hire Month",
              key: "hireM"
            }, {
              header: "Hire Year",
              key: "hireY"
            }, {
              header: "Wave",
              key: "wave"
            }];
            worksheet.addRows(data);
          };

          workbook = new _exceljs["default"].Workbook();
          workbook.addWorksheet("Wrong Rows");
          fbReportSheet(workbook);
          fecha = new Date().toLocaleDateString();
          _context.next = 8;
          return regeneratorRuntime.awrap(workbook.xlsx.writeBuffer());

        case 8:
          uint8Array = _context.sent;
          blob = new Blob([uint8Array], {
            type: "application/octet-binary"
          });
          url = window.URL.createObjectURL(blob);
          a = document.createElement("a");
          a.href = url;
          a.download = "Report_Wrong_Rows_".concat(fecha, ".xlsx");
          a.click();
          a.remove();
          _context.next = 33;
          break;

        case 18:
          _fbReportSheet = function _fbReportSheet(workbook) {
            var worksheet = workbook.getWorksheet("Wrong Rows");
            worksheet.columns = [{
              header: "ROW",
              key: "row"
            }, {
              header: "Ident",
              key: "ident"
            }, {
              header: "Name",
              key: "name"
            }, {
              header: "Lastname",
              key: "lastname"
            }, {
              header: "Email",
              key: "email"
            }, {
              header: "Position",
              key: "position"
            }, {
              header: "Country",
              key: "country"
            }, {
              header: "Role",
              key: "role"
            }, {
              header: "Hire Day",
              key: "hireD"
            }, {
              header: "Hire Month",
              key: "hireM"
            }, {
              header: "Hire Year",
              key: "hireY"
            }];
            worksheet.addRows(data);
          };

          _workbook = new _exceljs["default"].Workbook();

          _workbook.addWorksheet("Wrong Rows");

          _fbReportSheet(_workbook);

          _fecha = new Date().toLocaleDateString();
          _context.next = 25;
          return regeneratorRuntime.awrap(_workbook.xlsx.writeBuffer());

        case 25:
          _uint8Array = _context.sent;
          _blob = new Blob([_uint8Array], {
            type: "application/octet-binary"
          });
          _url = window.URL.createObjectURL(_blob);
          _a = document.createElement("a");
          _a.href = _url;
          _a.download = "Report_Wrong_Rows_".concat(_fecha, ".xlsx");

          _a.click();

          _a.remove();

        case 33:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.feedbackSheet = feedbackSheet;