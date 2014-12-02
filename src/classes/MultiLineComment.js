var MultiLineComment = function (str) {
  this.isComment = true;
  if (str[0] === '*') {
    str = str.substring(1, str.length);
  }
  if (str[str.length - 1] === '*') {
    str = str.substring(1, str.length - 1);
  }
  this.str = str;
};

module.exports = MultiLineComment;