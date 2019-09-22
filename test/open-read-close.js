'use strict';

const mcpadc = require('../');
const assert = require('assert');

[0, 1, 2, 3, 4].forEach(channelNumber => {
  const sensor = mcpadc.open(channelNumber, {}, err => {
    assert(!err, 'can\'t open sensor');
    sensor.read((err, reading) => {
      assert(!err, 'can\'t read sensor');
      console.log('  ch' + channelNumber + ': ' +
        reading.rawValue + ' / ' + reading.value);
      sensor.close(err => {
        assert(!err, 'can\'t close sensor');
      });
    });
  });
});

