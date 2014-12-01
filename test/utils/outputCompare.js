var sass = require('node-sass');
var jsass = require('../../src/index');
var _ = require('lodash');

outputCompare = function (dataObject, cb) {
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

module.exports = outputCompare;