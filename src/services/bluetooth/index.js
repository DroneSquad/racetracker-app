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

  startStateNotifications(cb) {
    window.ble.startStateNotifications(
      function(btState) {
        console.log("startStateNotifications CALLED");
        if (btState === 'on') {
          cb({ value: true, message: '' })
        }
        if (btState === 'off') {
          cb({ value: false, message: 'Enable Bluetooth' })
        }
      }
    );
  }

  stopStateNotifications() {
    window.ble.stopStateNotifications(
      function() {
        console.log("stopStateNotifications Called");
      }
    );
  }

}


export default Ble.get();
