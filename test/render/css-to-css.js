var should = require('should');
var expect = require('chai').expect;
var path = require('path');

var jsass = require('../../src/index');
var outputCompare = require('../utils/outputCompare');

var testSCSSPath = path.resolve(__dirname + '/../test-scss/');

describe('CSS to CSS', function () {
  it('should take straight CSS and indent it in the corresponding output style', function (done) {
    outputCompare({
        'data': 'body { background: black; }'
      },
      function (sassString, jsassString) {
        expect(jsassString).to.equal(sassString);
        done();
      }
    );
  });

  it('should take straight CSS from a file and indent it in the corresponding output style', function (done) {
    outputCompare({
        file: testSCSSPath + '/basic.scss',
      },
      function (sassString, jsassString) {
        expect(jsassString).to.equal(sassString);
        done();
      }
    );
  });

  it('should take CSS with multiple properties and output it correctly', function (done) {
    outputCompare({
        file: testSCSSPath + '/basic-2.scss',
      },
      function (sassString, jsassString) {
        expect(jsassString).to.equal(sassString);
        done();
      }
    );
  });

  it('should take CSS with multiple properties and output it correctly', function (done) {
    outputCompare({
        file: testSCSSPath + '/basic-3.scss',
      },
      function (sassString, jsassString) {
        expect(jsassString).to.equal(sassString);
        done();
      }
    );
  });

});