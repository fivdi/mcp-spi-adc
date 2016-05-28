'use strict';

var mcpadc = require('../');

var tempSensor = mcpadc.open(5, {speedHz: 20000}, function (err) {
  if (err) throw err;

  setInterval(function () {
    tempSensor.read(function (err, reading) {
      if (err) throw err;

      console.log((reading.value * 3.3 - 0.5) * 100);
    });
  }, 1000);
});

