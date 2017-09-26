/** The TbsRt (TBS RaceTracker) class handles communication to a TBS RaceTracker device */
// GATT_SERVICE = 0000fff0-0000-1000-8000-00805f9b34fb (fff0) @ handle: 0x0023
// READ_CHARACTERISTIC = 0000fff2-0000-1000-8000-00805f9b34fb (fff2) @ handle: 0x0027
// WRITE_CHARACTERISTIC = 0000fff1-0000-1000-8000-00805f9b34fb (fff1) @ handle: 0x0024

import config from './config.json';

class TbsRt {
  constructor() {
    this._config = { ...config };
  }

  static get() {
    if (!TbsRt._instance) {
      TbsRt._instance = new TbsRt();
    }
    return TbsRt._instance;
  }

  strToBytes(string) {
    var array = new Uint8Array(string.length);
    for (var i = 0, l = string.length; i < l; i++) {
      array[i] = string.charCodeAt(i);
    }
    return array.buffer;
  }

  bytesToStr(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
  }

  getCommand(key) {
    return this.strToBytes(this._config.commands[key]);
  }

  writeCommand(device_id, cmd) {
    return new Promise((resolve, reject) => {
      window.ble.write(
        device_id,
        this._config.service,
        this._config.write,
        this.getCommand(cmd),
        function(data) {
          resolve(data);
        },
        function(error) {
          reject(error);
        }
      )}
    )
  }

  readCommand(device_id) {
    return new Promise((resolve, reject) => {
    window.ble.read(
      device_id,
      this._config.service,
      this._config.read,
      function(data) {
        resolve(data);
      },
      function(error) {
        reject(error);
      }
    )})
  }

  /** connect to bluetooth device via device id */
  getBatteryLevel(cb, device_id) {
    this.writeCommand(device_id, 'getBatteryLevel').then(
      this.readCommand(device_id).then(
        result => console.log(
          this.bytesToStr(result)
        )
      )
    ).catch(error => console.log(error));
  }

}

export default TbsRt.get();
