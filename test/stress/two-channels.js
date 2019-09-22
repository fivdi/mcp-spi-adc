'use strict';

const mcpadc = require('../../');
const assert = require('assert');

let tempReading;
let tempCount = 0;
let voltageReading;
let voltageCount = 0;

const tempSensor = mcpadc.open(5, {speedHz: 20000}, err => {
  assert(!err, 'can\'t open temp sensor');

  const next = _ => {
    tempSensor.read((err, reading) => {
      assert(!err, 'can\'t read temp sensor');
      tempReading = reading;
      tempCount += 1;
      next();
    });
  };

  next();
});

const voltageSensor = mcpadc.open(4, err => {
  assert(!err, 'can\'t open voltage sensor');

  const next = _ => {
    voltageSensor.read((err, reading) => {
      assert(!err, 'can\'t read voltage sensor');
      voltageReading = reading;
      voltageCount += 1;
      next();
    });
  };

  next();
});

setInterval(_ => {
  console.log(
    'tc: ' + tempCount +
    ', t: ' + ((tempReading.value * 3.3 - 0.5) * 100) +
    ', vc: ' + voltageCount +
    ', v: ' + (voltageReading.value * 3.3)
  );
}, 1000);

