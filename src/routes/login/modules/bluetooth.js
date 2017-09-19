/** types */
export const BT_IS_SCANNING = 'BT_IS_SCANNING';
export const BT_IS_ENABLED = 'BT_IS_ENABLED';

/** actions */
export const setBtIsScanning = (value: boolean) => ({
  type: BT_IS_SCANNING,
  payload: value
});

export const setBtIsEnabled = (value: boolean) => ({
  type: BT_IS_ENABLED,
  payload: value
});

/** reducers */
const initialState = {
  isScanning: false,
  isEnabled: false
};

const bluetooth = (state = initialState, action: Action) => {
  switch (action.type) {
    case BT_IS_SCANNING:
      return Object.assign({}, state, {
        isScanning: action.payload
      });
    case BT_IS_ENABLED:
      return Object.assign({}, state, {
        isEnabled: action.payload
      });
    default:
      return state;
  }
};

export default bluetooth;
