"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PLACEHOLDER_REGEX = exports.DEFAULT_PLACEHOLDERS = void 0;
exports.generateMessage = generateMessage;
var _messages = require("./messages");
var _DEFAULT_PLACEHOLDERS;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var PLACEHOLDER_REGEX = /:([A-z]+[A-z0-9]*)/;
exports.PLACEHOLDER_REGEX = PLACEHOLDER_REGEX;
var DEFAULT_PLACEHOLDERS = (_DEFAULT_PLACEHOLDERS = {
  "after": {
    date: function date(_ref) {
      var params = _ref.params;
      return params[0];
    }
  },
  "after_or_equal": {
    date: function date(_ref2) {
      var params = _ref2.params;
      return params[0];
    }
  },
  "between": {
    min: function min(_ref3) {
      var params = _ref3.params;
      return params[0];
    },
    max: function max(_ref4) {
      var params = _ref4.params;
      return params[1];
    }
  },
  "before": {
    date: function date(_ref5) {
      var params = _ref5.params;
      return params[0];
    }
  },
  "before_or_equal": {
    date: function date(_ref6) {
      var params = _ref6.params;
      return params[0];
    }
  }
}, _defineProperty(_DEFAULT_PLACEHOLDERS, "before", {
  date: function date(_ref7) {
    var params = _ref7.params;
    return params[0];
  }
}), _defineProperty(_DEFAULT_PLACEHOLDERS, "date_equals", {
  date: function date(_ref8) {
    var params = _ref8.params;
    return params[0];
  }
}), _defineProperty(_DEFAULT_PLACEHOLDERS, "dimensions", {
  // TODO
}), _defineProperty(_DEFAULT_PLACEHOLDERS, "ends_with", {
  values: function values(_ref9) {
    var params = _ref9.params;
    return params.length > 1 ? params : params[0];
  }
}), _defineProperty(_DEFAULT_PLACEHOLDERS, "gt", {
  value: function value(_ref10) {
    var params = _ref10.params;
    return params[0];
  }
}), _defineProperty(_DEFAULT_PLACEHOLDERS, "gte", {
  value: function value(_ref11) {
    var params = _ref11.params;
    return params[0];
  }
}), _defineProperty(_DEFAULT_PLACEHOLDERS, "in", {
  values: function values(_ref12) {
    var params = _ref12.params;
    return params;
  }
}), _defineProperty(_DEFAULT_PLACEHOLDERS, "in_array", {
  other: function other(_ref13) {
    var params = _ref13.params;
    return params[0];
  }
}), _defineProperty(_DEFAULT_PLACEHOLDERS, "lt", {
  value: function value(_ref14) {
    var params = _ref14.params;
    return params[0];
  }
}), _defineProperty(_DEFAULT_PLACEHOLDERS, "lte", {
  value: function value(_ref15) {
    var params = _ref15.params;
    return params[0];
  }
}), _defineProperty(_DEFAULT_PLACEHOLDERS, "max", {
  max: function max(_ref16) {
    var params = _ref16.params;
    return params[0];
  }
}), _defineProperty(_DEFAULT_PLACEHOLDERS, "min", {
  min: function min(_ref17) {
    var params = _ref17.params;
    return params[0];
  }
}), _defineProperty(_DEFAULT_PLACEHOLDERS, "required_if", {
  other: function other(_ref18) {
    var params = _ref18.params;
    return params[0];
  },
  value: function value(_ref19) {
    var params = _ref19.params;
    return params[1];
  }
}), _defineProperty(_DEFAULT_PLACEHOLDERS, "required_with", {
  values: function values(_ref20) {
    var params = _ref20.params;
    return params;
  }
}), _defineProperty(_DEFAULT_PLACEHOLDERS, "required_with_all", {
  values: function values(_ref21) {
    var params = _ref21.params;
    return params;
  }
}), _defineProperty(_DEFAULT_PLACEHOLDERS, "required_without", {
  values: function values(_ref22) {
    var params = _ref22.params;
    return params;
  }
}), _defineProperty(_DEFAULT_PLACEHOLDERS, "required_without_all", {
  values: function values(_ref23) {
    var params = _ref23.params;
    return params;
  }
}), _defineProperty(_DEFAULT_PLACEHOLDERS, "required_unless", {
  other: function other(_ref24) {
    var params = _ref24.params;
    return params[0];
  },
  value: function value(_ref25) {
    var params = _ref25.params;
    return params[1];
  }
}), _defineProperty(_DEFAULT_PLACEHOLDERS, "same", {
  other: function other(_ref26) {
    var params = _ref26.params;
    return params[0];
  }
}), _defineProperty(_DEFAULT_PLACEHOLDERS, "size", {
  size: function size(_ref27) {
    var params = _ref27.params;
    return params[0];
  }
}), _defineProperty(_DEFAULT_PLACEHOLDERS, "starts_with", {
  values: function values(_ref28) {
    var params = _ref28.params;
    return params.length > 1 ? params : params[0];
  }
}), _DEFAULT_PLACEHOLDERS);
exports.DEFAULT_PLACEHOLDERS = DEFAULT_PLACEHOLDERS;
function generateMessage(rule, fieldData) {
  var message = (0, _messages.getMessage)(rule, fieldData);
  return replacePlaceholders(message, _objectSpread({
    rule: rule
  }, fieldData));
}
function replacePlaceholders(message, fieldData) {
  var placeholderMatch = message.match(PLACEHOLDER_REGEX);
  while (placeholderMatch) {
    var matchedString = placeholderMatch[0];
    var placeholder = placeholderMatch[1];
    if (placeholder === "attribute") {
      placeholder = "name";
    }
    var replacementValue = fieldData[placeholder];
    if (replacementValue === null || replacementValue === undefined) {
      replacementValue = getDefaultPlaceholderValue(placeholder, fieldData) || "";
    }
    message = message.split(matchedString).join(replacementValue);
    placeholderMatch = message.match(PLACEHOLDER_REGEX);
  }
  return message;
}
function getDefaultPlaceholderValue(placeholder, fieldData) {
  var rulePlaceholders = DEFAULT_PLACEHOLDERS[fieldData.rule];
  if (!rulePlaceholders) {
    return null;
  }
  var placeholderFunc = rulePlaceholders[placeholder];
  try {
    return placeholderFunc && placeholderFunc(fieldData);
  } catch (err) {
    console.error("Warning: the \"".concat(placeholder, "\" property is not defined on ").concat(fieldData.key, "."));
    return null;
  }
}