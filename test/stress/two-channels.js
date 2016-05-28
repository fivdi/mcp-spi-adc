'use strict';

var mcpadc = require('../../'),
  assert = require('assert'),
  tempReading,
  tempCount = 0,
  voltageReading,
  voltageCount = 0;

var tempSensor = mcpadc.open(5, {speedHz: 20000}, function (err) {
  assert(!err, 'can\'t open temp sensor');

  (function next() {
    tempSensor.read(function (err, reading) {
      assert(!err, 'can\'t read temp sensor');
      tempReading = reading;
      tempCount += 1;
      next();
    });
  })();
});

var voltageSensor = mcpadc.open(4, function (err) {
  assert(!err, 'can\'t open voltage sensor');

  (function next() {
    voltageSensor.read(function (err, reading) {
      assert(!err, 'can\'t read voltage sensor');
      voltageReading = reading;
      voltageCount += 1;
      next();
    });
  })();
});

setInterval(function () {
  console.log(
    'tc: ' + tempCount +
    ', t: ' + ((tempReading.value * 3.3 - 0.5) * 100) +
    ', vc: ' + voltageCount +
    ', v: ' + (voltageReading.value * 3.3)
  );
}, 1000);

