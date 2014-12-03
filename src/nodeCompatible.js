var fs = require('fs');

var jsass = require('./index');

// Overwrite our loadFile method
jsass.loadFile = function (fileName, callback) {
  // This would be different in a browser environment
  fs.readFile(fileName, function (err, buffer) {
    if (err) console.log(err);
    if (callback !== undefined) {
      callback(buffer.toString());
    }
  });
};

module.exports = jsass;