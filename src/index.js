var jsass = {};
var fs = require('fs');

jsass.render = function (jobObject) {
  if (typeof jobObject.success !== 'function') throw new Error('Success Method Required');
  if (jobObject.file !== undefined) {
    this.loadFile(jobObject.file, this.compileSCSSStringIntoCSS.bind(this, jobObject));
  } else if (jobObject.data !== undefined) {
    this.compileSCSSStringIntoCSS(jobObject, jobObject.data);
  }
};

jsass.compileSCSSStringIntoCSS = function (jobObject, cssString) {
  jobObject.success(cssString);
};

jsass.loadFile = function (fileName, callback) {
  // This would be different in a browser environment
  fs.readFile(process.env.PWD + fileName, function (err, buffer) {
    if (callback !== undefined) {
      callback(buffer.toString());
    }
  });
};

try {
  if (module !== undefined && module.exports !== undefined) {
    module.exports = jsass;
  }
} catch (err) {}