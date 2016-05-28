## mcp-spi-adc

MCP3008 SPI A/D converter driver for **Node.js** on Linux boards like the
Raspberry Pi Zero, 1, 2, or 3.

## Contents

 * [Installation](https://github.com/fivdi/mcp-spi-adc#installation)
 * [Usage](https://github.com/fivdi/mcp-spi-adc#usage)
 * [API documentation](https://github.com/fivdi/mcp-spi-adc#api-documentation)

## Installation

```
npm install mcp-spi-adc
```

## Usage

Determine the temperature using a TMP36 analog temperature sensor wired to
channel 5 on an MCP3008 SPI A/D converter.

<img src="https://raw.githubusercontent.com/fivdi/mcp-spi-adc/master/example/pi-mcp3008-tmp36.png">

```js
var mcpadc = require('mcp-spi-adc');

var tempSensor = mcpadc.open(5, {speedHz: 20000}, function (err) {
  if (err) throw err;

  setInterval(function () {
    tempSensor.read(function (err, reading) {
      if (err) throw err;

      console.log((reading.value * 3.3 - 0.5) * 100);
    });
  }, 1000);
});
```

Note how the optional configuration option speedHz is used to configure the
bitrate in Hertz for reading the value from the TMP36 temperature sensor. The
default bitrate is 1350000 but lowering it to 20000 gives a more acurate
temperature reading.

## API documentation

All methods are asynchronous and take a completion callback as their last
argument. The arguments passed to the completion callback depend on the
method, but the first argument is always reserved for an exception. If the
operation was completed successfully, then the first argument will be null
or undefined.

### Functions

- [open(channel[, options], cb)](https://github.com/fivdi/mcp-spi-adc#openchannel-options-cb)

### Class AdcChannel

- [adcChannel.read(cb)](https://github.com/fivdi/mcp-spi-adc#adcchannelreadcb)
- [adcChannel.close(cb)](https://github.com/fivdi/mcp-spi-adc#adcchannelclosecb)

### open(channel[, options], cb)
- channel - the number of the channel to open, 0 through 7
- options - an optional object specifying channel configuration options
- cb - completion callback

Asynchronous open. Returns a new AdcChannel object. The completion callback
gets one argument (err). The AdcChannel object returned should not be used
before the completion callback is called.

The following channel configuration options are supported:

- busNumber - the SPI bus number of the MCP3008, 0 for `/dev/spidev0.n`,
1 for `/dev/spidev1.n`, ..., default 0
- deviceNumber - the SPI device number of the MCP3008, 0 for `/dev/spidevn.0`,
1 for `/dev/spidevn.1`, ..., default 0
- speedHz - a number representing the channel bitrate in Hertz, default 1350000

### adcChannel.read(cb)
- cb - completion callback

Asynchronous read. The completion callback gets two arguments (err,
reading). The reading argument is an object with the following properties:

- value - the value read from the channel scaled to a value between 0 and 1
- rawValue - the value read from the channel, a number between 0 and 1023

Returns this.

### adcChannel.close(cb)
- cb - completion callback

Asynchronous close. The completion callback gets one argument (err). Returns
null.

