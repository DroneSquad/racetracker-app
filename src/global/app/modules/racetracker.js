// @flow
import _ from 'lodash';
import { createSelector } from 'reselect';

import ble from '../../../services/bluetooth';
import tbs from '../../../services/racetracker';

import { setError, setIsScanning } from './bluetooth';

/** defaults */
const ATTEMPT_RECOVERY = true;
const RECOVERY_ATTEMPTS = 8;

/** racetracker active mode constants */
export const RT_MODE_IDLE = 'idle';
export const RT_MODE_SHOTGUN = 'shotgun';
export const RT_MODE_FLYBY = 'flyby';
export const RT_MODE_GATECOLOR = 'gateColor';

/** types */
export const RT_DISCOVER = 'RT_DISCOVER';
export const RT_REMOVE = 'RT_REMOVE';
export const RT_CONNECT = 'RT_CONNECT';
export const RT_DISCONNECT = 'RT_DISCONNECT';
export const RT_RECONNECTING = 'RT_RECONNECTING';
export const RT_CONNECTING = 'RT_CONNECTING';
export const RT_REFRESH_LIST = 'RT_REFRESH_LIST';
export const RT_UPDATE_CONNECT = 'RT_UPDATE_CONNECT';
export const RT_BATTERY_LEVEL = 'RT_BATTERY_LEVEL';
export const RT_RSSI_LEVEL = 'RT_RSSI_LEVEL';
export const RT_FIRMWARE_VERSION = 'RT_FIRMWARE_VERSION';
export const RT_ACTIVE_MODE = 'RT_ACTIVE_MODE';
export const RT_MIN_LAPTIME = 'RT_MIN_LAPTIME';
export const RT_MAX_LAPS = 'RT_MAX_LAPS';
export const RT_GATE_ADC = 'RT_GATE_ADC';
export const RT_RSSI_ADC = 'RT_RSSI_ADC';
export const RT_RACER_CHANS = 'RT_RACER_CHANS';
export const RT_RACER_CHAN = 'RT_RACER_CHAN';
export const RT_CALIBRATING = 'RT_CALIBRATING';

/** selectors */
const getTrackers = state => state.trackers;
export const getAvailableTrackers = createSelector([getTrackers], trackers => {
  return trackers.filter(t => !t.isConnected);
});
export const getConnectedTrackers = createSelector([getTrackers], trackers => {
  return trackers.filter(t => t.isConnected);
});
export const getConnectingTrackers = createSelector([getTrackers], trackers => {
  return trackers.filter(t => t.isConnecting);
});
export const getReconnectingTrackers = createSelector([getTrackers], trackers => {
  return trackers.filter(t => t.isReconnecting);
});

/** actions */
export const discoverTracker = (tracker: RaceTracker) => ({
  type: RT_DISCOVER,
  payload: {
    id: tracker.id,
    rssi: tracker.rssi,
    name: tracker.name,
    battery: '',
    firmware: '',
    minLapTime: '',
    maxLaps: '',
    gateADC: '',
    rssiADC: '',
    activeMode: '', // (idle, shotgun, flyby, gateColor)
    racerChannels: [],
    isConnected: false,
    wasConnected: false,
    isConnecting: false,
    isReconnecting: false,
    isCalibrating: false,
    recover: ATTEMPT_RECOVERY,
    reconnects: RECOVERY_ATTEMPTS
  }
});

export const removeTracker = (id: string) => ({
  type: RT_REMOVE,
  payload: id
});

export const setConnected = (tracker: RaceTracker) => ({
  type: RT_CONNECT,
  payload: tracker
});

export const setDisconnected = (id: string) => ({
  type: RT_DISCONNECT,
  payload: id
});

export const setConnecting = (id: string) => ({
  type: RT_CONNECTING,
  payload: id
});

export const setReconnecting = (id: string) => ({
  type: RT_RECONNECTING,
  payload: id
});

export const updateConnected = (request: Object) => ({
  type: RT_UPDATE_CONNECT,
  payload: request
});

export const setCalibrating = (request: Object) => ({
  type: RT_CALIBRATING,
  payload: request
});

export const setBatteryLevel = (request: Object) => ({
  type: RT_BATTERY_LEVEL,
  payload: request
});

export const setRssiLevel = (request: Object) => ({
  type: RT_RSSI_LEVEL,
  payload: request
});

export const setFirmwareVersion = (request: Object) => ({
  type: RT_FIRMWARE_VERSION,
  payload: request
});

export const setActiveMode = (request: Object) => ({
  type: RT_ACTIVE_MODE,
  payload: request
});

export const setMinLapTime = (request: Object) => ({
  type: RT_MIN_LAPTIME,
  payload: request
});

export const setMaxLaps = (request: Object) => ({
  type: RT_MAX_LAPS,
  payload: request
});

export const setGateAdc = (request: Object) => ({
  type: RT_GATE_ADC,
  payload: request
});

export const setRssiAdc = (request: Object) => ({
  type: RT_RSSI_ADC,
  payload: request
});

export const setRacerChannels = (request: Object) => ({
  type: RT_RACER_CHANS,
  payload: request
});

export const setRacerChannel = (request: Object) => ({
  type: RT_RACER_CHAN,
  payload: request
});

/** connect the device/app to a racetracker */
export const connectTracker = (request: Object) => {
  return dispatch => {
    ble.connectDevice(response => {
      // successful device connection. this is long running, on error it fires the else statement
      if (response.connected) {
        console.log("++++++++++++++ RACETRACKER CONNECTED ++++++++++++++")
        syncTrackerState(response.device.id)
          .then(result => {
            dispatch(result)
            dispatch(setConnected(response.device))
            if (request.getChannels) {
              dispatch(readRacerChannels(response.device.id));
            }
          })
          .catch(error => console.log(error)); // TODO: add proper error handling/logging
      } else if (!response.connected) {
        // the device has either failed connection or disconnected on error
        console.log('++++++++++++++ RACETRACKER CONNECTION LOST ++++++++++++++');
        ble.isEnabled(result => {
          if (result) {
            // if bluetooth was deactivated, dont bother trying to reconnect
            dispatch(setReconnecting(response.device.id));
          } else {
            dispatch(setDisconnected(response.device.id));
          }
        });
      }
    }, request.deviceId);
  };
};

// TODO: rework this to be more effective
export const syncTrackerState = (deviceId: string) => {
  return new Promise((resolve, reject) => {
    tbs.readActiveMode(response => {
      if (response.error) {
        reject(response.error);
      } else {
        resolve(setActiveMode(response));
      }
    }, deviceId);
  });
};

export const isTrackerConnected = (deviceId: string) => {
  return new Promise((resolve, reject) => {
    // if the tracker has disconnected, but the bluetooth library has not yet
    // noticed the disconnection, this will then force the library to update
    tbs.readFirmwareVersion(response => {
      if (response.error) {
        resolve(false)
      } else {
        resolve(true)
      }
    }, deviceId);
  });
};

export const startTrackerSearch = (request: array, discoveryScan: boolean = false) => {
  console.log('** RT - startTrackerSearch **');
  let matchArr = request.slice(0);
  return dispatch => {
    ble.startDeviceScan(response => {
      if (response.error) {
        dispatch(setError(response.error));
      } else if (response.device) {
        if (response.device.hasOwnProperty('name')) {
          if (response.device.name.startsWith('TBSRT')) {
            // determine if this tracker is in the current array of trackers
            let idx = matchArr
              .map(function(e) {
                return e.id;
              })
              .indexOf(response.device.id);
            if (idx !== -1) {
              if (matchArr[idx].isConnected) {
                let id = matchArr[idx].id;
                dispatch(connectTracker({ deviceId: id }));
              }
              // remove this tracker from our search array
              matchArr.splice(idx, 1);
              if (!discoveryScan) {
                // indicates if this is a full discovery scan
                if (matchArr.length === 0) {
                  dispatch(stopTrackerScan());
                }
              }
            } else {
              // device was not found add it as a new discovery
              if (discoveryScan) {
                dispatch(discoverTracker(response.device));
              }
            }
          }
        }
      } else {
        // if we made it here then the scan completed its full timer interval, any trackers
        // remaining in the array were not found and should be removed from the redux store now
        if (matchArr.length > 0) {
          for (let rt of matchArr) {
            dispatch(removeTracker(rt.id));
          }
        }
        // called on device scan completed via timeout
        if (discoveryScan) {
          dispatch(setIsScanning(false));
        }
      }
    });
  };
};

export const validateTrackerPromise = (request: object) => {
  console.log('** RT - validateTrackerPromise **');
  return new Promise((resolve, reject) => {
    // we really dont care about the rssi value here, the command is being used
    // to determine the connection state of the tracker within the bluetooth library
    ble.readDeviceRssi(response => {
      if (response.error) {
        // error response indicates either the tracker is not connected, or not found with
        // the bluetooth library determine the type of error and handle accordingly
        let err = response.error.replace('.', '').split(' ').pop().toUpperCase();
        if (err === 'CONNECTED') {
          // indicates the tracker is available to the bluetooth library but not currently connected
          if (request.isConnected) {
            resolve(connectTracker({ deviceId: request.id }));
          } else {
            resolve(request);
          }
        } else if (err === 'FOUND') {
          // indicates that the tracker is NOT currently available to the bluetooth library
          resolve(request); // return the object and populate the search array
        } else {
          // this should never happen....
          console.log(err); // TODO: proper error handling
          reject();
        }
      } else {
        // a proper rssi response indicates that the tracker is 'connected'
        // dispatch action verifies the connected state of redux reflects this
        resolve(updateConnected({ deviceId: request.id, connected: true }))
      }
    }, request.id);
  });
};

export const validateTrackers = (request: array, discoveryScan: boolean = false) => {
  console.log('** RT - validateTrackers **');
  return dispatch => {
    let trackerPromises = [];
    for (let rt of request) {
      trackerPromises.push(validateTrackerPromise({ id: rt.id, isConnected: rt.isConnected }));
    }
    Promise.all(trackerPromises)
      .then(response => {
        let sync = [];
        for (let r of response) {
          var t = typeof r;
          if (t === 'function') {
            dispatch(r);
          } else if (t !== undefined) {
            sync.push(r);
          }
        }
        if (discoveryScan) {
          dispatch(startTrackerSearch(sync, discoveryScan));
        } else {
          if (sync.length > 0) {
            dispatch(startTrackerSearch(sync));
          }
        }
      })
      .catch(error => console.log(error)); // TODO: add proper error handling/logging
  };
};

export const discoverTrackers = (request: array) => {
  console.log('** RT - discoverTrackers **');
  return dispatch => {
    dispatch(setIsScanning(true));
    dispatch(validateTrackers(request, true));
  };
};

export const stopTrackerScan = (request: array = []) => {
  return dispatch => {
    ble.stopDeviceScan(response => {
      if (response.error) {
        dispatch(setError(response.error));
      } else {
        // fired on device scan stop manually (no timeout)
        dispatch(setIsScanning(false));
        // if (request.length > 0) {
        // TODO: (see stopDiscovery() within TrackerHome to see calling location)
        // the idea here is that when a scan is stopped manually, validate trackers on cancel
        // unfortunately it doesnt appear to work well, there is a long pause... before it completes
        // dispatch(validateTrackers(request));
        // }
      }
    });
  };
};

/** disconnect a racetracker from the device/app */
export const disconnectTracker = (deviceId: string) => {
  console.log('** RT - disconnectTracker **');
  return dispatch => {
    ble.disconnectDevice(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
      } else {
        dispatch(setDisconnected(response.deviceId));
      }
    }, deviceId);
  };
};

/** get the current mode of a racetracker by device id */
export const readActiveMode = (deviceId: string) => {
  return dispatch => {
    tbs.readActiveMode(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
      } else {
        dispatch(setActiveMode(response)); // update the redux value
      }
    }, deviceId);
  };
};

/** get the current rssi value of a racetracker to the device/app */
export const readRssiLevel = (deviceId: string) => {
  return dispatch => {
    ble.readDeviceRssi(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
      } else {
        dispatch(setRssiLevel(response));
      }
    }, deviceId);
  };
};

/* get the firmware version of a racetracker */
export const readFirmwareVersion = (deviceId: string) => {
  return dispatch => {
    tbs.readFirmwareVersion(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
      } else {
        dispatch(setFirmwareVersion(response));
      }
    }, deviceId);
  };
};

/** get the current battery level of a racetracker */
export const readBatteryLevel = (deviceId: string) => {
  return dispatch => {
    tbs.readBatteryLevel(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
      } else {
        dispatch(setBatteryLevel(response));
      }
    }, deviceId);
  };
};

/** read the channel of a selected racer from racetracker, update redux if successful */
/*  request: { deviceId: tracker_id, racer: racer_position } */
export const readRacerChannel = (request: object) => {
  return dispatch => {
    tbs.readRacerChannel(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
      } else {
        dispatch(setRacerChannel(response)); // update the redux value
      }
    }, request);
  };
};

/* write a channel to a racer position on a racetracker and update redux */
/* request: { deviceId: tracker_id, racer: racer_position, channel: channel_value } */
export const writeRacerChannel = (request: object) => {
  return dispatch => {
    tbs.writeRacerChannel(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
      } else {
        dispatch(setRacerChannel(response)); // update the redux value
      }
    }, request);
  };
};

/** Write an array or objects to the racetracker and update redux if successful */
/*  request: { deviceId: tracker_id, channels:[{ racer: racer_position, channel: channel_value }] } */
export const writeRacerChannels = (request: object, callback) => {
  return (dispatch, getStore) => {
    const promise = new Promise((success, fail) => {
      tbs.writeRacerChannels(response => {
        if (response.error) {
          fail(response);
        } else {
          success(response);
        }
      }, request);
    });
    promise
      .then(response => dispatch(setRacerChannels(response)))
      .catch(response => console.error(response))
      .then(() => callback && callback(promise, dispatch, getStore));
  };
};

/** Get all the currently configured channels for available racers, save to redux */
/*  deviceId: tracker_id */
export const readRacerChannels = (deviceId: string) => {
  return dispatch => {
    tbs.readRacerChannels(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
      } else {
        dispatch(setRacerChannels(response)); // update the redux value
      }
    }, deviceId);
  };
};

/** Set the desired gate ADC value for fine tuning */
export const writeGateAdc = (request: object) => {
  return dispatch => {
    tbs.writeGateAdc(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
      } else {
        dispatch(setGateAdc(response)); // update the redux value
      }
    }, request);
  };
};

/** Get the currently calibrated gate ADC value for a tracker */
export const readGateAdc = (deviceId: string) => {
  return dispatch => {
    tbs.readGateAdc(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
      } else {
        dispatch(setGateAdc(response)); // update the redux value
      }
    }, deviceId);
  };
};

/** Get the RSSI value of the VTX related to the gate ADC value */
export const readRssiAdc = (deviceId: string) => {
  return dispatch => {
    tbs.readRssiAdc(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
      } else {
        dispatch(setRssiAdc(response)); // update the redux value
      }
    }, deviceId);
  };
};

/** Get the maximum number of allowed laps for a racetracker */
export const readMaxLaps = (deviceId: string) => {
  return dispatch => {
    tbs.readMaxLaps(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
      } else {
        dispatch(setMaxLaps(response)); // update the redux value
      }
    }, deviceId);
  };
};

/** Set the value of the maximum number of allowed laps for a racetracker */
export const writemaxLaps = (request: object) => {
  return dispatch => {
    tbs.writeMaxLaps(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
      } else {
        dispatch(setMaxLaps(response)); // update the redux value
      }
    }, request);
  };
};

/** get the current minimum lap time of a racetracker */
export const readMinLapTime = (deviceId: string) => {
  return dispatch => {
    tbs.readMinLapTime(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
      } else {
        dispatch(setMinLapTime(response)); // update the redux value
      }
    }, deviceId);
  };
};

/** write a new min lap time value to a racetracker */
export const writeMinLapTime = (request: object) => {
  return dispatch => {
    tbs.writeMinLapTime(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
      } else {
        dispatch(setMinLapTime(response)); // update the redux value
      }
    }, request);
  };
};

/** calibrate the racetracker to race gate */
export const calibrateGate = (deviceId: string) => {
  return dispatch => {
    dispatch(setCalibrating({ deviceId: deviceId, calibrating: true }));
    tbs.calibrateGate(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
        dispatch(setCalibrating({ deviceId: deviceId, calibrating: false })); // turn off calibration
      } else {
        dispatch(setGateAdc(response)); // update the redux value
      }
    }, deviceId);
  };
};

/** reducers */
export default function(state = [], action: Action) {
  switch (action.type) {
    case RT_DISCOVER:
      // use a union to remove dupes of tracker ids
      return _.unionWith(state, [action.payload], (left, right) => left.id === right.id);
    case RT_REMOVE:
      return state.filter(tracker => tracker.id !== action.payload);
    case RT_CONNECT:
      return state.map(
        tracker =>
          tracker.id === action.payload.id
            ? {
                ...tracker,
                rssi: action.payload.rssi, // update rssi, because... why the hell not..
                isConnecting: false,
                isReconnecting: false,
                isConnected: true,
                recover: ATTEMPT_RECOVERY, // reset to default
                reconnects: RECOVERY_ATTEMPTS // reset to default
              }
            : tracker
      );
    case RT_DISCONNECT:
      return state.map(
        tracker =>
          tracker.id === action.payload
            ? {
                ...tracker,
                isConnected: false,
                isConnecting: false,
                isReconnecting: false,
                recover: ATTEMPT_RECOVERY, // reset to default
                reconnects: RECOVERY_ATTEMPTS // reset to default
              }
            : tracker
      );
    case RT_RECONNECTING: // fires after a device has failed to connect, or disconnected on error
      return state.map(
        tracker =>
          tracker.id === action.payload
            ? {
                ...tracker,
                wasConnected: tracker.reconnects === RECOVERY_ATTEMPTS ? tracker.isConnected : tracker.wasConnected,
                isReconnecting: tracker.isConnecting || tracker.isConnected ? true : false, // do not attempt reconnect if not previously 'connected', or 'connecting'
                isConnecting: false,
                isConnected: false
              }
            : tracker
      );
    case RT_CONNECTING:
      return state.map(
        tracker =>
          tracker.id === action.payload
            ? {
                ...tracker,
                reconnects: tracker.isReconnecting && tracker.recover ? tracker.reconnects - 1 : tracker.reconnects,
                isConnected: false,
                isReconnecting: false,
                isConnecting: true
              }
            : tracker
      );
    case RT_UPDATE_CONNECT:
      return state.map(
        tracker =>
          tracker.id === action.payload.deviceId
            ? {
                ...tracker,
                isConnected: action.payload.connected
              }
            : tracker
      );
    case RT_BATTERY_LEVEL:
      return state.map(
        tracker =>
          tracker.id === action.payload.deviceId
            ? {
                ...tracker,
                battery: action.payload.battery
              }
            : tracker
      );
    case RT_RSSI_LEVEL:
      return state.map(
        tracker =>
          tracker.id === action.payload.deviceId
            ? {
                ...tracker,
                rssi: action.payload.rssi
              }
            : tracker
      );
    case RT_FIRMWARE_VERSION:
      return state.map(
        tracker =>
          tracker.id === action.payload.deviceId
            ? {
                ...tracker,
                firmware: action.payload.firmware
              }
            : tracker
      );
    case RT_RACER_CHANS:
      return state.map(
        tracker =>
          tracker.id === action.payload.deviceId
            ? {
                ...tracker,
                racerChannels: action.payload.channels
              }
            : tracker
      );
    case RT_RACER_CHAN:
      let chans = state.filter(t => t.id === action.payload.deviceId)[0].racerChannels;
      return state.map(
        tracker =>
          tracker.id === action.payload.deviceId
            ? {
                ...tracker,
                racerChannels: _.unionWith(chans, [action.payload.channel], (left, right) => left.racer === right.racer)
              }
            : tracker
      );
    case RT_MIN_LAPTIME:
      return state.map(
        tracker =>
          tracker.id === action.payload.deviceId
            ? {
                ...tracker,
                minLapTime: action.payload.minLapTime
              }
            : tracker
      );
    case RT_MAX_LAPS:
      return state.map(
        tracker =>
          tracker.id === action.payload.deviceId
            ? {
                ...tracker,
                maxLaps: action.payload.maxLaps
              }
            : tracker
      );
    case RT_GATE_ADC:
      return state.map(
        tracker =>
          tracker.id === action.payload.deviceId
            ? {
                ...tracker,
                gateADC: action.payload.gateADC,
                isCalibrating: false
              }
            : tracker
      );
    case RT_CALIBRATING:
      return state.map(
        tracker =>
          tracker.id === action.payload.deviceId
            ? {
                ...tracker,
                isCalibrating: action.payload.calibrating
              }
            : tracker
      );
    case RT_RSSI_ADC:
      return state.map(
        tracker =>
          tracker.id === action.payload.deviceId
            ? {
                ...tracker,
                rssiADC: action.payload.rssiADC
              }
            : tracker
      );
    case RT_ACTIVE_MODE:
      return state.map(
        tracker =>
          tracker.id === action.payload.deviceId
            ? {
                ...tracker,
                activeMode: action.payload.activeMode
              }
            : tracker
      );
    case 'persist/REHYDRATE': {
      if (action.payload !== undefined) {
        return action.payload.trackers;
      }
      return state;
    }
    default:
      return state;
  }
}
