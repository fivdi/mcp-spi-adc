'use strict';

var mcpadc = require('../'),
  assert = require('assert');

var channels = [
  // ok
  0,
  7,

  // errors
  -1,
  8,
  undefined,
  null,
  'Hello, World!',
  '',
  '4',
  [],
  {},
  function () {},
  true,
  false,
  3.142,
  NaN,
  Infinity
];

channels.forEach(function (channel) {
  try {
    var sensor = mcpadc.open(channel, {}, function (err) {
      assert(!err, 'can\'t open sensor');
      assert(channel >= 0 && channel <= 7 , 'invalid channel opened');

      console.log('  channel: ' + channel);

      sensor.close(function (err) {
        assert(!err, 'can\'t close sensor');
      });
    });
  } catch (e) {
    assert(channel !== 0 && channel !== 7, 'valid channel not opened');
  }
});

