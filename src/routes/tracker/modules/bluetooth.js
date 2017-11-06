import ble from '../../../services/bluetooth';

import { startTrackerSearch } from './racetracker';

/** types */
export const BT_IS_SCANNING = 'BT_IS_SCANNING';
export const BT_IS_ENABLED = 'BT_IS_ENABLED';
export const BT_IS_AVAILABLE = 'BT_IS_AVAILABLE';
export const BT_ERROR = 'BT_ERROR';

/** actions */
export const setError = (error: Error) => ({
  type: BT_ERROR,
  payload: error.message
});

export const setIsAvailable = (value: boolean) => ({
  type: BT_IS_AVAILABLE,
  payload: value
});

export const setIsEnabled = (value: boolean) => ({
  type: BT_IS_ENABLED,
  payload: value
});

export const setIsScanning = (value: boolean) => ({
  type: BT_IS_SCANNING,
  payload: value
});

export const isAvailable = () => {
  return dispatch => {
    ble.isAvailable(response => {
      dispatch(setIsAvailable(response));
    });
  };
};

export const isEnabled = () => {
  return dispatch => {
    ble.isEnabled(response => {
      dispatch(setIsEnabled(response));
    });
  };
};

export const enable = () => {
  return dispatch => {
    ble.enable(response => {
      dispatch(setIsEnabled(response.value));
      if (response.error) {
        dispatch(setError(response.error));
      }
    });
  };
};

export const startStateNotifications = () => {
  return dispatch => {
    ble.startStateNotifications(response => {
      if (response.error) {
        dispatch(setError(response.error));
      } else {
        dispatch(setIsEnabled(response.value));
      }
    });
  };
};

export const stopStateNotifications = () => {
  return dispatch => {
    ble.stopStateNotifications(response => {
      if (response.error) {
        dispatch(setError(response.error));
      }
    });
  };
};

export const startDeviceScan = (request: array = []) => {
  console.log("startDeviceScan")
  console.log(request);
  return dispatch => {
    dispatch(setIsScanning(true));
    console.log("startDeviceScan-startTrackerSearch");
    console.log(request);
    dispatch(startTrackerSearch(request, true));
    /*ble.startDeviceScan(response => {
      if (response.error) {
        dispatch(setError(response.error));
      } else if (response.device) {
        // some devices have no name
        if (response.device.name) {
          // filter for TBS RaceTrackers
          if (response.device.name.startsWith('TBSRT')) {
            dispatch(discoverTracker(response.device));
          }
        }
      } else {
        // called on device scan completed by timeout
        dispatch(setIsScanning(false));
      }
    });*/
  };
};

export const stopDeviceScan = () => {
  console.log("stopDeviceScan");
  return dispatch => {
    ble.stopDeviceScan(response => {
      if (response.error) {
        dispatch(setError(response.error));
      } else {
        // fired on device scan stop manually (no timeout)
        dispatch(setIsScanning(false));
      }
    });
  };
};

/** initial state */
const initialState = {
  error: '',
  isAvailable: false,
  isEnabled: false,
  isScanning: false
};

/** reducers */
export default function(state = initialState, action: Action) {
  switch (action.type) {
    case BT_IS_AVAILABLE:
      return {
        ...state,
        isAvailable: action.payload,
        error: ''
      };
    case BT_IS_ENABLED:
      return {
        ...state,
        isEnabled: action.payload,
        error: ''
      };
    case BT_IS_SCANNING:
      return {
        ...state,
        isScanning: action.payload,
        error: ''
      };
    case BT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return { ...state, error: '' };
  }
}
