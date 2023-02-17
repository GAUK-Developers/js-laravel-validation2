"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = void 0;
var _rules = _interopRequireDefault(require("./rules"));
var _customRules = _interopRequireDefault(require("./custom-rules"));
var _placeholders = require("./placeholders");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var toExport = {};

// { fieldName: {value, validation} }
function validateForm(_ref) {
  var formData = _ref.formData,
    _ref$includeMessages = _ref.includeMessages,
    includeMessages = _ref$includeMessages === void 0 ? true : _ref$includeMessages;
  if (formData === undefined) {
    console.warn("No formData specified to validateForm.            Make sure to pass an object { formData: {} }");
    return {
      errors: false
    };
  }
  var keys = Object.keys(formData);
  var bail = false;
  var fields = [];
  var errors = [];
  var messages = [];
  var _loop = function _loop() {
    var key = keys[i];
    if (_typeof(formData[key]) !== 'object') {
      return "continue";
    }
    var validationString = formData[key].validation || "";
    var validation = validationString.split('|');
    if (validation.includes('bail')) {
      bail = true;
      if (Object.keys(errors).length > 0) {
        return "break";
      }
    }
    var fieldData = _objectSpread(_objectSpread({}, formData[key]), {}, {
      key: key,
      validation: validation
    });
    if (fieldData.value === undefined) {
      fieldData.value = null;
    }
    var result = toExport.validateField(fieldData, formData);
    if (result.errors) {
      fields.push(key);
      errors.push(result.errors);
      if (includeMessages) {
        var fieldMessages = result.errors.map(function (rule) {
          return (0, _placeholders.generateMessage)(rule, fieldData);
        });
        messages.push(fieldMessages);
      }
      if (bail) {
        return "break";
      }
    }
  };
  for (var i = 0; i < keys.length; i++) {
    var _ret = _loop();
    if (_ret === "continue") continue;
    if (_ret === "break") break;
  }
  if (bail) {
    if (fields.length > 1) {
      //Only first field
      fields = fields.slice(0, 1);
      errors = errors.slice(0, 1);
    }
    if (errors[0].length > 1) {
      //Only first error
      errors[0] = errors[0].slice(0, 1);
    }
  }
  return {
    errors: errors.length === 0 ? false : errors.reduce(function (keyedErrors, fieldErrors, i) {
      fieldErrors = fieldErrors.map(function (rule, j) {
        return includeMessages ? messages[i][j] : rule;
      });
      keyedErrors[fields[i]] = fieldErrors;
      return keyedErrors;
    }, {})
  };
}
function parseRule(rule) {
  var ruleParts = rule.split(':');
  return {
    key: ruleParts[0],
    params: ruleParts[1] ? ruleParts[1].split(',') : []
  };
}

// {key, value, validation}
function validateField(fieldData, formData) {
  var values = formData && Object.keys(formData).reduce(function (values, key) {
    values[key] = formData[key].value;
    return values;
  }, {});
  var validation = fieldData.validation;
  var nullable = validation.includes('nullable');
  var errors = [];
  for (var i = 0; i < validation.length; i++) {
    var rule = void 0;
    try {
      rule = parseRule(validation[i]);
    } catch (e) {
      console.warn("Invalid rule on field ".concat(fieldData.key, " rule=").concat(validation[i]));
      continue;
    }
    if (rule.key === 'nullable') {
      continue;
    }
    if (rule.key === "") {
      continue;
    }
    if (!_rules["default"][rule.key] && !_customRules["default"][rule.key]) {
      console.warn("Could not find rule on field ".concat(fieldData.key, " rule=").concat(validation[i]));
      continue;
    }

    //TODO custom handling for 'sometimes' rule

    var params = _objectSpread(_objectSpread({}, rule), {}, {
      key: fieldData.key,
      value: fieldData.value,
      values: values
    });
    var result = false;
    var overrideNullable = false;
    try {
      if (_rules["default"][rule.key]) {
        result = _rules["default"][rule.key](params);
      } else {
        result = _customRules["default"][rule.key](params);
      }
    } catch (e) {
      console.warn("Error validating rule, most likely invalid params: rule".concat(rule.key, " field=").concat(fieldData.key));
      overrideNullable = true;
    }
    if (!result) {
      if (!overrideNullable && nullable && (fieldData.value === null || fieldData.value === '' || fieldData.value === undefined) && !rule.key.match(/^required_/gi)) {
        continue;
      }
      errors.push(rule.key);
    }
  }
  return {
    errors: errors.length === 0 ? false : errors
  };
}
toExport.validateForm = validateForm;
toExport.validateField = validateField;
toExport.parseRule = parseRule;
var validate = toExport;
exports.validate = validate;