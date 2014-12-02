var SCSSVariable = function (str) {
  this.isCssProperty = true;
  this.isTree = false;
  this._property = this.parse(str);
  this.key = this._property.key;
  this.value = this._property.value;
  this.global = this.checkIfGlobal();
};

SCSSVariable.prototype.parse = function (str) {
  var _property = str.split(":");
  var key = _property[0].trim().slice(1); // Remove $ Sign
  var value = _property[1].trim();
  return {
    key: key,
    value: value
  };
};

SCSSVariable.prototype.checkIfGlobal = function () {
  if (this.value.substring(this.value.length - 7) === '!global') {
    this.value = this.value.substring(0, this.value.length - 7).trim();
    return true;
  }
  return false;
};

SCSSVariable.prototype.getValue = function (str) {
  return this.value;
};

SCSSVariable.prototype.getString = function (indentaionLevel, scssTree) {
  return '';
};

SCSSVariable.prototype.isGlobal = function () {
  return this.global;
};

module.exports = SCSSVariable;