/** The Ble (BluetoothLE) class handles bluetooth connection/communication on the device */
import config from './config.json';

export class Ble {
  constructor() {
    this._config = { ...config };
    this._scanCB = null;
  }

  static get() {
    if (!Ble._instance) {
      Ble._instance = new Ble();
    }
    return Ble._instance;
  }

  /** check if ble is available on this device */
  isAvailable(cb) {
    // check for the presence of the cordova plugin on the window
    let bs = 'ble' in window ? true : false;
    cb(bs);
  }

  /** check if ble is enabled on this device */
  isEnabled(cb) {
    window.ble.isEnabled(
      function() {
        cb(true);
      },
      function() {
        cb(false);
      }
    );
  }

  /** present a user dialog to enable ble [ANDROID ONLY] */
  enable(cb) {
    window.ble.enable(
      function() {
        cb({ value: true });
      },
      function() {
        let err = new Error('Bluetooth was not enabled');
        cb({ value: false, error: err });
      }
    );
  }

  /** get notifications when the state of bluetooth changes */
  startStateNotifications(cb) {
    window.ble.startStateNotifications(function(btState) {
      // only watch for on/off state changes
      if (btState === 'on') {
        cb({ value: true });
      }
      if (btState === 'off') {
        cb({ value: false });
      }
    }, function(btState) {
      let err = Error('Bluetooth state change error: ' + btState);
      cb({ error: err });
    });
  }

  /** turn off bluetooth state change notifications */
  stopStateNotifications(cb) {
    window.ble.stopStateNotifications(
      null, // successfully stopped notifications
      function() {
        let err = Error('Error stopping device Bluetooth state notifications');
        cb({ value: false, error: err });
    });
  }

  /** start bluetooth device discovery scan */
  startDeviceScan(cb) {
    window.ble.startScan(
      [], // array of services to scan for
      function(device) {
        cb({ device: device }); // callback fired on each device discovery
      },
      function() {
        let err = Error('Error during Bluetooth device discovery');
        cb({ error: err });
      }
    );
    // for destruction if timeout is overridden by a manual stop
    this._scanCB = setTimeout(() => this.deviceScanComplete(cb), this._config.scan_period);
  }

  /** stop/complete bluetooth device scan */
  deviceScanComplete(cb) {
    window.ble.stopScan(
     function () {
       cb({}); // scan successfully stopped
     },
     function() {
       let err = Error('Error stopping Bluetooth device discovery');
       cb({ error: err });
     }
    );
  }

  /** screw the timeout, i want that mickey mouse shit stopped right now! */
  stopDeviceScan(cb) {
    // kill the timeout w/ anon function, then recall complete
    if (this._scanCB) {
      clearTimeout(this._scanCB);
      this._scanCB = null;
    }
    this.deviceScanComplete(cb);
  }

  /** connect to bluetooth device via device id */
  connectDevice(cb, device_id) {
    window.ble.connect(
      device_id,
      function(device) {  // callback fired on successful device connection
        cb({ device: device, connected: true });
      },
      function(device) { // callback fired on device disconnection/error
        cb({ device: device, connected: false });
      }
    );
  }

  /** disconnect bluetooth device via device id */
  disconnectDevice(cb, device_id) {
    window.ble.disconnect(
      device_id,
      function() {
        cb({ device_id: device_id, connected: false });
      },
      function() {
        let err = Error('Error disconnecting Bluetooth device: ' + device_id);
        cb({ error: err });
      }
    );
  }

  /** check if a device is currently connected w/ device id*/
  isDeviceConnected(cb, device_id) {
    window.ble.isConnected(
      device_id,
      function() {
        cb({ device_id: device_id, connected: true });
      },
      function() {
        cb({ device_id: device_id, connected: false });
      }
    );
  }

}

export default Ble.get();
