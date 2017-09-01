/** types */
export const BT_IS_SCANNING = 'BT_IS_SCANNING';

/** actions */
export const setBtIsScanning = (value: boolean) => ({
  type: BT_IS_SCANNING,
  payload: value
});

/** reducers */
const initialState = {
  isScanning: false
};

const bluetooth = (state = initialState, action: Action) => {
  switch (action.type) {
    case BT_IS_SCANNING:
      return Object.assign({}, state, {
        isScanning: action.payload
      });
    default:
      return state;
  }
};

export default bluetooth;
