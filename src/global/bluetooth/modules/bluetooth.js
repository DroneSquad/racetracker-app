import ble from '../../../services/bluetooth';

/** types */
export const BT_IS_SCANNING = 'BT_IS_SCANNING';
export const BT_IS_ENABLED = 'BT_IS_ENABLED';
export const BT_IS_AVAILABLE = 'BT_IS_AVAILABLE';
export const BT_IS_NOTIFYING = 'BT_IS_NOTIFYING';
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

export const setIsNotifying = (value: boolean) => ({
  type: BT_IS_NOTIFYING,
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
        dispatch(setIsEnabled(response));  // update the state of bluetooth
        dispatch(setIsNotifying(true));  // state notifications activated
      }
    });
  };
};

export const stopStateNotifications = () => {
  return dispatch => {
    ble.stopStateNotifications(response => {
      if (response.error) {
        dispatch(setError(response.error));
      } else {
        dispatch(setIsNotifying(false));  // state notifications deactivated
      }
    });
  };
};

/** initial state */
const initialState = {
  error: '',
  isAvailable: false,
  isEnabled: false,
  isScanning: false,
  isNotifying: false,
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
    case BT_IS_NOTIFYING:
      return {
        ...state,
        isNotifying: action.payload
      };
    default:
      return { ...state, error: '' };
  }
}
