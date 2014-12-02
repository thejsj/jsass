var MultiLineComment = function (str) {
  this.isComment = true;
  this.isTree = false;
  var foundEndingStar = false;
  if (str[0] === '*') {
    str = str.substring(1, str.length);
  }
  if (!foundEndingStar && str[str.length - 1] === '*') {
    foundEndingStar = true;
    str = str.substring(0, str.length - 1);
  }
  this.str = str;
};

MultiLineComment.prototype.getString = function () {
  return '/*' + this.str + '*/';
};

module.exports = MultiLineComment;