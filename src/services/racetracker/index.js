/** The TbsRt (TBS RaceTracker) class handles communication to a TBS RaceTracker device */
// GATT_SERVICE = 0000fff0-0000-1000-8000-00805f9b34fb (fff0) @ handle: 0x0023
// READ_CHARACTERISTIC = 0000fff2-0000-1000-8000-00805f9b34fb (fff2) @ handle: 0x0027
// WRITE_CHARACTERISTIC = 0000fff1-0000-1000-8000-00805f9b34fb (fff1) @ handle: 0x0024

import ble from '../bluetooth';
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

  writeCommand(cb, device_id, command) {
  /*  window.ble.write(
      device_id,
      this._config.service,
      this._config.write,

      "ccc0", "ccc1", data.buffer, success, failure);

  */
  }



  /** connect to bluetooth device via device id */
  getBatteryLevel(cb, device_id) {
    console.log("getBatteryLevelCalled");
    /*



    window.ble.read(
      device_id,
      this._config.service,
      this._config.write,
      function(data) {

        // callback fired on successful device connection
        // cb({ device: device, batteryLevel: true });
      },
      function(error) {
        // callback fired on device disconnection/error
        // cb({ device: device, error: false });
      }
    );*/
  }

}

export default TbsRt.get();
