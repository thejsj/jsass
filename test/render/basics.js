var should = require('should');
var expect = require('chai').expect;
var path = require('path');

var jsass = require('../../src/index');

var testSCSSPath = path.resolve(__dirname + '/../test-scss/');

describe('Basics', function () {
  xit('should return errors using the error attribute', function (done) {
    jsass.render({
      data: '..not#####valid__css / funt-zize: 10px;',
      error: function () {
        expect(true).to.equal(true);
        done();
      },
      success: function () {
        expect(true).to.equal(false);
        done();
      }
    });
  });

  it('should return using the `success` method', function (done) {
    jsass.render({
      data: '.valid-css { font-zize: 10px; }',
      error: function () {
        expect(true).to.equal(false);
        done();
      },
      success: function () {
        expect(true).to.equal(true);
        done();
      }
    });
  });

  it('should return a string', function (done) {
    jsass.render({
      data: '.valid-css { font-zize: 10px; }',
      error: function () {
        expect(true).to.equal(false);
        done();
      },
      success: function (css) {
        expect(css).to.be.a('string');
        done();
      }
    });
  });

  it('should take a file attribute', function (done) {
    jsass.render({
      file: testSCSSPath + '/basic.scss',
      error: function () {
        expect(true).to.equal(false);
        done();
      },
      success: function (css) {
        expect(css).to.be.a('string');
        done();
      }
    });
  });
});