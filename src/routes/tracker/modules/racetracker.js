// @flow
import _ from 'lodash';

import ble from '../../../services/bluetooth';
import tbs from '../../../services/racetracker';

const ATTEMPT_RECOVERY = true;
const RECOVERY_ATTEMPTS = 1;
const RACEMODE_DEFAULT = 'shotgun'; // flyby

/** types */
export const RT_ERROR = 'RT_ERROR';
export const RT_DISCOVER = 'RT_DISCOVER';
export const RT_CONNECT = 'RT_CONNECT';
export const RT_DISCONNECT = 'RT_DISCONNECT';
export const RT_RECONNECTING = 'RT_RECONNECTING';
export const RT_CONNECTING = 'RT_CONNECTING';
export const RT_REFRESH_LIST = 'RT_REFRESH_LIST';
export const RT_UPDATE_CONNECT = 'RT_UPDATE_CONNECT';
export const RT_BATTERY_LEVEL = 'RT_BATTERY_LEVEL';
export const RT_RSSI_LEVEL = 'RT_RSSI_LEVEL';
export const RT_FIRMWARE_VERSION = 'RT_FIRMWARE_VERSION';
export const RT_RACEMODE = 'RT_RACEMODE';
export const RT_ACTIVE_MODE = 'RT_ACTIVE_MODE';
export const RT_MIN_LAPTIME = 'RT_MIN_LAPTIME';
export const RT_MAX_ROUNDS = 'RT_MAX_ROUNDS';
export const RT_GATE_ADC = 'RT_GATE_ADC';
export const RT_RSSI_ADC = 'RT_RSSI_ADC';
export const RT_RACER_CHANS = 'RT_RACER_CHANS';
export const RT_RACER_CHAN = 'RT_RACER_CHAN';

// TODO: create reducer with race/heat structure and attach these two
// export const RT_TOTAL_ROUNDS = 'RT_TOTAL_ROUNDS';
// export const RT_LAPTIME = 'RT_LAPTIME';

/** actions */
export const discoverTracker = (tracker: RaceTracker) => ({
  type: RT_DISCOVER,
  payload: {
    id: tracker.id,
    rssi: tracker.rssi,
    name: tracker.name,
    battery: '',
    firmware: '',
    raceMode: RACEMODE_DEFAULT,
    minLapTime: '',
    maxRounds: '',
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

export const refreshTrackerList = () => ({
  type: RT_REFRESH_LIST,
  payload: null
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

export const setRaceMode = (request: Object) => ({
  type: RT_RACEMODE,
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

export const setMaxRounds = (request: Object) => ({
  type: RT_MAX_ROUNDS,
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

/*export const setTotalRounds = (request: Object) => ({
  type: RT_TOTAL_ROUNDS,
  payload: request
});*/

/*export const setLaptime = (request: Object) => ({
  type: RT_LAPTIME,
  payload: request
});*/

/** connect the device/app to a racetracker */
export const connectTracker = (device_id: string) => {
  return dispatch => {
    dispatch(setConnecting(device_id));
    ble.connectDevice(response => {
      if (response.connected) {
        // successful device connection, long running, on error fires below
        dispatch(setConnected(response.device));
        dispatch(readActiveMode(response.device.id));
        dispatch(readRacerChannels(response.device.id));
      } else if (!response.connected) {
        // the device has either failed connection or disconnected on error
        dispatch(setReconnecting(response.device.id));
      }
    }, device_id);
  };
};

/** check the current connection state, dispatch update if needed -> used on error */
export const isTrackerConnected = (device_id: string) => {
  return dispatch => {
    ble.isDeviceConnected(response => {
      dispatch(updateConnected(response));
    }, device_id);
  };
};

/** disconnect a racetracker from the device/app */
export const disconnectTracker = (device_id: string) => {
  return dispatch => {
    ble.disconnectDevice(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
        dispatch(isTrackerConnected(device_id)); // verify/update connection state
      } else {
        dispatch(setDisconnected(response.device_id));
      }
    }, device_id);
  };
};

/** get the current mode of a racetracker by device id */
export const readActiveMode = (device_id: string) => {
  return dispatch => {
    tbs.readActiveMode(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
        dispatch(isTrackerConnected(device_id)); // verify/update connection state
      } else {
        dispatch(setActiveMode(response)); // update the redux value
      }
    }, device_id);
  };
};

/** get the current rssi value of a racetracker to the device/app */
export const readRssiLevel = (device_id: string) => {
  return dispatch => {
    ble.readDeviceRssi(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
        dispatch(isTrackerConnected(device_id)); // verify/update connection state
      } else {
        dispatch(setRssiLevel(response));
      }
    }, device_id);
  };
};

/* get the firmware version of a racetracker */
export const readFirmwareVersion = (device_id: string) => {
  return dispatch => {
    tbs.readFirmwareVersion(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
        dispatch(isTrackerConnected(device_id)); // verify/update connection state
      } else {
        dispatch(setFirmwareVersion(response));
      }
    }, device_id);
  };
};

/** get the current battery level of a racetracker */
export const readBatteryLevel = (device_id: string) => {
  return dispatch => {
    tbs.readBatteryLevel(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
        dispatch(isTrackerConnected(device_id)); // verify/update connection state
      } else {
        dispatch(setBatteryLevel(response));
      }
    }, device_id);
  };
};

/** read the channel of a selected racer from racetracker, updating redux if successful */
/*  request: { device_id: tracker_id, racer: racer_position } */
export const readRacerChannel = (request: object) => {
  return dispatch => {
    tbs.readRacerChannel(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
        dispatch(isTrackerConnected(response)); // verify/update connection state
      } else {
        dispatch(setRacerChannel(response)); // update the redux value
      }
    }, request);
  };
};

/* write a channel to a racer position on a racetracker and update redux */
/* request: { device_id: tracker_id, racer: racer_position, channel: channel_value } */
export const writeRacerChannel = (request: object) => {
  return dispatch => {
    tbs.writeRacerChannel(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
        dispatch(isTrackerConnected(response)); // verify/update connection state
      } else {
        dispatch(setRacerChannel(response)); // update the redux value
      }
    }, request);
  };
};

/** Write an array or objects to the racetracker and update redux if successful */
/*  request: { device_id: tracker_id, channels:[{ racer: racer_position, channel: channel_value }] } */
export const writeRacerChannels = (request: object) => {
  return dispatch => {
    tbs.writeRacerChannels(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
        dispatch(isTrackerConnected(response)); // verify/update connection state
      } else {
        dispatch(setRacerChannels(response)); // update the redux value
      }
    }, request);
  };
};

/** Get all the currently configured channels for available racers, save to redux */
/*  device_id: tracker_id */
export const readRacerChannels = (device_id: string) => {
  return dispatch => {
    tbs.readRacerChannels(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
        dispatch(isTrackerConnected(response)); // verify/update connection state
      } else {
        dispatch(setRacerChannels(response)); // update the redux value
      }
    }, device_id);
  };
};

/** Set the desired gate ADC value for fine tuning */
export const writeGateAdc = (request: object) => {
  return dispatch => {
    tbs.writeGateAdc(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
        dispatch(isTrackerConnected(response)); // verify/update connection state
      } else {
        dispatch(setGateAdc(response)); // update the redux value
      }
    }, request);
  };
};

/** Get the currently calibrated gate ADC value for a tracker */
export const readGateAdc = (device_id: string) => {
  return dispatch => {
    tbs.readGateAdc(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
        dispatch(isTrackerConnected(device_id)); // verify/update connection state
      } else {
        dispatch(setGateAdc(response)); // update the redux value
      }
    }, device_id);
  };
};

/** Get the RSSI value of the VTX related to the gate ADC value */
export const readRssiAdc = (device_id: string) => {
  return dispatch => {
    tbs.readRssiAdc(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
        dispatch(isTrackerConnected(device_id)); // verify/update connection state
      } else {
        dispatch(setRssiAdc(response)); // update the redux value
      }
    }, device_id);
  };
};

/** Get the total number of rounds by a a selected racer */
/*export const readTotalRounds = (request: object) => {
  return dispatch => {
    tbs.readTotalRounds(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
        dispatch(isTrackerConnected(request.device_id)); // verify/update connection state
      } else {
        dispatch(setTotalRounds(response)); // update the redux value
      }
    }, request);
  };
};*/

/** Get the laptime of a specific round of a chosen racer */
/*export const readLapTime = (request: object) => {
  return dispatch => {
    tbs.readLapTime(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
        dispatch(isTrackerConnected(request.device_id)); // verify/update connection state
      } else {
        dispatch(setLaptime(response)); // update the redux value
      }
    }, request);
  };
};*/

/** Get the maximum number of allowed rounds for a ractracker */
export const readMaxRounds = (device_id: string) => {
  return dispatch => {
    tbs.readMaxRounds(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
        dispatch(isTrackerConnected(device_id)); // verify/update connection state
      } else {
        dispatch(setMaxRounds(response)); // update the redux value
      }
    }, device_id);
  };
};

/** Set the value of the maximum number of allowed rounds for a racetracker */
export const writeMaxRounds = (request: object) => {
  return dispatch => {
    tbs.writeMaxRounds(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
        dispatch(isTrackerConnected(response.device)); // verify/update connection state
      } else {
        dispatch(setMaxRounds(response)); // update the redux value
      }
    }, request);
  };
};

/** get the current minimum lap time of a racetracker */
export const readMinLapTime = (device_id: string) => {
  return dispatch => {
    tbs.readMinLapTime(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
        dispatch(isTrackerConnected(device_id)); // verify/update connection state
      } else {
        dispatch(setMinLapTime(response)); // update the redux value
      }
    }, device_id);
  };
};

/** write a new min lap time value to a racetracker */
export const writeMinLapTime = (request: object) => {
  return dispatch => {
    tbs.writeMinLapTime(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
        dispatch(isTrackerConnected(request.device_id)); // verify/update connection state
      } else {
        dispatch(setMinLapTime(response)); // update the redux value
      }
    }, request);
  };
};

/** write a new min lap time value to a racetracker */
export const calibrateGate = (device_id: string) => {
  return dispatch => {
    tbs.calibrateGate(response => {
      if (response.error) {
        console.log("ERROR");
        console.log(response.error); // TODO: log the error properly to device
        dispatch(isTrackerConnected(device_id)); // verify/update connection state
      } else {
        console.log("SUCCESS");
        console.log(response);
        dispatch(setGateAdc(response)); // update the redux value
      }
    }, device_id);
  };
};

/** reducers */
export default function(state = [], action: Action) {
  switch (action.type) {
    case RT_DISCOVER:
      // use a union to remove dupes of tracker ids
      return _.unionWith(state, [action.payload], (left, right) => left.id === right.id);
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
                isConnecting: false,
                isConnected: false,
                isReconnecting: true
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
          tracker.id === action.payload.device_id
            ? {
                ...tracker,
                isConnected: action.payload.connected
              }
            : tracker
      );
    case RT_BATTERY_LEVEL:
      return state.map(
        tracker =>
          tracker.id === action.payload.device_id
            ? {
                ...tracker,
                battery: action.payload.battery
              }
            : tracker
      );
    case RT_RSSI_LEVEL:
      return state.map(
        tracker =>
          tracker.id === action.payload.device_id
            ? {
                ...tracker,
                rssi: action.payload.rssi
              }
            : tracker
      );
    case RT_FIRMWARE_VERSION:
      return state.map(
        tracker =>
          tracker.id === action.payload.device_id
            ? {
                ...tracker,
                firmware: action.payload.firmware
              }
            : tracker
      );
    case RT_RACEMODE:
      return state.map(
        tracker =>
          tracker.id === action.payload.device_id
            ? {
                ...tracker,
                raceMode: action.payload.raceMode
              }
            : tracker
      );
    case RT_RACER_CHANS:
      return state.map(
        tracker =>
          tracker.id === action.payload.device_id
            ? {
                ...tracker,
                racerChannels: action.payload.channels // replace previous entirely
              }
            : tracker
      );
    case RT_RACER_CHAN:
      let chans = state.filter(t => t.id === action.payload.device_id)[0].racerChannels;
      return state.map(
        tracker =>
          tracker.id === action.payload.device_id
            ? {
                ...tracker,
                racerChannels: _.unionWith(chans, [action.payload.channel], (left, right) => left.racer === right.racer)
              }
            : tracker
      );
    case RT_MIN_LAPTIME:
      return state.map(
        tracker =>
          tracker.id === action.payload.device_id
            ? {
                ...tracker,
                minLapTime: action.payload.minLapTime
              }
            : tracker
      );
    case RT_MAX_ROUNDS:
      return state.map(
        tracker =>
          tracker.id === action.payload.device_id
            ? {
                ...tracker,
                maxRounds: action.payload.maxRounds
              }
            : tracker
      );
    case RT_GATE_ADC:
      console.log("RT_GATE_ADC")
      return state.map(
        tracker =>
          tracker.id === action.payload.device_id
            ? {
                ...tracker,
                gateADC: action.payload.gateADC
              }
            : tracker
      );
    case RT_RSSI_ADC:
      return state.map(
        tracker =>
          tracker.id === action.payload.device_id
            ? {
                ...tracker,
                rssiADC: action.payload.rssiADC
              }
            : tracker
      );
    case RT_ACTIVE_MODE:
      return state.map(
        tracker =>
          tracker.id === action.payload.device_id
            ? {
                ...tracker,
                activeMode: action.payload.activeMode
              }
            : tracker
      );
    case RT_REFRESH_LIST:
      return state.filter(tracker => tracker.isConnected);
    default:
      return state;
  }
}
