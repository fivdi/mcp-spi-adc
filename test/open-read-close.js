'use strict';

var mcpadc = require('../'),
  assert = require('assert');

[0, 1, 2, 3, 4].forEach(function (channelNumber) {
  var sensor = mcpadc.open(channelNumber, {}, function (err) {
    assert(!err, 'can\'t open sensor');
    sensor.read(function (err, reading) {
      assert(!err, 'can\'t read sensor');
      console.log('  ch' + channelNumber + ': ' +
        reading.rawValue + ' / ' + reading.value);
      sensor.close(function (err) {
        assert(!err, 'can\'t close sensor');
      });
    });
  });
});

