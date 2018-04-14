'use strict';

const mcpadc = require('../');
const assert = require('assert');

const channels = [
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
  () => {},
  true,
  false,
  3.142,
  NaN,
  Infinity
];

channels.forEach((channel) => {
  try {
    const sensor = mcpadc.open(channel, {}, (err) => {
      assert(!err, 'can\'t open sensor');
      assert(channel >= 0 && channel <= 7 , 'invalid channel opened');

      console.log('  channel: ' + channel);

      sensor.close((err) => {
        assert(!err, 'can\'t close sensor');
      });
    });
  } catch (e) {
    assert(channel !== 0 && channel !== 7, 'valid channel not opened');
  }
});

