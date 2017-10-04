/** The TbsRt (TBS RaceTracker) class handles communication to a TBS RaceTracker device */
// RACETRACKER_SERVICE = 0000fff0-0000-1000-8000-00805f9b34fb (fff0) @ handle: 0x0023
// READ_CHARACTERISTIC = 0000fff2-0000-1000-8000-00805f9b34fb (fff2) @ handle: 0x0027
// WRITE_CHARACTERISTIC = 0000fff1-0000-1000-8000-00805f9b34fb (fff1) @ handle: 0x0024
// DEVICE_SERVICE = 0000180a-0000-1000-8000-00805f9b34fb (180a) @ handle: 0x0010
// FIRMWARE_CHARACTERISTIC = 00002a26-0000-1000-8000-00805f9b34fb (2a26) @ handle 0x0018

import config from './config.json';

// regex expressions used to cleanup tracker responses
const RE_PERCENT = /(\d+.\d+)%/;
const RE_NUMBER = /\d+/g;
const RE_ALPHANUM = /[a-z0-9]+/i;

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
        case 'setMinLapTime':
          cmd = cmd + ' ' + options.minLapTime;
          break;
        case 'setGateAdc':
          cmd = cmd + ' ' + options.gateADC;
          break;
        case 'getRacerChannel':
          cmd = cmd + ' ' + options.slot;
          break;
        default:
          break;
      }
      resolve(this.strToBytes(cmd));
    });
  }

  /** Convert RaceTracker response from bytes to string and do any additional formatting */
  /*  key: the command lookup value in config.json
  /*  result: raw text response from RaceTracker */
  prepareResponse(key, result) {
    return new Promise((resolve, reject) => {
      let response = this.bytesToStr(result);
      switch (key) {
        case 'getBatteryLevel':
          response = Math.round(response.match(RE_PERCENT)[1]);
          break;
        case 'getMinLapTime':
        case 'setMinLapTime':
        case 'getGateAdc':
        case 'setGateAdc':
          response = response.split(':')[1].match(RE_NUMBER)[0];
          break;
        case 'getActiveMode':
          response = response.split(':')[1].match(RE_NUMBER)[0];
          response = this._config.modes[response];
          break;
        case 'getRacerChannel':
          response = response.split(':')[1].match(RE_ALPHANUM)[0];
          break;
        default:
          break;
      }
      console.log(key + ": " + response);
      resolve(response);
    });
  }

  /** Send a command to RaceTracker WRITE_CHARACTERISTIC */
  /*  cmd: raw command to send to RaceTracker */
  /*  device_id: id of the RaceTracker to send to */
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
  /*  device_id: id of the racetracker to read result from */
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

  /** Read result of a command sent to a RaceTracker on an interval */
  /*  device_id: id of the racetracker to read result from */
  /*  interval: interval to check result in ms */
  /*  complete: function that determines if the command has completed */
  readCommandAtInterval(device_id, interval, complete) {
    return new Promise((resolve, reject) => {
      let intId = setInterval(() => {
        window.ble.read(
          device_id,
          this._config.racetracker_service,
          this._config.read,
          data => {
            data = this.bytesToStr(data);
            if (complete(data)) {
              clearInterval(intId);
              resolve();
            }
          },
          error => {
            reject(error);
          }
        );
      }, interval);
    });
  }

  /** Get the firmware version on a RaceTracker by device id */
  readFirmwareVersion(cb, device_id) {
    window.ble.read(
      device_id,
      this._config.device_service,
      this._config.firmware,
      response => {
        cb({ device_id: device_id, firmware: this.bytesToStr(response) });
      },
      error => cb({ error: error })
    );
  }

  /** Get the battery level of a RaceTracker by device id */
  readActiveMode(cb, device_id) {
    let cmdStr = 'getActiveMode';
    this.prepareCommand(cmdStr)
      .then(cmd =>
        this.writeCommand(cmd, device_id).then(
          this.readCommand(device_id).then(result => {
            this.prepareResponse(cmdStr, result).then(response => cb({ device_id: device_id, activeMode: response }));
          })
        )
      )
      .catch(error => cb({ error: error }));
  }

  /** Get the battery level of a RaceTracker by device id */
  readBatteryLevel(cb, device_id) {
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

  /** Read all available racer slots for channels used on initial set and count */
  readRacerChannels(cb, device_id) {
    let channels = [];
    let errors = [];
    let cmdStr = 'getRacerChannel';
    let racers = [1, 2, 3, 4, 5, 6, 7, 8];  // all available racer slots
    for (let racer of racers) {
      let slot = this._config.slots[racer];  // get the handle of the racer slot
      this.prepareCommand(cmdStr, { racer: racer, slot: slot })
        .then(cmd =>
          this.writeCommand(cmd, device_id).then(
            this.readCommand(device_id).then(result =>
              this.prepareResponse(cmdStr, result).then(response =>
                {
                  if (response !== 'FF') {
                    channels.push({ racer: racer, channel: response })
                  }
                }
              )
            )
          )
        )
      .catch(error => errors.push(error))
    }
    if (errors.length > 0) {
      cb({ errors: errors })
    } else {
      cb({ device_id: device_id, channels: channels })
    }
  }

  /** Get the minimum lap time of a RaceTracker by device id */
  readMinLapTime(cb, device_id) {
    let cmdStr = 'getMinLapTime';
    this.prepareCommand(cmdStr)
      .then(cmd =>
        this.writeCommand(cmd, device_id).then(
          this.readCommand(device_id).then(result =>
            this.prepareResponse(cmdStr, result).then(response => cb({ device_id: device_id, minLapTime: response }))
          )
        )
      )
      .catch(error => cb({ error: error }));
  }

  /** Set the minimum lap time of a RaceTracker by device id */
  writeMinLapTime(cb, request) {
    let cmdStr = 'setMinLapTime';
    this.prepareCommand(cmdStr, request)
      .then(cmd =>
        this.writeCommand(cmd, request.device_id).then(
          this.readCommand(request.device_id).then(result =>
            this.prepareResponse(cmdStr, result).then(response => cb({ device_id: request.device_id, minLapTime: response }))
          )
        )
      )
      .catch(error => cb({ error: error }));
  }

  /** Get the Gate calibration value of a RaceTracker by device id */
  readGateAdc(cb, device_id) {
    let cmdStr = 'getGateAdc';
    this.prepareCommand(cmdStr)
      .then(cmd =>
        this.writeCommand(cmd, device_id).then(
          this.readCommand(device_id).then(result =>
            this.prepareResponse(cmdStr, result).then(response => cb({ device_id: device_id, gateADC: response }))
          )
        )
      )
      .catch(error => cb({ error: error }));
  }

  /** Set the Gate calibration value of a RaceTracker by device id */
  writeGateAdc(cb, request) {
    let cmdStr = 'setGateAdc';
    this.prepareCommand(cmdStr)
      .then(cmd =>
        this.writeCommand(cmd, request.device_id).then(
          this.readCommand(request.device_id).then(result =>
            this.prepareResponse(cmdStr, result).then(response => cb({ device_id: request.device_id, gateADC: response }))
          )
        )
      )
      .catch(error => cb({ error: error }));
  }

  /** Perform a gate calibration for a RaceTracker by device id */
  calibrateGate(cb, device_id) {
    let cmdStr = 'calibrateGate';
    this.prepareCommand(cmdStr, device_id)
      .then(cmd =>
        this.writeCommand(cmd, device_id).then(
          this.readCommandAtInterval(device_id, 1000, this.isCalibrationComplete).then(this.readGateAdc(cb, device_id))
        )
      )
      .catch(error => cb({ error: error }));
  }

  /** validation function to determine when the calibration process has completed */
  isCalibrationComplete(data: string) {
    let matchStr = 'Calibrated';
    if (data.substring(0, 10) === matchStr) {
      return true;
    }
    return false;
  }

  /** Generic raw sending function for development/debug purposes */
  sendRawCommand(raw_command, device_id) {
    let cmd = this.strToBytes(raw_command);
    this.writeCommand(cmd, device_id)
      .then(
        this.readCommand(device_id).then(result => {
          console.log('sendRawCommandResponse');
          let response = this.bytesToStr(result);
          console.log(response);
          // do any optional work now
          // ex. response.match(RE_PERCENT);
        })
      )
      .catch(error => {
        console.log('sendRawCommandError');
        console.log(error);
      });
  }
}

export default TbsRt.get();
