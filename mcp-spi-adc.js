'use strict';

var spi = require('spi-device'),
  _ = require('lodash');

var CONFIG_MCP3008 = {
  channelCount: 8,
  maxRawValue: 1023,
  defaultSpeedHz: 1350000, // See MCP3008 datasheet. 75000 * 18 = 1350000.
  transferLength: 3,
  readChannelCommand: function (channel) {
    return new Buffer([0x01, 0x80 + (channel << 4), 0x00]);
  },
  rawValue: function (buffer) {
    return ((buffer[1] & 0x03) << 8) + buffer[2];
  }
}
Object.freeze(CONFIG_MCP3008);

var CONFIG_MCP3208 = {
  channelCount: 8,
  maxRawValue: 4095,
  defaultSpeedHz: 1000000, // See MCP3208 datasheet. 50000 * 20 = 1000000.
  transferLength: 3,
  readChannelCommand: function (channel) {
    return new Buffer([0x06 + (channel >> 2), (channel & 0x03) << 6, 0x00]);
  },
  rawValue: function (buffer) {
    return ((buffer[1] & 0x0f) << 8) + buffer[2];
  }
}
Object.freeze(CONFIG_MCP3208);

function AdcChannel(config, channel, options, cb) {
  if (!(this instanceof AdcChannel)) {
    return new AdcChannel(config, channel, options, cb);
  }

  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  if (!_.isInteger(channel) || channel < 0 || channel > config.channelCount - 1) {
    throw RangeError('\'' + channel + '\'' + ' is not a valid channel number');
  }

  this._config = config;
  this._readChannelCommand = config.readChannelCommand(channel);
  this._speedHz = options.speedHz || config.defaultSpeedHz;
  this._device = spi.open(options.busNumber || 0, options.deviceNumber || 0, cb);

  return this;
}

AdcChannel.prototype.read = function (cb) {
  var message = [{
    byteLength: this._config.transferLength,
    sendBuffer: this._readChannelCommand,
    receiveBuffer: new Buffer(this._config.transferLength),
    speedHz: this._speedHz
  }];

  this._device.transfer(message, function (err, message) {
    var reading = {};

    if (err) {
      return cb(err);
    }

    reading.rawValue = this._config.rawValue(message[0].receiveBuffer);
    reading.value = reading.rawValue / this._config.maxRawValue;

    cb(null, reading);
  }.bind(this));

  return this;
}

AdcChannel.prototype.close = function (cb) {
  this._device.close(cb);

  return null;
}

module.exports.openMcp3008 = function (channel, options, cb) {
  return new AdcChannel(CONFIG_MCP3008, channel, options, cb);
};

module.exports.open = module.exports.openMcp3008;

module.exports.openMcp3208 = function (channel, options, cb) {
  return new AdcChannel(CONFIG_MCP3208, channel, options, cb);
};

