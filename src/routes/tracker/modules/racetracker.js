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
export const RT_GATE_ADC = 'RT_GATE_ADC';
export const RT_CHAN_COUNT = 'RT_CHAN_COUNT';
export const RT_RACER_CHAN = 'RT_RACER_CHAN';

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
    gateADC: '',
    activeMode: '', // (idle, shotgun, flyby, gateColor)
    channelCount: '', // active racers/frequencies setup
    racerChannels: [],
    isConnected: false,
    wasConnected: false,
    isConnecting: false,
    isReconnecting: false,
    recover: ATTEMPT_RECOVERY,
    reconnects: RECOVERY_ATTEMPTS
  }
});

/* export const setRacerChannel = (channel: Object) => ({
  type: RT_RACER_CHAN,
  payload: channel
});*/

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

export const setGateADC = (request: Object) => ({
  type: RT_GATE_ADC,
  payload: request
});

export const setChannelCount = (request: Object) => ({
  type: RT_CHAN_COUNT,
  payload: request
});

/** connect the device/app to a racetracker */
export const connectTracker = (device_id: string) => {
  return dispatch => {
    dispatch(setConnecting(device_id));
    ble.connectDevice(response => {
      if (response.connected) {
        // successful device connection, long running, on error fires below
        dispatch(setConnected(response.device));
        dispatch(readActiveMode(response.device.id));
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

export const readRacerChannels = (request: object) => {
  return dispatch => {
    /*for (let racer of request.racers) {
      console.log("for: " + racer);
      tbs.readRacerChannel(response => {
        if (response.error) {
          console.log(response.error); // TODO: log the error properly to device
          dispatch(isTrackerConnected(response)); // verify/update connection state
        } else {
          console.log("SUCCESS");
          console.log(response);
          dispatch(setRacerChannel(response)); // update the redux value
        }
      }, { device_id: request.device_id, racer: racer });
    }*/
  };
};

/** get the current minimum lap time of a racetracker */
export const readChannelCount = (device_id: string) => {
  return dispatch => {
    tbs.readChannelCount(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
        dispatch(isTrackerConnected(device_id)); // verify/update connection state
      } else {
        dispatch(setChannelCount(response)); // update the redux value
      }
    }, device_id);
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
        console.log(response.error); // TODO: log the error properly to device
        dispatch(isTrackerConnected(device_id)); // verify/update connection state
      } else {
        dispatch(setGateADC(response)); // update the redux value
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
    /*case RT_RACER_CHAN:
      return state.map(
        tracker =>
          tracker.id === action.payload.id
            ? {
              ...tracker,
              racerChannels: _.unionWith(tracker.racerChannels, [{ racer: action.payload.racer, channel: action.payload.channel }], (left, right) => left.racer === right.racer)
            }
          : tracker
    );*/
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
    case RT_CHAN_COUNT:
      return state.map(
        tracker =>
          tracker.id === action.payload.device_id
            ? {
                ...tracker,
                channelCount: action.payload.channelCount
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
    case RT_GATE_ADC:
      return state.map(
        tracker =>
          tracker.id === action.payload.device_id
            ? {
                ...tracker,
                gateADC: action.payload.gateADC
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
