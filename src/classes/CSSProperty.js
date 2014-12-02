var utils = require('../utils');

var CSSProperty = function (str) {
  this.isCssProperty = true;
  this.isTree = false;
  this._property = this.parse(str);
  this.key = this._property.key;
  this.value = this._property.value;
};

CSSProperty.prototype.parse = function (str) {
  var _property = str.split(":");
  var key = _property[0].trim();
  var value = _property[1].trim();
  return {
    key: key,
    value: value
  };
};

CSSProperty.prototype.getString = function (indentationLevel, scssTree) {
  return this.key + ': ' + this.getValue(this.value, scssTree) + ';';
};

CSSProperty.prototype.getValue = function (val, scssTree) {
  if (utils.isVariable(val)) {
    var varName = utils.getVariableName(val);
    return utils.getVariableValue(varName, scssTree);
  }
  return val;
};

module.exports = CSSProperty;