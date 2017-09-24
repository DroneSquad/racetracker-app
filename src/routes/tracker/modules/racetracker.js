// @flow
import _ from 'lodash';

import ble from '../../../services/bluetooth';

import { setError } from './bluetooth';

const ATTEMPT_RECOVERY = true;
const RECOVERY_ATTEMPTS = 2;

/** types */
export const RT_DISCOVER = 'RT_DISCOVER';
export const RT_CONNECT = 'RT_CONNECT';
export const RT_CONNECTING = 'RT_CONNECTING';
export const RT_RECONNECTING = 'RT_RECONNECTING';
export const RT_DISCONNECT = 'RT_DISCONNECT';
export const RT_REFRESH_LIST = 'RT_REFRESH_LIST';
export const RT_UPDATE_CONNECT = 'RT_UPDATE_CONNECT';
export const RT_ERROR = 'RT_ERROR';

/** actions */
export const discoverTracker = (tracker: RaceTracker) => ({
  type: RT_DISCOVER,
  payload: {
    id: tracker.id,
    rssi: tracker.rssi,
    name: tracker.name,
    isConnected: false,
    isConnecting: false,
    isReconnecting: false,
    recover: ATTEMPT_RECOVERY,
    reconnects: RECOVERY_ATTEMPTS,
    error: '' // TODO: use an object?
  }
});

export const setConnecting = (id: string) => ({
  type: RT_CONNECTING,
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

export const setReconnecting = (id: string) => ({
  type: RT_RECONNECTING,
  payload: id
});

export const updateConnected = (response: Object) => ({
  type: RT_UPDATE_CONNECT,
  payload: response
});

export const refreshRtList = () => ({
  type: RT_REFRESH_LIST,
  payload: null
});

export const connectTracker = (device_id: string) => {
  return dispatch => {
    dispatch(setConnecting(device_id));
    ble.connectDevice(response => {
      if (response.connected) {
        dispatch(setConnected(response.device));
      } else if (!response.connected) {
        // the device has either failed to connect, or disconnected on error
        // onChange of reconnecting prop fires proper action from RecoverySnackbar
        dispatch(setReconnecting(response.device.id));
      }
    }, device_id);
  };
};

export const disconnectTracker = (device_id: string) => {
  return dispatch => {
    ble.disconnectDevice(response => {
      if (response.error) {
        dispatch(setError(response.error));
        // error on disconnection!? wtf, revalidate/update connection state
        dispatch(isTrackerConnected(device_id));
      } else {
        dispatch(setDisconnected(response.device_id));
      }
    }, device_id);
  };
};

export const isTrackerConnected = (device_id: string) => {
  return dispatch => {
    ble.isDeviceConnected(response => {
      if (response.connected) {
        dispatch(updateConnected(response));
      } else {
        dispatch(updateConnected(response));
      }
    }, device_id);
  };
};

/** reducers */
export default function(state = [], action: Action) {
  switch (action.type) {
    case RT_DISCOVER:
      // use a union to remove dupes of same tracker ids
      return _.unionWith(
        state,
        [action.payload],
        (left, right) => left.id === right.id
      );
    case RT_CONNECTING:
      return state.map(
        tracker => (tracker.id === action.payload ? {
          ...tracker,
          isConnected: false,
          isConnecting: true
        } : tracker)
      );
    case RT_CONNECT:
      return state.map(
        tracker => (tracker.id === action.payload.id ? {
          ...tracker,
          rssi: action.payload.rssi, // update rssi, because... why the hell not..
          isConnected: true,
          isConnecting: false,
          isReconnecting: false,
          recover: ATTEMPT_RECOVERY, // reset to default
          reconnects: RECOVERY_ATTEMPTS  // reset to default
        } : tracker)
      );
    case RT_DISCONNECT:
      return state.map(
        tracker => (tracker.id === action.payload ? {
          ...tracker,
          isConnected: false,
          isConnecting: false,
          isReconnecting: false,
          recover: ATTEMPT_RECOVERY, // reset to default
          reconnects: RECOVERY_ATTEMPTS  // reset to default
        } : tracker)
      );
    case RT_RECONNECTING:
      return state.map(
        tracker => (tracker.id === action.payload ? {
          ...tracker,
          isConnected: false,
          isConnecting: false,
          isReconnecting: true,
          reconnects: (tracker.recover) ? tracker.reconnects - 1 : tracker.reconnects,
        } : tracker)
      );
    case RT_UPDATE_CONNECT:
      return state.map(
        tracker => (tracker.id === action.payload.device_id ? { ...tracker, isConnected: action.payload.connected } : tracker)
      );
    case RT_REFRESH_LIST:
      return state.filter(tracker => tracker.isConnected);
    default:
      return state;
  }
}
