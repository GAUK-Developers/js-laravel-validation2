"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _timezones = _interopRequireDefault(require("./constants/timezones.js"));
var _mimes2 = _interopRequireDefault(require("./constants/mimes.js"));
var _moment = _interopRequireDefault(require("moment"));
var _numeral = _interopRequireDefault(require("numeral"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _default = {
  // TODO test
  accepted: function accepted(_ref) {
    var value = _ref.value;
    return ["yes", "on", 1, true].includes(value);
  },
  // TODO test
  accepted_if: function accepted_if(_ref2) {
    var value = _ref2.value,
      values = _ref2.values,
      params = _ref2.params;
    return values[params[0]] === params[1] && ["yes", "on", 1, true].includes(value);
  },
  // active_url: ({ value }) => {
  //This cannot be supported because JS does not support hostname lookups (dns_get_record in PHP)
  //This could be implemented if there was a reliable way to host a small API to do the lookup
  // },

  // TODO test
  after: function after(_ref3) {
    var value = _ref3.value,
      params = _ref3.params,
      values = _ref3.values;
    return values[params[0]] !== undefined ? b(new Date(value) > new Date(values[params[0]])) : b(new Date(value) > new Date(params[0]));
  },
  // TODO test
  after_or_equal: function after_or_equal(_ref4) {
    var value = _ref4.value,
      params = _ref4.params,
      values = _ref4.values;
    return values[params[0]] !== undefined ? b(new Date(value) >= new Date(values[params[0]])) : b(new Date(value) >= new Date(params[0]));
  },
  alpha: function alpha(_ref5) {
    var value = _ref5.value;
    return b(typeof value === "string") && !/[^a-z]/i.test(value);
  },
  alpha_dash: function alpha_dash(_ref6) {
    var value = _ref6.value;
    return b(typeof value === "string") && /^[A-Za-z\-_]+$/i.test(value);
  },
  // Unicode is still missing!
  alpha_num: function alpha_num(_ref7) {
    var value = _ref7.value;
    return b(typeof value === "string") && /^[a-z0-9]+$/i.test(value);
  },
  // TODO test
  array: function array(_ref8) {
    var value = _ref8.value,
      params = _ref8.params;
    if (!Array.isArray(value)) return false;
    if (params.length && value.length) {
      for (var x in value) {
        if (_typeof(value[x]) !== "object" || value[x] === null) return false;
        var row = value[x];
        var keys = Object.keys(row);
        for (var y in keys) {
          if (!params.includes(keys[y])) return false;
        }
      }
    }
    return true;
  },
  //bail: handled in index.js

  // TODO test
  before: function before(_ref9) {
    var value = _ref9.value,
      params = _ref9.params,
      values = _ref9.values;
    return values[params[0]] !== undefined ? b(new Date(value) < new Date(values[params[0]])) : b(new Date(value) < new Date(params[0]));
  },
  // TODO test
  before_or_equal: function before_or_equal(_ref10) {
    var value = _ref10.value,
      params = _ref10.params,
      values = _ref10.values;
    return values[params[0]] !== undefined ? b(new Date(value) <= new Date(values[params[0]])) : b(new Date(value) <= new Date(params[0]));
  },
  between: function between(_ref11) {
    var value = _ref11.value,
      params = _ref11.params;
    if (typeof value !== "number" && !value) return false;
    var _params = _slicedToArray(params, 2),
      min = _params[0],
      max = _params[1];
    value = sizeOf(value);
    return value >= min && value <= max;
  },
  // TODO test
  "boolean": function boolean(_ref12) {
    var value = _ref12.value;
    return typeof value === "boolean" || [1, 0, "1", "0", "true", "false"].includes(value);
  },
  confirmed: function confirmed(_ref13) {
    var value = _ref13.value,
      key = _ref13.key,
      values = _ref13.values;
    return b(value === values["".concat(key, "_confirmation")]);
  },
  date: function date(_ref14) {
    var value = _ref14.value;
    return b(typeof value !== "number" && !isNaN(Date.parse(value)));
  },
  date_equals: function date_equals(_ref15) {
    var value = _ref15.value,
      params = _ref15.params;
    return Date.parse(value) === Date.parse(params[0]);
  },
  // TODO test
  date_format: function date_format(_ref16) {
    var value = _ref16.value,
      params = _ref16.params;
    return (0, _moment["default"])(value, params[0]).format(params[0]) === value;
  },
  // TODO test
  declined: function declined(_ref17) {
    var value = _ref17.value;
    return ["no", "off", 0, false].includes(value);
  },
  // TODO test
  declined_if: function declined_if(_ref18) {
    var value = _ref18.value,
      params = _ref18.params,
      values = _ref18.values;
    return values[params[0]] === params[1] && ["no", "off", 0, false].includes(value);
  },
  different: function different(_ref19) {
    var value = _ref19.value,
      values = _ref19.values,
      params = _ref19.params;
    return b(value !== values[params[0]]);
  },
  //allows same arrays and objects

  digits: function digits(_ref20) {
    var value = _ref20.value,
      params = _ref20.params;
    return !isNaN(value) && (typeof value === "number" || b(value)) && value.toString().length === parseInt(params[0]);
  },
  digits_between: function digits_between(_ref21) {
    var value = _ref21.value,
      params = _ref21.params;
    if (typeof value !== "number" && !b(value)) {
      return false;
    }
    var len = value.toString().length;
    var _params2 = _slicedToArray(params, 2),
      min = _params2[0],
      max = _params2[1];
    return len >= min && len <= max;
  },
  dimensions: function dimensions(_ref22) {
    var value = _ref22.value,
      params = _ref22.params;
    if (!value) return false;
    var width = parseInt(value.width);
    var height = parseInt(value.height);
    for (var i = 0; i < params.length; i++) {
      var param = params[i];
      if (!param) continue;
      var pair = param.split("=");
      var paramVal = parseInt(pair[1]);
      switch (pair[0]) {
        case "width":
          if (width !== paramVal) return false;
          break;
        case "min_width":
          if (width < paramVal) return false;
          break;
        case "max_width":
          if (width > paramVal) return false;
          break;
        case "height":
          if (height !== paramVal) return false;
          break;
        case "min_height":
          if (height < paramVal) return false;
          break;
        case "max_height":
          if (height > paramVal) return false;
          break;
      }
    }
    return true;
  },
  distinct: function distinct(_ref23) {
    var values = _ref23.values,
      value = _ref23.value;
    return Object.keys(values).reduce(function (count, key) {
      if (deepEquals(values[key], value)) {
        count++;
      }
      return count;
    }, 0) <= 1;
  },
  email: function email(_ref24) {
    var value = _ref24.value;
    return /^\w+([\.+-_]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(value);
  },
  ends_with: function ends_with(_ref25) {
    var value = _ref25.value,
      params = _ref25.params;
    if (Array.isArray(value)) {
      value = value.join("");
    }
    return String(value).endsWith(params[0]);
  },
  // enum

  // exclude

  // exclude unless

  // exclude with

  // exclude without

  // exists

  file: function file(_ref26) {
    var value = _ref26.value;
    return value instanceof File;
  },
  filled: function filled(_ref27) {
    var value = _ref27.value;
    return isNotEmpty(value);
  },
  // TODO test
  gt: function gt(_ref28) {
    var value = _ref28.value,
      values = _ref28.values,
      params = _ref28.params;
    return values[params[0]] !== undefined ? value > toNumber(values[params[0]]) : value > toNumber(params[0]);
  },
  // TODO test
  gte: function gte(_ref29) {
    var value = _ref29.value,
      values = _ref29.values,
      params = _ref29.params;
    return values[params[0]] !== undefined ? value >= toNumber(values[params[0]]) : value >= toNumber(params[0]);
  },
  image: function image(_ref30) {
    var value = _ref30.value;
    return value instanceof Image;
  },
  "in": function _in(_ref31) {
    var value = _ref31.value,
      params = _ref31.params;
    return params.findIndex(function (param) {
      return deepEquals(param, value);
    }) !== -1;
  },
  in_array: function in_array(_ref32) {
    var value = _ref32.value,
      values = _ref32.values,
      params = _ref32.params;
    var array = values[params[0]];
    if (!Array.isArray(array)) return false;
    return array.findIndex(function (arrayVal) {
      return deepEquals(arrayVal, value);
    }) !== -1;
  },
  integer: function integer(_ref33) {
    var value = _ref33.value;
    return Number.isInteger(typeof value === "string" ? parseInt(value) : value);
  },
  ip: function ip(_ref34) {
    var value = _ref34.value;
    return isIpv4(value) || checkipv6(value);
  },
  ipv4: function ipv4(_ref35) {
    var value = _ref35.value;
    return isIpv4(value);
  },
  ipv6: function ipv6(_ref36) {
    var value = _ref36.value;
    return checkipv6(value);
  },
  json: function json(_ref37) {
    var value = _ref37.value;
    if (typeof value !== "string") return false;
    try {
      JSON.parse(value);
    } catch (e) {
      return false;
    }
    return true;
  },
  lt: function lt(_ref38) {
    var value = _ref38.value,
      values = _ref38.values,
      params = _ref38.params;
    return value < values[params[0]];
  },
  lte: function lte(_ref39) {
    var value = _ref39.value,
      values = _ref39.values,
      params = _ref39.params;
    return value <= values[params[0]];
  },
  // TODO: test
  // Created by luthraG
  // https://github.com/luthraG/is-mac-address
  mac_address: function mac_address(_ref40) {
    var value = _ref40.value;
    return value && /^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$/.test(value);
  },
  max: function max(_ref41) {
    var value = _ref41.value,
      params = _ref41.params;
    return (b(value) || typeof value === "number") && sizeOf(value) <= params[0];
  },
  mimetypes: function mimetypes(_ref42) {
    var value = _ref42.value,
      params = _ref42.params;
    if (!value || !value.type) {
      return false;
    }
    return params.includes(value.type);
  },
  mimes: function mimes(_ref43) {
    var value = _ref43.value,
      params = _ref43.params;
    if (!value || !value.type) {
      return false;
    }
    for (var i = 0; i < params.length; i++) {
      var param = params[i];
      var mimeType = _mimes2["default"][param];
      if (!mimeType) {
        console.warn("Invalid mime specified: ".concat(param));
        continue;
      }
      if (value.type === mimeType) return true;
    }
    return false;
  },
  min: function min(_ref44) {
    var value = _ref44.value,
      params = _ref44.params;
    return (b(value) || typeof value === "number") && sizeOf(value) >= params[0];
  },
  // TODO test
  multiple_of: function multiple_of(_ref45) {
    var value = _ref45.value,
      params = _ref45.params;
    return typeof value === "number" && params[0] && toNumber(value) !== 0 && toNumber(params[0]) % value === 0;
  },
  not_in: function not_in(_ref46) {
    var value = _ref46.value,
      params = _ref46.params;
    return params.findIndex(function (param) {
      return deepEquals(param, value);
    }) === -1;
  },
  //not_regex

  //nullable: implemented in `validateField` method (index.js)

  // TODO test
  numeric: function numeric(_ref47) {
    var value = _ref47.value;
    if (typeof value === "number") {
      return true;
    }
    if (!value) {
      return false;
    }
    if (typeof value === "string" && !isNaN(Number(value))) {
      return true;
    }
    return !isNaN(value);
  },
  // password

  present: function present(_ref48) {
    var value = _ref48.value;
    return value !== undefined;
  },
  // prohibited

  // prohibited_if

  // prohibited_unless

  // prohibits

  // TODO test
  regex: function regex(_ref49) {
    var value = _ref49.value;
    try {
      new RegExp(value);
    } catch (err) {
      return false;
    }
    return true;
  },
  required: function required(_ref50) {
    var value = _ref50.value;
    return isNotEmpty(value);
  },
  required_if: function required_if(_ref51) {
    var value = _ref51.value,
      params = _ref51.params,
      values = _ref51.values;
    return values[params[0]] == params[1] ? isNotEmpty(value) : true;
  },
  required_unless: function required_unless(_ref52) {
    var value = _ref52.value,
      params = _ref52.params,
      values = _ref52.values;
    return values[params[0]] != params[1] ? isNotEmpty(value) : true;
  },
  required_with: function required_with(_ref53) {
    var value = _ref53.value,
      params = _ref53.params,
      values = _ref53.values;
    var required = Object.keys(values).filter(function (key) {
      return params.includes(key) ? b(values[key]) : false;
    }).length > 0;
    return !required || isNotEmpty(value);
  },
  required_with_all: function required_with_all(_ref54) {
    var value = _ref54.value,
      params = _ref54.params,
      values = _ref54.values;
    var required = Object.keys(values).filter(function (key) {
      return params.includes(key) ? isNotEmpty(values[key]) : false;
    }).length === params.length;
    return !required || isNotEmpty(value);
  },
  required_without: function required_without(_ref55) {
    var value = _ref55.value,
      params = _ref55.params,
      values = _ref55.values;
    var required = Object.keys(values).filter(function (key) {
      return params.includes(key) ? !isNotEmpty(values[key]) : false;
    }).length > 0;
    return !required || isNotEmpty(value);
  },
  required_without_all: function required_without_all(_ref56) {
    var value = _ref56.value,
      params = _ref56.params,
      values = _ref56.values;
    var required = Object.keys(values).filter(function (key) {
      return params.includes(key) ? !isNotEmpty(values[key]) : false;
    }).length === params.length;
    return !required || isNotEmpty(value);
  },
  required_if_multiple: function required_if_multiple(_ref57) {
    var value = _ref57.value,
      params = _ref57.params,
      values = _ref57.values;
    var vals = {};
    for (var i = 0; i < params.length; i += 2) {
      vals[params[i]] = params[i + 1];
    }
    var matching = {};
    for (var _i2 = 0, _Object$entries = Object.entries(vals); _i2 < _Object$entries.length; _i2++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
        key = _Object$entries$_i[0],
        val = _Object$entries$_i[1];
      if (values.hasOwnProperty(key)) {
        matching[key] = values[key] == val;
      }
    }
    var required = Object.keys(matching).length === Object.keys(vals).length ? Object.values(matching).every(Boolean) : false;
    console.log("required_if_multiple: ", {
      vals: vals,
      matching: matching,
      required: required
    });
    return !required || isNotEmpty(value);
  },
  // required_array_keys

  same: function same(_ref58) {
    var value = _ref58.value,
      values = _ref58.values,
      params = _ref58.params;
    return b(value === values[params[0]]);
  },
  //allows same arrays and objects

  size: function size(_ref59) {
    var value = _ref59.value,
      params = _ref59.params;
    var size = !b(value) && typeof value !== "number" ? 0 : sizeOf(value);
    return size === parseInt(params[0]);
  },
  starts_with: function starts_with(_ref60) {
    var value = _ref60.value,
      params = _ref60.params;
    if (Array.isArray(value)) {
      value = value.join("");
    }
    return String(value).startsWith(params[0]);
  },
  string: function string(_ref61) {
    var value = _ref61.value;
    return typeof value === "string";
  },
  timezone: function timezone(_ref62) {
    var value = _ref62.value;
    return _timezones["default"].includes(value);
  },
  // unique

  url: function url(_ref63) {
    var value = _ref63.value;
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
  },
  uuid: function uuid(_ref64) {
    var value = _ref64.value;
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
  }
};
/*****************************/
/** START OF UTIL FUNCTIONS **/
/*****************************/
//These functions are tested through rules that use them
exports["default"] = _default;
function isNotEmpty(value) {
  return typeof value === "number" || typeof value === "boolean" || !!value;
}
function sizeOf(value) {
  //TODO files, images other things
  if (value.hasOwnProperty("length")) {
    value = value.length;
  }
  return value;
}
function b(value) {
  return !!value;
}
function isIpv4(value) {
  return /^(?:\d{1,3}(?:\.|$)){4}/.test(value);
}

// Created by Dartware
//http://download.dartware.com/thirdparty/ipv6validator.js
function checkipv6(str) {
  return /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(str);
}
function deepEquals(x, y) {
  if (x === y) {
    return true;
  } else if (_typeof(x) == "object" && x != null && _typeof(y) == "object" && y != null) {
    if (Object.keys(x).length != Object.keys(y).length) return false;
    for (var prop in x) {
      if (y.hasOwnProperty(prop)) {
        if (!deepEquals(x[prop], y[prop])) return false;
      } else return false;
    }
    return true;
  } else return false;
}

// Attempts to convert a value to a number
function toNumber(value) {
  var result = (0, _numeral["default"])(value).value();
  return result === null ? 0 : result;
}