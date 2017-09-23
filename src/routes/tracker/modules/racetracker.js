// @flow
import _ from 'lodash';

import ble from '../../../services/bluetooth';

import { setError } from './bluetooth';

/** types */
export const RT_DISCOVER = 'RT_DISCOVER';
export const RT_CONNECT = 'RT_CONNECT';
export const RT_CONNECTING = 'RT_CONNECTING';
export const RT_DISCONNECT = 'RT_DISCONNECT';
export const RT_CLEAN_LIST = 'RT_CLEAN_LIST';
export const RT_UPDATE_CONNECT = 'RT_UPDATE_CONNECT';

/** actions */
export const discoverTracker = (tracker: RaceTracker) => ({
  type: RT_DISCOVER,
  payload: tracker
});

export const setConnecting = (id: string) => ({
  type: RT_CONNECTING,
  payload: id
});

export const setConnected = (tracker: RaceTracker) => ({
  type: RT_CONNECT,
  payload: tracker
});

export const updateConnected = (response: Object) => ({
  type: RT_UPDATE_CONNECT,
  payload: response
});

export const setDisconnected = (id: string) => ({
  type: RT_DISCONNECT,
  payload: id
});

export const clearAvailRtList = () => ({
  type: RT_CLEAN_LIST,
  payload: null
});

export const connectTracker = (device_id: string) => {
  return dispatch => {
    dispatch(setConnecting(device_id));
    ble.connectDevice(response => {
      if (response.connected) {
        dispatch(setConnected(response.device));
      } else if (!response.connected) {
        dispatch(setDisconnected(response.device.id));
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
      // use a union to remove copies of the same tracker id
      return _.unionWith(
        state,
        [
          {
            id: action.payload.id,
            rssi: action.payload.rssi,
            name: action.payload.name
          }
        ],
        (left, right) => left.id === right.id
      );
    case RT_CONNECTING:
      return state.map(
        tracker => (tracker.id === action.payload ? { ...tracker, isConnected: false, isConnecting: true } : tracker)
      );
    case RT_CONNECT:
      return state.map(
        tracker => (tracker.id === action.payload.id ? {
          ...tracker,
          rssi: action.payload.rssi, // update rssi, because why not
          isConnected: true,
          isConnecting: false,
          recover: true, // be default enable onDisconnect attempt recovery
          reconnect: 0  // recovery attempt count reset
        } : tracker)
      );
    case RT_DISCONNECT:
      return state.map(
        tracker => (tracker.id === action.payload ? { ...tracker, isConnected: false, isConnecting: false } : tracker)
      );
    case RT_UPDATE_CONNECT:
      return state.map(
        tracker => (tracker.id === action.payload.device_id ? { ...tracker, isConnected: action.payload.connected } : tracker)
      );
    case RT_CLEAN_LIST:
      return state.filter(tracker => tracker.isConnected);
    default:
      return state;
  }
}
