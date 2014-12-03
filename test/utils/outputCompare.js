var _ = require('lodash');
var should = require('should');
var expect = require('chai').expect;

var sass = require('node-sass');
var jsass = require('../../src/nodeCompatible');

var compareFileOutput = function (filePath, done) {
  getOutputStrings({
    file: filePath
  }, function (sassString, jsassString) {
    expect(jsassString).to.equal(sassString);
    done();
  });
};

getOutputStrings = function (dataObject, cb) {
  var __self = {};
  var nodeSassOutput, jSassOutput;

  __self.renderNodeSass = function () {
    sass.render(_.extend({
      success: function (css) {
        nodeSassOutput = css;
        __self.renderJSass();
      },
      error: function (error) {
        console.log(error);
      },
      includePaths: ['lib/', 'mod/'],
      outputStyle: 'nested',
    }, dataObject));
  };

  __self.renderJSass = function () {
    jsass.render(_.extend({
      success: function (css) {
        jSassOutput = css;
        cb(nodeSassOutput, jSassOutput);
      },
      error: function (error) {
        console.log(error);
      },
      outputStyle: 'nested', // Not enabled
    }, dataObject));
  };
  __self.renderNodeSass();
};

module.exports = {
  'getOutputStrings': getOutputStrings,
  'compareFileOutput': compareFileOutput,
};