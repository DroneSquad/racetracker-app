import ble from '../../../services/bluetooth';
import { discoverTracker } from './racetracker';
/** types */
export const BT_IS_SCANNING = 'BT_IS_SCANNING';
export const BT_IS_ENABLED = 'BT_IS_ENABLED';
export const BT_IS_AVAILABLE = 'BT_IS_AVAILABLE';
export const BT_IS_CONNECTED = 'BT_IS_CONNECTED';
export const BT_NO_OP = 'BT_NO_OP';

/** actions */
export const noOp = () => ({
  type: BT_NO_OP,
  payload: null
});

export const setIsAvailable = (response: Object) => ({
  type: BT_IS_AVAILABLE,
  payload: response
});

export const setIsEnabled = (response: Object) => ({
  type: BT_IS_ENABLED,
  payload: response
});

export const setIsScanning = (value: boolean) => ({
  type: BT_IS_SCANNING,
  payload: value
});

export const isAvailable = () => {
  return dispatch => {
    ble.isAvailable((response) => {
      dispatch(setIsAvailable({ value: response.value, message: response.message }));
    });
  };
};

export const isEnabled = () => {
  return dispatch => {
    ble.isEnabled((response) => {
      dispatch(setIsEnabled({ value: response.value, message: response.message }));
    });
  };
};

export const enable = () => {
  return dispatch => {
    ble.enable((response) => {
      dispatch(setIsEnabled({ value: response.value, message: response.message }));
    });
  };
};

export const startStateNotifications = () => {
  return dispatch => {
    ble.startStateNotifications((response) => {
      dispatch(setIsEnabled({ value: response.value, message: response.message }));
    });
  };
};

export const stopStateNotifications = () => {
  return dispatch => {
    ble.stopStateNotifications((response) => {
      dispatch(noOp());
    });
  };
};

export const startDeviceScan = () => {
  return dispatch => {
    dispatch(setIsScanning(true));
    ble.startDeviceScan((response) => {
      if (response.type === 'device') {
        if (response.device.name.startsWith('TBSRT')) {
          dispatch(discoverTracker(response.device));
        }
      };
      if (response.type === 'stop') {
        dispatch(setIsScanning(false));
      };
      if (response.type === 'error') {
        // TODO: add in some proper logging for errors
        console.log(response.error);
      }
    });
  };
};

export const stopDeviceScan = () => {
  return dispatch => {
    ble.stopDeviceScan(() => {
      dispatch(setIsScanning(false));
    });
  };
}

/** initial state */
const initialState = {
  message:'',
  error: null,
  isAvailable: false,
  isEnabled: false,
  isScanning: false,
  isConnected: false
};

/** reducers */
export default function(state = initialState, action: Action) {
  switch (action.type) {
    case BT_IS_AVAILABLE:
      return {
        ...state,
        isAvailable: action.payload.value,
        message: action.payload.message
      };
    case BT_IS_ENABLED:
      return {
        ...state,
        isEnabled: action.payload.value,
        message: action.payload.message
      };
    case BT_IS_SCANNING:
      return {
        ...state,
        isScanning: action.payload
      };
    default:
      return { ...state, message:'' };
  }
};
