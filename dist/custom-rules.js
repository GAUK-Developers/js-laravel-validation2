"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addCustomRule = addCustomRule;
exports.clearCustomRules = clearCustomRules;
exports.default = void 0;

var _messages = require("./messages");

var _rules = _interopRequireDefault(require("./rules"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var customRules = {};

function addCustomRule(name, rule, messageHandler) {
  if (_rules.default[name]) {
    throw new Error("Custom rule cannot have same name as an existing rule.");
  }

  customRules[name] = rule;
  (0, _messages.setMessageHandler)(name, messageHandler);
}

function clearCustomRules() {
  var keys = Object.keys(customRules);

  for (var x in keys) {
    delete _messages.messages[keys[x]];
  }

  customRules = (_readOnlyError("customRules"), {});
}

var _default = customRules;
exports.default = _default;