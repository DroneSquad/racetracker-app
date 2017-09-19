import api from '../../../services/api';

export const GROUP_REQUEST = 'GROUP_REQUEST';
export const GROUP_SUCCESS = 'GROUP_SUCCESS';
export const GROUP_ERROR = 'GROUP_ERROR';

/** Get the request for the group */
export function requestGroup(id) {
  return dispatch => {
    dispatch({
      type: GROUP_REQUEST,
      payload: id
    });
    api.group(id)
      .then(data => dispatch({
        type: GROUP_SUCCESS,
        payload: data
      }))
      .catch(data => dispatch({
        type: GROUP_ERROR,
        payload: data
      }));
  }
}

/** The default state for the group page */
const defaultState = {
};

/** The reducer for the state */
export default function(state = defaultState, action) {
  switch (action.type) {
    case GROUP_REQUEST:
      return { ...state, loading: true };
    case GROUP_SUCCESS:
      return { ...state, ...action.payload, loading: false};
    default:
      return { ...state };
  }
};
