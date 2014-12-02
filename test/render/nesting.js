var should = require('should');
var expect = require('chai').expect;
var path = require('path');

var jsass = require('../../src/index');
var getOutputStrings = require('../utils/outputCompare').getOutputStrings;
var compareFileOutput = require('../utils/outputCompare').compareFileOutput;

var testSCSSPath = path.resolve(__dirname + '/../test-scss/');

describe('Nesting', function () {

  it('should support one level of nesting', function (done) {
    compareFileOutput(testSCSSPath + '/nesting-1.scss', done);
  });

  it('should support multiple levels of nesting', function (done) {
    compareFileOutput(testSCSSPath + '/nesting-2.scss', done);
  });

  it('should support use of parent selectors as a way of nesting (&)', function (done) {
    compareFileOutput(testSCSSPath + '/nesting-3.scss', done);
  });

  xit('should support the use of comma separated selectors', function (done) {
    compareFileOutput(testSCSSPath + '/nesting-4.scss', done);
  });
});