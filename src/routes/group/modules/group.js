import api from '../../../services/api';

export const GROUP_REQUEST = 'GROUP_REQUEST';
export const GROUP_SUCCESS = 'GROUP_SUCCESS';
export const GROUP_ERROR = 'GROUP_ERROR';
export const GROUP_MEMBERS_REQUEST = 'GROUP_MEMBERS_REQUEST';
export const GROUP_MEMBERS_SUCCESS = 'GROUP_MEMBERS_SUCCESS';
export const GROUP_MEMBERS_ERROR = 'GROUP_MEMBERS_ERROR';

/** Get the request for the group */
export function requestGroup(id) {
  return dispatch => {
    dispatch({
      type: GROUP_REQUEST,
      payload: id
    });
    api
      .group(id)
      .then(data =>
        dispatch({
          type: GROUP_SUCCESS,
          payload: data
        })
      )
      .catch(data =>
        dispatch({
          type: GROUP_ERROR,
          payload: data
        })
      );
  };
}

/** Get the list of members that belong to the group */
export function requestMembers(id, filter) {
  return dispatch => {
    dispatch({
      type: GROUP_MEMBERS_REQUEST,
      payload: id
    });
    api.groups
      .members(id, filter)
      .then(data =>
        dispatch({
          type: GROUP_MEMBERS_SUCCESS,
          payload: data
        })
      )
      .catch(data =>
        dispatch({
          type: GROUP_MEMBERS_ERROR,
          payload: data
        })
      );
  };
}

/** The default state for the group page */
const defaultState = {};

/** The reducer for the state */
export default function(state = defaultState, action) {
  switch (action.type) {
    case GROUP_REQUEST:
      return { ...state, loading: true, id: Number(action.payload) };
    case GROUP_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case GROUP_MEMBERS_REQUEST:
      return { ...state, members: null };
    case GROUP_MEMBERS_SUCCESS:
      return { ...state, members: action.payload };
    default:
      return { ...state };
  }
}
