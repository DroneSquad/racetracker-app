/** The Ble (BluetoothLE) class handles bluetooth connection/communication with the device */
export class Ble {

  static get() {
    if (!Ble._instance) {
      Ble._instance = new Ble();
    }
    return Ble._instance;
  }

  /** check if ble is available on this device */
  isAvailable(cb) {
    // does window have a ref for the cordova ble plugin
    let bs = ('ble' in window) ? true : false;
    let bm = (bs) ? '' : 'This device does not support Bluetooth LE'
    cb({ value: bs, message: bm });
  };

  /** check if ble is enabled on this device */
  isEnabled(cb) {
    window.ble.isEnabled(
      function() {
        cb({ value: true, message: '' })
      },
      function() {
        cb({ value: false, message: 'Enable Bluetooth' })
      }
    );
  }

  /** give user dialog to enable bluetooth */
  enable(cb) {
    window.ble.enable(
      function() {
        cb({ value: true, message: '' })
      },
      function() {
        cb({ value: false, message: 'Enable Bluetooth' })
      }
    );
  }

  /** get updated when the state of bluetooth changes on/off */
  startStateNotifications(cb) {
    window.ble.startStateNotifications(
      function(btState) {
        if (btState === 'on') {
          cb({ value: true, message: '' })
        }
        if (btState === 'off') {
          cb({ value: false, message: 'Enable Bluetooth' })
        }
      }
    );
  }

  /** turn off bluetooth state notifications */
  stopStateNotifications(cb) {
    window.ble.stopStateNotifications(
      function() {
        cb("Bluetooth state notifications stopped");
      }
    );
  }

  /** start bluetooth device scan */
  startDeviceScan(cb) {
    window.ble.startScan([],
      function(device) {
        cb({ type: 'device', device: device });
      }, function() {
        cb({ type: 'error', error: 'Device start scanning error' });
      });
    setTimeout(() => this.stopDeviceScan(cb), 5000);
  }

  /** stop bluetooth device scan */
  stopDeviceScan(cb) {
    window.ble.stopScan(function() {
      cb({ type: 'stop' });
    }, function() {
      cb({ type: 'error', error: 'Device scanning stop error' });
    });
  }

  /** connect device to bluetooth device via device id */
  connectDevice(cb, device_id) {
    window.ble.connect(device_id,
      function() {
        cb({ device_id: device_id, connected: true, error: null });
      }, function() {
        cb({ device_id: device_id, connected: false, error: 'Device ' + device_id + ' connection error' });
    });
  }

  /** disconnect bluetooth device via device id */
  disconnectDevice(cb, device_id) {
    window.ble.disconnect(device_id,
      function() {
        cb({ device_id: device_id, connected: false, error: null });
      }, function() {
        cb({ device_id: device_id, connected: false, error: 'Device ' + device_id + ' disconnection error' });
    });
  }

  /** check if a device is currently connected */
  isConnected(cb, device_id) {
    window.ble.isConnected(device_id,
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
