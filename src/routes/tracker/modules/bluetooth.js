import ble from '../../../services/bluetooth';

/** types */
export const BT_IS_SCANNING = 'BT_IS_SCANNING';
export const BT_IS_ENABLED = 'BT_IS_ENABLED';
export const BT_IS_AVAILABLE = 'BT_IS_AVAILABLE';
export const BT_IS_CONNECTED = 'BT_IS_CONNECTED';

/** actions */
export const setIsAvailable = (response: Object) => ({
  type: BT_IS_AVAILABLE,
  payload: response
});

export const setIsEnabled = (response: Object) => ({
  type: BT_IS_ENABLED,
  payload: response
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

export const startStateNotifications = () => {
  return dispatch => {
    ble.startStateNotifications((response) => {
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
    default:
      return { ...state, message:'' };
  }
};
