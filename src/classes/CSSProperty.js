var CSSProperty = function (str) {
  this.isCssProperty = true;
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

module.exports = CSSProperty;