"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentMessageHandlers = getCurrentMessageHandlers;
exports.getMessage = getMessage;
exports.getMessageHandler = getMessageHandler;
exports.messages = void 0;
exports.revertMessageHandlers = revertMessageHandlers;
exports.setMessageHandler = setMessageHandler;
exports.setMessageHandlers = setMessageHandlers;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var messages = {
  accepted: function accepted() {
    return "The :attribute must be accepted.";
  },
  accepted_if: function accepted_if() {
    return "The :attribute must be accepted when :other is :value.";
  },
  // active_url: ({ value }) => {
  //This cannot be supported because JS does not support hostname lookups (dns_get_record in PHP)
  //This could be implemented if there was a reliable way to host a small API to do the lookup
  // },
  after: function after() {
    return "The :attribute must be after :date.";
  },
  after_or_equal: function after_or_equal() {
    return "The :attribute must be after or equal to :date.";
  },
  alpha: function alpha() {
    return "The :attribute may only contain letters.";
  },
  alpha_dash: function alpha_dash() {
    return "The :attribute may only contain letters, numbers, dashes and underscores.";
  },
  // I don't think that's what this rule does
  alpha_num: function alpha_num() {
    return "The :attribute may only contain letters and numbers.";
  },
  array: function array() {
    return "The :attribute must be an array.";
  },
  //bail: is on by default but is `validateForm` call

  before: function before() {
    return "The :attribute must be before :date.";
  },
  before_or_equal: function before_or_equal() {
    return "The :attribute must be before or equal to :date.";
  },
  between: function between() {
    return "The :attribute must be between :min and :max";
  },
  // TODO this one is more complicated

  "boolean": function boolean() {
    return "The :attribute field must be true or false.";
  },
  confirmed: function confirmed() {
    return "The :attribute confirmation does not match.";
  },
  date: function date() {
    return "The :attribute is not a valid date.";
  },
  date_equals: function date_equals() {
    return "The :attribute must be a date equal to :date.";
  },
  date_format: function date_format() {
    return "The :attribute does not match the format :format.";
  },
  declined: function declined() {
    return "You must decline :attribute.";
  },
  declined_if: function declined_if() {
    return "You must decline :attribute if :other is :value.";
  },
  different: function different() {
    return "The :attribute and :other must be different.";
  },
  digits: function digits() {
    return "The :attribute must be :digits digits.";
  },
  digits_between: function digits_between() {
    return "The :attribute must be between :min and :max digits.";
  },
  dimensions: function dimensions() {
    return "The :attribute has invalid image dimensions.";
  },
  distinct: function distinct() {
    return "The :attribute field has a duplicate value.";
  },
  email: function email() {
    return "The :attribute must be a valid email address.";
  },
  file: function file() {
    return "The :attribute must be a file.";
  },
  filled: function filled() {
    return "The :attribute field must have a value.";
  },
  gt: function gt() {
    return "The :attribute must be greater than :value.";
  },
  // TODO this one is more complicated
  gte: function gte() {
    return "The attribute must be greater than or equal to :value.";
  },
  // TODO this one is more complicated

  image: function image() {
    return "The :attribute must be an image.";
  },
  "in": function _in() {
    return "The selected :attribute is invalid.";
  },
  in_array: function in_array() {
    return "The :attribute field does not exist in :other.";
  },
  integer: function integer() {
    return "The :attribute must be an integer.";
  },
  ip: function ip() {
    return "The :attribute must be a valid IP address.";
  },
  ipv4: function ipv4() {
    return "The :attribute must be a valid IPv4 address.";
  },
  ipv6: function ipv6() {
    return "The :attribute must be a valid IPv6 address.";
  },
  json: function json() {
    return "The :attribute must be a valid JSON string.";
  },
  lt: function lt() {
    return "The :attribute must be less than :value.";
  },
  // TODO this is more complicated, and is it done with size?
  lte: function lte() {
    return "The :attribute must be less than or equal to :value.";
  },
  // TODO this is more complicated, and is it done with size?

  mac_access: function mac_access() {
    return "Invalid MAC address.";
  },
  max: function max() {
    return "";
  },
  // TODO this is more complicated, and is it done with size?

  multiple_of: function multiple_of() {
    return "The :attribute must be a multiple of :value.";
  },
  // mimes?
  // mimetypes?

  min: function min() {
    return "";
  },
  // TODO this is more complicated, and is it done with size?

  not_in: function not_in() {
    return "The selected :attribute is invalid.";
  },
  //not_regex

  //nullable: implemented in `validateField` method (index.js)

  numeric: function numeric() {
    return "The :attribute must be a valid number.";
  },
  present: function present() {
    return "The :attribute field must be present.";
  },
  regex: function regex() {
    return "The :attribute is not a valid regular expression.";
  },
  required: function required() {
    return "The :attribute field is required.";
  },
  required_if: function required_if() {
    return "The :attribute field is required when :other is :value.";
  },
  required_unless: function required_unless() {
    return "The :attribute field is required unless :other is in :values.";
  },
  required_with: function required_with() {
    return "The :attribute field is required when :values is present.";
  },
  required_with_all: function required_with_all() {
    return "The :attribute field is required when :values are present.";
  },
  required_without: function required_without() {
    return "The :attribute field is required when :values is not present.";
  },
  required_without_all: function required_without_all() {
    return "The :attribute field is required when none of :values are present.";
  },
  same: function same() {
    return "The :attribute and :other must match.";
  },
  size: function size() {
    return "";
  },
  // TODO this is more complicated

  // TODO starts_with

  string: function string() {
    return "The :attribute must be a string.";
  },
  timezone: function timezone() {
    return "The :attribute must be a valid zone.";
  },
  // TODO unique

  url: function url() {
    return "The :attribute format is invalid.";
  },
  uuid: function uuid() {
    return "The :attribute must be a valid UUID.";
  }
};
exports.messages = messages;
var backupMessages = Object.assign({}, messages);

//export default messages;

function getCurrentMessageHandlers() {
  return messages;
}
function revertMessageHandlers() {
  Object.assign(messages, backupMessages);
}
function setMessageHandlers(newMessages) {
  Object.assign(messages, newMessages);
}
function setMessageHandler(rule, createMessage) {
  setMessageHandlers(_defineProperty({}, rule, createMessage));
}
function getMessage(rule, fieldData) {
  if (messages[rule] === undefined) {
    return "";
  }
  return messages[rule](fieldData);
}
function getMessageHandler(rule) {
  return messages[rule];
}