'use strict';

// The goal of this test is to call open/read/close for all supported chips.
// The chips themselves don't physically exist on the SPI bus but that's not
// of relevance for this test. 

const mcpadc = require('../');
const assert = require('assert');

const openFuncs = [
  mcpadc.openMcp3002,
  mcpadc.openMcp3004,
  mcpadc.openMcp3008,
  mcpadc.openMcp3202,
  mcpadc.openMcp3204,
  mcpadc.openMcp3208,
  mcpadc.openMcp3304
];

openFuncs.forEach((openFunc) => {
  const sensor = openFunc(0, {busNumber: 0, deviceNumber: 1}, (err) => {
    assert(!err, 'can\'t open sensor');
    sensor.read((err, reading) => {
      assert(!err, 'can\'t read sensor');
      console.log(reading.rawValue + ' / ' + reading.value);
      sensor.close((err) => {
        assert(!err, 'can\'t close sensor');
      });
    });
  });
});

