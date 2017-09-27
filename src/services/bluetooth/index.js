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
    cb('ble' in window ? true : false);
  }

  /** check if ble is enabled on this device */
  isEnabled(cb) {
    window.ble.isEnabled(() => cb(true), () => cb(false));
  }

  /** present a user dialog to enable ble [ANDROID ONLY] */
  enable(cb) {
    window.ble.enable(
      () => cb({ value: true }),
      () => {
        let err = new Error('Bluetooth was not enabled');
        cb({ value: false, error: err });
      }
    );
  }

  /** get notifications when the state of bluetooth changes */
  startStateNotifications(cb) {
    window.ble.startStateNotifications(
      btState => {
        // only watch for on/off state changes
        if (btState === 'on') {
          cb({ value: true });
        }
        if (btState === 'off') {
          cb({ value: false });
        }
      },
      btState => {
        let err = Error('Bluetooth state change error: ' + btState);
        cb({ error: err });
      }
    );
  }

  /** turn off bluetooth state change notifications */
  stopStateNotifications(cb) {
    window.ble.stopStateNotifications(
      null, // successfully stopped notifications
      () => {
        let err = Error('Error stopping device Bluetooth state notifications');
        cb({ value: false, error: err });
      }
    );
  }

  /** start bluetooth device discovery scan */
  startDeviceScan(cb) {
    window.ble.startScan(
      [], // array of services to scan for
      device => cb({ device: device }), // callback fired on each device discovery
      () => {
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
      () => cb({}), // scan successfully stopped
      () => {
        let err = Error('Error stopping Bluetooth device discovery');
        cb({ error: err });
      }
    );
  }

  /** screw the timeout, i want that mickey mouse shit stopped right now! */
  stopDeviceScan(cb) {
    // kill the timeout w/ anon function, then call scanComplete
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
      // callback fired on successful device connection
      device => cb({ device: device, connected: true }),
      // callback fired on device disconnection/error
      device => cb({ device: device, connected: false })
    );
  }

  /** disconnect bluetooth device via device id */
  disconnectDevice(cb, device_id) {
    window.ble.disconnect(
      device_id,
      () => cb({ device_id: device_id, connected: false }),
      () => {
        let err = Error('Error disconnecting Bluetooth device: ' + device_id);
        cb({ error: err });
      }
    );
  }

  /** check if a device is currently connected w/ device id */
  isDeviceConnected(cb, device_id) {
    window.ble.isConnected(
      device_id,
      () => cb({ device_id: device_id, connected: true }),
      () => cb({ device_id: device_id, connected: false })
    );
  }

  /** read the rssi value of a device with device id */
  readDeviceRssi(cb, device_id) {
    window.ble.readRSSI(device_id, rssi => cb({ device_id: device_id, rssi: rssi }), error => cb({ error: error }));
  }
}

export default Ble.get();
