'use strict';

const mcpadc = require('../');

const tempSensor = mcpadc.open(5, {speedHz: 20000}, err => {
  if (err) {
    throw err;
  }

  setInterval(_ => {
    tempSensor.read((err, reading) => {
      if (err) {
        throw err;
      }

      console.log((reading.value * 3.3 - 0.5) * 100);
    });
  }, 1000);
});

