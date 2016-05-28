'use strict';

var spi = require('spi-device'),
  _ = require('lodash');

var DEFAULT_OPTIONS = {
  busNumber: 0,
  deviceNumber: 0,
  speedHz: 1350000 // See MCP3008 datasheet. 75000 * 18 = 1350000.
};
Object.freeze(DEFAULT_OPTIONS);

function AdcChannel(channel, options, cb) {
  if (!(this instanceof AdcChannel)) {
    return new AdcChannel(channel, options, cb);
  }

  if (!_.isInteger(channel) || channel < 0 || channel > 7) {
    throw RangeError('\'' + channel + '\'' + ' is not a valid channel number');
  }

  this._channel = channel;
  this._readChannelCommand = new Buffer([0x01, 0x80 + (channel << 4), 0x00]);
  this._speedHz = options.speedHz;
  this._device = spi.open(options.busNumber, options.deviceNumber, cb);

  return this;
}

AdcChannel.prototype.read = function (cb) {
  var message = [{
    byteLength: 3,
    sendBuffer: this._readChannelCommand,
    receiveBuffer: new Buffer(3),
    speedHz: this._speedHz
  }];

  this._device.transfer(message, function (err, message) {
    var reading = {};

    if (err) {
      return cb(err);
    }

    reading.rawValue = ((message[0].receiveBuffer[1] & 0x03) << 8) +
      message[0].receiveBuffer[2];
    reading.value = reading.rawValue / 1023;

    cb(null, reading);
  });

  return this;
}

AdcChannel.prototype.close = function (cb) {
  this._device.close(cb);

  return null;
}

module.exports.openMcp3008 = function (channel, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = undefined;
  }

  options = options ? _.defaults(options, DEFAULT_OPTIONS) : DEFAULT_OPTIONS;

  return new AdcChannel(channel, options, cb)
};

module.exports.open = module.exports.openMcp3008;

