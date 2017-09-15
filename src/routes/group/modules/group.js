import api from '../../../services/api';

export const GROUP_REQUEST = 'GROUP_REQUEST';
export const GROUP_SUCCESS = 'GROUP_REQUEST';
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
  banner: null,
  id: null,
  name: null,
  description: null,
};

/** The reducer for the state */
export default function(state = defaultState, action) {
  switch (action.type) {

  }
  return { ...state };
};
