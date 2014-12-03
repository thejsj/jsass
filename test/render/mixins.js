var should = require('should');
var expect = require('chai').expect;
var path = require('path');

var jsass = require('../../src/index');
var getOutputStrings = require('../utils/outputCompare').getOutputStrings;
var compareFileOutput = require('../utils/outputCompare').compareFileOutput;

var testSCSSPath = path.resolve(__dirname + '/../test-scss/');

describe('Mixins', function () {
  it('should not include mixins in final CSS', function (done) {
    compareFileOutput(testSCSSPath + '/mixins/1.scss', done);
  });

  it('should render mixins when asked to', function (done) {
    compareFileOutput(testSCSSPath + '/mixins/2.scss', done);
  });

  it('should render mixins with multiple levels of indentation ', function (done) {
    compareFileOutput(testSCSSPath + '/mixins/3.scss', done);
  });

  it('should be able to pass arguments into a mixin', function (done) {
    compareFileOutput(testSCSSPath + '/mixins/4.scss', done);
  });

  it('should be able to pass keyword arguments into a mixin', function (done) {
    compareFileOutput(testSCSSPath + '/mixins/5.scss', done);
  });

  xit('should be able to pass `@content` into a mixin', function (done) {
    compareFileOutput(testSCSSPath + '/mixins/6.scss', done);
  });
});