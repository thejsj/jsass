var should = require('should');
var expect = require('chai').expect;
var path = require('path');

var jsass = require('../../src/index');
var getOutputStrings = require('../utils/outputCompare').getOutputStrings;
var compareFileOutput = require('../utils/outputCompare').compareFileOutput;

var testSCSSPath = path.resolve(__dirname + '/../test-scss/');

describe('Variables', function () {

  it('should support basic string variables', function (done) {
    compareFileOutput(testSCSSPath + '/variables/1.scss', done);
  });

  it('should know about variables in other contexts', function (done) {
    compareFileOutput(testSCSSPath + '/variables/2.scss', done);
  });

  it('should support adding variables to the global context', function (done) {
    jsass.render({
      data: 'body { $example3: blue!global; color: $example3; } h2 { color: $example3; }',
      error: function () {
        expect(false).to.equal(true);
        done();
      },
      success: function (css) {
        expect(css).to.equal('body {\n  color: blue; }\n\nh2 {\n  color: blue; }\n');
        done();
      }
    });
  });
});