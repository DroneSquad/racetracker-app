/** types */
export const BT_IS_SCANNING = 'BT_IS_SCANNING';
export const BT_IS_ENABLED = 'BT_IS_ENABLED';

// export const BT_IS_CONNECTED = 'BT_IS_CONNECTED';
// export const BT_CONNECT = 'BT_CONNECT';
// export const BT_DISCONNECT = 'BT_DISCONNECT';

/** actions */
export const btIsEnabled = result => ({
  type: BT_IS_ENABLED,
  payload: result
});

//export const btReducer = (state=)
//
// /** initial_state & reducers */
// export const authReducer = (state = DEFAULT_STATE, { type, payload }) => {
//   switch (type) {
//     case BT_IS_ENABLED: {
//       return { ...state, token: payload };
//     }
//     case AUTH_FAILURE: {
//       return { ...state, error: payload };
//     }
//     default:
//       return state;
//   }
// };
