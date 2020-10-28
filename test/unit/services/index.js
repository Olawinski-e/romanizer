const chai = require('chai');
const should = chai.should();
const { romanize } = require('../../../services/index');
const EventSource = require('eventsource');
const app = require('../../../index');

describe('Javascript Function', function() {
  context('Romanizer function', function() {
    it('should return the converted romanian number of the numeral arabic 96 which is XCVI', function() {
        const numberToConvert = 96;
        romanize(numberToConvert).should.equal('XCVI');
    });

    it('should return the converted romanian number of the numeral arabic 22 which is XXII', function() {
      const numberToConvert = 22;
      romanize(numberToConvert).should.equal('XXII');
    });
  });
});