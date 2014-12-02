var should = require('should');
var expect = require('chai').expect;
var path = require('path');

var jsass = require('../../src/index');
var getOutputStrings = require('../utils/outputCompare').getOutputStrings;
var compareFileOutput = require('../utils/outputCompare').compareFileOutput;

var testSCSSPath = path.resolve(__dirname + '/../test-scss/');

describe('Comments', function () {

  it('should not compile inline comments', function (done) {
    compareFileOutput(testSCSSPath + '/comments/1.scss', done);
  });

  xit('should include CSS multi-line comments', function (done) {
    compareFileOutput(testSCSSPath + '/comments/2.scss', done);
  });

  xit('should not compile commented code', function (done) {
    compareFileOutput(testSCSSPath + '/comments/3.scss', done);
  });

  xit('should include multi-line CSS commented blocks', function (done) {
    compareFileOutput(testSCSSPath + '/comments/4.scss', done);
  });
});