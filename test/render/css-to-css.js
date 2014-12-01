var should = require('should');
var expect = require('chai').expect;

var jsass = require('../../src/index');
var outputCompare = require('../utils/outputCompare');

describe('CSS to CSS', function () {
  it('should take straight CSS and Indent it in the corresponding output style', function (done) {
    outputCompare({
        'data': 'body { background: black; }'
      },
      function (sassString, jsassString) {
        console.log('sassString:');
        console.log(sassString);
        expect(jsassString).to.equal(sassString);
      }
    );
  });
});