/**
 * Library for interacting with MCP3XXX devices
 *
 * Supported devices:
 *
 * MCP300X: MCP3002 MCP3004 MCP3008
 *
 * MCP320X: MCP3202 MCP3204 MCP3208
 *
 * MCP330X: MCP3304
 */
declare module "mcp-spi-adc" {
  export type EightChannels = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

  export type FourChannels = 0 | 1 | 2 | 3;

  export type TwoChannels = 0 | 1;

  export type Channels = EightChannels | FourChannels | TwoChannels;

  /**
   * Connect to an MCP3008 ADC
   * ([Datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/21295d.pdf))
   *
   * @param channel Zero-indexed output channel number
   * @param options Configuration values that can be overloaded
   * @param callback Called after establishing a connection to the device
   */
  export function open(
    channel: EightChannels,
    options: McpOptions<EightChannels>,
    callback: (error: string) => void
  ): McpInterface;

  /**
   * Connect to an MCP3008 ADC using the default options
   * ([Datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/21295d.pdf))
   *
   * @param channel Zero-indexed output channel number
   * @param callback Called after establishing a connection to the device
   */
  export function open(
    channel: EightChannels,
    callback: (error: string) => void
  ): McpInterface;

  /**
   * Connect to an MCP3008 ADC
   * ([Datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/21295d.pdf))
   *
   * @param channel Zero-indexed output channel number
   * @param options Configuration values that can be overloaded
   * @param callback Called after establishing a connection to the device
   */
  export function openMcp3008(
    channel: EightChannels,
    options: McpOptions<EightChannels>,
    callback: (error: string) => void
  ): McpInterface;

  /**
   * Connect to an MCP3008 ADC using the default options
   * ([Datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/21295d.pdf))
   *
   * @param channel Zero-indexed output channel number
   * @param callback Called after establishing a connection to the device
   */
  export function openMcp3008(
    channel: EightChannels,
    callback: (error: string) => void
  ): McpInterface;

  /**
   * Connect to an MCP3004 ADC
   * ([Datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/21295d.pdf))
   *
   * @param channel Zero-indexed output channel number
   * @param options Configuration values that can be overloaded
   * @param callback Called after establishing a connection to the device
   */
  export function openMcp3004(
    channel: FourChannels,
    options: McpOptions<FourChannels>,
    callback: (error: string) => void
  ): McpInterface;

  /**
   * Connect to an MCP3002 ADC using the default options
   * ([Datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/21295d.pdf))
   *
   * @param channel Zero-indexed output channel number
   * @param callback Called after establishing a connection to the device
   */
  export function openMcp3004(
    channel: FourChannels,
    callback: (error: string) => void
  ): McpInterface;

  /**
   * Connect to an MCP3002 ADC
   * ([Datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/21294E.pdf))
   *
   * @param channel Zero-indexed output channel number
   * @param options Configuration values that can be overloaded
   * @param callback Called after establishing a connection to the device
   */
  export function openMcp3002(
    channel: TwoChannels,
    options: McpOptions<TwoChannels>,
    callback: (error: string) => void
  ): McpInterface;

  /**
   * Connect to an MCP3002 ADC using the default options
   * ([Datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/21294E.pdf))
   *
   * @param channel Zero-indexed output channel number
   * @param callback Called after establishing a connection to the device
   */
  export function openMcp3002(
    channel: TwoChannels,
    callback: (error: string) => void
  ): McpInterface;

  /**
   * Connect to an MCP3202 ADC
   * ([Datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/21294E.pdf))
   *
   * @param channel Zero-indexed output channel number
   * @param options Configuration values that can be overloaded
   * @param callback Called after establishing a connection to the device
   */
  export function openMcp3202(
    channel: TwoChannels,
    options: McpOptions<TwoChannels>,
    callback: (error: string) => void
  ): McpInterface;

  /**
   * Connect to an MCP3202 ADC using the default options
   * ([Datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/21294E.pdf))
   *
   * @param channel Zero-indexed output channel number
   * @param callback Called after establishing a connection to the device
   */
  export function openMcp3202(
    channel: TwoChannels,
    callback: (error: string) => void
  ): McpInterface;

  /**
   * Connect to an MCP3204 ADC
   * ([Datasheet]https://ww1.microchip.com/downloads/en/DeviceDoc/21298e.pdf))
   *
   * @param channel Zero-indexed output channel number
   * @param options Configuration values that can be overloaded
   * @param callback Called after establishing a connection to the device
   */
  export function openMcp3204(
    channel: FourChannels,
    options: McpOptions<FourChannels>,
    callback: (error: string) => void
  ): McpInterface;

  /**
   * Connect to an MCP3204 ADC using the default options
   * ([Datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/21298e.pdf))
   *
   * @param channel Zero-indexed output channel number
   * @param callback Called after establishing a connection to the device
   */
  export function openMcp3204(
    channel: FourChannels,
    callback: (error: string) => void
  ): McpInterface;

  /**
   * Connect to an MCP3208 ADC
   * ([Datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/21298e.pdf))
   *
   * @param channel Zero-indexed output channel number
   * @param options Configuration values that can be overloaded
   * @param callback Called after establishing a connection to the device
   */
  export function openMcp3208(
    channel: EightChannels,
    options: McpOptions<EightChannels>,
    callback: (error: string) => void
  ): McpInterface;

  /**
   * Connect to an MCP3208 ADC using the default options
   * ([Datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/21298e.pdf))
   *
   * @param channel Zero-indexed output channel number
   * @param callback Called after establishing a connection to the device
   */
  export function openMcp3208(
    channel: EightChannels,
    callback: (error: string) => void
  ): McpInterface;

  /**
   * Connect to an MCP3304 ADC
   * ([Datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/21697F.pdf))
   *
   * @param channel Zero-indexed output channel number
   * @param options Configuration values that can be overloaded
   * @param callback Called after establishing a connection to the device
   */
  export function openMcp3304(
    channel: EightChannels,
    options: McpOptions<EightChannels>,
    callback: (error: string) => void
  ): McpInterface;

  /**
   * Connect to an MCP3304 ADC using the default options
   * ([Datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/21697F.pdf))
   *
   * @param channel Zero-indexed output channel number
   * @param callback Called after establishing a connection to the device
   */
  export function openMcp3304(
    channel: EightChannels,
    callback: (error: string) => void
  ): McpInterface;

  /**
   * SPI device surface area for interacting with the MCP3XXX device
   */
  export interface McpInterface {
    /**
     * Query the device for the current reading
     * @param callback Called after the read command has completed
     */
    read(callback: (error: string, reading: McpReading) => void): void;

    /**
     * Sever communication with the MCP3XXX device
     * @param callback Called after communication has been stopped
     */
    close(callback: (error: string) => void): void;
  }

  export interface McpReading {
    /* Device reading normalized in the range [0, 1] */
    value: number;
    /* Raw counts received from the device */
    rawValue: number;
  }

  interface McpOptions<C extends Channels> {
    /* SPI clock frequency for reaching from the channel */
    speedHz?: number;
    /* SPI bus number, e.g. /dev/spidev0.X*/
    busNumber?: number;
    /* Spi device number, e.g. /dev/spidevX.0 */
    deviceNumber?: C;
  }
}
