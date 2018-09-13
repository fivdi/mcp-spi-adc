'use strict';

const spi = require('spi-device');
const clone = require('lodash.clone');

const CONFIG_MCP3008 = Object.freeze({
  channelCount: 8,
  maxRawValue: 1023,
  defaultSpeedHz: 1350000, // See MCP3008 datasheet. 75000 * 18 = 1350000.
  transferLength: 3,
  readChannelCommand: (channel) => {
    return Buffer.from([0x01, 0x80 + (channel << 4), 0x00]);
  },
  rawValue: (buffer) => {
    return ((buffer[1] & 0x03) << 8) + buffer[2];
  }
});

const CONFIG_MCP3004 = clone(CONFIG_MCP3008);
CONFIG_MCP3004.channelCount = 4;
Object.freeze(CONFIG_MCP3004);

const CONFIG_MCP3002 = Object.freeze({
  channelCount: 2,
  maxRawValue: 1023,
  defaultSpeedHz: 1200000, // See MCP3002 datasheet. 75000 * 16 = 1200000.
  transferLength: 2,
  readChannelCommand: (channel) => {
    return Buffer.from([0x68 + (channel << 4), 0x00]);
  },
  rawValue: (buffer) => {
    return ((buffer[0] & 0x03) << 8) + buffer[1];
  }
});

const CONFIG_MCP3208 = Object.freeze({
  channelCount: 8,
  maxRawValue: 4095,
  defaultSpeedHz: 1000000, // See MCP3208 datasheet. 50000 * 20 = 1000000.
  transferLength: 3,
  readChannelCommand: (channel) => {
    return Buffer.from([0x06 + (channel >> 2), (channel & 0x03) << 6, 0x00]);
  },
  rawValue: (buffer) => {
    return ((buffer[1] & 0x0f) << 8) + buffer[2];
  }
});

const CONFIG_MCP3204 = clone(CONFIG_MCP3208);
CONFIG_MCP3204.channelCount = 4;
Object.freeze(CONFIG_MCP3204);

const CONFIG_MCP3202 = Object.freeze({
  channelCount: 2,
  maxRawValue: 4095,
  defaultSpeedHz: 900000, // See MCP3202 datasheet. 50000 * 18 = 900000.
  transferLength: 3,
  readChannelCommand: (channel) => {
    return Buffer.from([0x01, 0xa0 + (channel << 6), 0x00]);
  },
  rawValue: (buffer) => {
    return ((buffer[1] & 0x0f) << 8) + buffer[2];
  }
});

const CONFIG_MCP3304 = Object.freeze({
  channelCount: 8,
  maxRawValue: 4095,
  defaultSpeedHz: 1050000, // See MCP3304 datasheet. 50000 * 21 = 1050000
  transferLength: 3,
  readChannelCommand: (channel) => {
    return Buffer.from([0x0c + (channel >> 1), (channel & 0x01) << 7, 0x00]);
  },
  rawValue: (buffer) => {
    return ((buffer[1] & 0x0f) << 8) + buffer[2];
  }
});

class AdcChannel {
  constructor(config, channel, options, cb) {
    if (typeof options === 'function') {
      cb = options;
      options = {};
    }

    if (!Number.isInteger(channel) ||
        channel < 0 ||
        channel > config.channelCount - 1) {
      throw RangeError(
        '\'' + channel + '\'' + ' is not a valid channel number'
      );
    }

    this._config = config;
    this._readChannelCommand = config.readChannelCommand(channel);
    this._speedHz = options.speedHz || config.defaultSpeedHz;
    this._device = spi.open(
      options.busNumber || 0,
      options.deviceNumber || 0,
      cb
    );

    return this;
  }

  read(cb) {
    const message = [{
      byteLength: this._config.transferLength,
      sendBuffer: this._readChannelCommand,
      receiveBuffer: Buffer.alloc(this._config.transferLength),
      speedHz: this._speedHz
    }];

    this._device.transfer(message, (err, message) => {
      const reading = {};

      if (err) {
        return cb(err);
      }

      reading.rawValue = this._config.rawValue(message[0].receiveBuffer);
      reading.value = reading.rawValue / this._config.maxRawValue;

      cb(null, reading);
    });

    return this;
  }

  willRead() {
    return new Promise((resolve, reject) => {

      read((err, data) => {
        if (err) {
          reject(err);
        }

        resolve(data);
      });
    });
  };

  close(cb) {
    this._device.close(cb);
    return null;
  }
}

module.exports.openMcp3002 = (channel, options, cb) => {
  return new AdcChannel(CONFIG_MCP3002, channel, options, cb);
};

module.exports.openMcp3004 = (channel, options, cb) => {
  return new AdcChannel(CONFIG_MCP3004, channel, options, cb);
};

module.exports.openMcp3008 = (channel, options, cb) => {
  return new AdcChannel(CONFIG_MCP3008, channel, options, cb);
};
module.exports.open = module.exports.openMcp3008;

module.exports.willOpen = (channel, options) => {
  return new Promise((resolve, reject) => {
    resolve(new AdcChannel(CONFIG_MCP3008, channel, options, () => {}));
  });
};

module.exports.openMcp3202 = (channel, options, cb) => {
  return new AdcChannel(CONFIG_MCP3202, channel, options, cb);
};

module.exports.openMcp3204 = (channel, options, cb) => {
  return new AdcChannel(CONFIG_MCP3204, channel, options, cb);
};

module.exports.openMcp3208 = (channel, options, cb) => {
  return new AdcChannel(CONFIG_MCP3208, channel, options, cb);
};

module.exports.openMcp3304 = (channel, options, cb) => {
  return new AdcChannel(CONFIG_MCP3304, channel, options, cb);
};
