/** The TbsRt (TBS RaceTracker) class handles communication to a TBS RaceTracker device */
// RACETRACKER_SERVICE = 0000fff0-0000-1000-8000-00805f9b34fb (fff0) @ handle: 0x0023
// READ_CHARACTERISTIC = 0000fff2-0000-1000-8000-00805f9b34fb (fff2) @ handle: 0x0027
// WRITE_CHARACTERISTIC = 0000fff1-0000-1000-8000-00805f9b34fb (fff1) @ handle: 0x0024
// DEVICE_SERVICE = 0000180a-0000-1000-8000-00805f9b34fb (180a) @ handle: 0x0010
// FIRMWARE_CHARACTERISTIC = 00002a26-0000-1000-8000-00805f9b34fb (2a26) @ handle 0x0018

import config from './config.json';

// regex expressions used to cleanup tracker responses
const RE_PERCENT = /(\d+.\d+)%/;

export class TbsRt {
  constructor() {
    this._config = { ...config };
  }

  static get() {
    if (!TbsRt._instance) {
      TbsRt._instance = new TbsRt();
    }
    return TbsRt._instance;
  }

  /** Convert a command string to bytes for sending to RaceTracker */
  strToBytes(string) {
    var array = new Uint8Array(string.length);
    for (var i = 0, l = string.length; i < l; i++) {
      array[i] = string.charCodeAt(i);
    }
    return array.buffer;
  }

  /** Convert bytes from RaceTracker response to string */
  bytesToStr(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
  }

  /** Lookup command, prepare any additional arguments and convert to bytes
  /*  key: the command lookup value in config.json
  /*  options: any additional parameters needed for the commands */
  prepareCommand(key, options) {
    return new Promise((resolve, reject) => {
      let cmd = this._config.commands[key];
      switch (key) {
        case 'moreComplexCommand':
          // do more complex things with the opts object
          break;
        default:
          break;
      }
      resolve(this.strToBytes(cmd));
    });
  }

  /** Convert RaceTracker response from bytes to string and do any additional formatting */
  prepareResponse(key, result) {
    return new Promise((resolve, reject) => {
      let response = this.bytesToStr(result);
      switch (key) {
        case 'getBatteryLevel':
          let chunks = response.match(RE_PERCENT);
          response = Math.round(chunks[1]);
          break;
        default:
          break;
      }
      resolve(response);
    });
  }

  /** Send a command to RaceTracker WRITE_CHARACTERISTIC */
  writeCommand(cmd, device_id) {
    return new Promise((resolve, reject) => {
      window.ble.write(
        device_id,
        this._config.racetracker_service,
        this._config.write,
        cmd,
        data => resolve(data),
        error => reject(error)
      );
    });
  }

  /** Read result of a command sent to a RaceTracker at READ_CHARACTERISTIC */
  readCommand(device_id) {
    return new Promise((resolve, reject) => {
      window.ble.read(
        device_id,
        this._config.racetracker_service,
        this._config.read,
        data => resolve(data),
        error => reject(error)
      );
    });
  }

  /** Get the battery level of a RaceTracker by device id */
  getBatteryLevel(cb, device_id) {
    let cmdStr = 'getBatteryLevel';
    this.prepareCommand(cmdStr)
      .then(cmd =>
        this.writeCommand(cmd, device_id).then(
          this.readCommand(device_id).then(result =>
            this.prepareResponse(cmdStr, result).then(response => cb({ device_id: device_id, battery: response }))
          )
        )
      )
      .catch(error => cb({ error: error }));
  }

  /** Get the firmware version on a RaceTracker by device id */
  getFirmwareVersion(cb, device_id) {
    window.ble.read(
      device_id,
      this._config.device_service,
      this._config.firmware,
      response => {
        cb({ device_id: device_id, firmware: this.bytesToStr(response) })
      },
        error => cb({ error: error })
    );
  }

  /** Generic raw sending function for development/debug purposes */
  sendRawCommand(raw_command, device_id) {
    let cmd = this.strToBytes(raw_command);
    this.writeCommand(cmd, device_id)
      .then(
        this.readCommand(device_id).then(result => {
          console.log(result);
        })
      )
      .catch(error => console.log(error));
  }
}

export default TbsRt.get();
