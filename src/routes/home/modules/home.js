import api from '../../../services/api';

export const HOME_GROUP_REQUEST = 'HOME_GROUP_REQUEST';
export const HOME_GROUP_SUCCESS = 'HOME_GROUP_SUCCESS';
export const HOME_GROUP_ERROR = 'HOME_GROUP_ERROR';

export const HOME_RSVPS_REQUEST = 'HOME_RSVPS_REQUEST';
export const HOME_RSVPS_SUCCESS = 'HOME_RSVPS_SUCCESS';
export const HOME_RSVPS_ERROR = 'HOME_RSVPS_ERROR';

/** Request the groups for the pilot */
export function requestGroups(lng = 0, lat = 0) {
  return dispatch => {
    dispatch({
      type: HOME_GROUP_REQUEST,
      payload: { lng: lng, lat: lat }
    });
    return api.pilots
      .groups(lng, lat)
      .then(groups => {
        delete groups.$response;
        dispatch({
          type: HOME_GROUP_SUCCESS,
          payload: groups
        });
      })
      .catch(error =>
        dispatch({
          type: HOME_GROUP_ERROR,
          payload: error
        })
      );
  };
}

/** Request the meetups for the pilot */
export function requestRsvps(lng = 0, lat = 0) {
  return dispatch => {
    dispatch({
      type: HOME_RSVPS_REQUEST,
      payload: { lng: lng, lat: lat }
    });
    return api.pilots
      .rsvps(lng, lat)
      .then(rsvps => {
        delete rsvps.$response;
        dispatch({
          type: HOME_RSVPS_SUCCESS,
          payload: rsvps
        });
      })
      .catch(error =>
        dispatch({
          type: HOME_RSVPS_SUCCESS,
          payload: error
        })
      );
  };
}

/** The default state for the home page */
const defaultState = {};

/** The reducer for the state */
export default function(state = defaultState, action) {
  if (window.developer === true) {
    console.log('-- DEV-ACTION--');
    console.log(action); // Print out action when in developer mode
  }
  switch (action.type) {
    case HOME_GROUP_REQUEST:
      return { ...state, groups: null };
    case HOME_GROUP_SUCCESS:
      return { ...state, groups: action.payload };
    case HOME_RSVPS_REQUEST:
      return { ...state, rsvps: null };
    case HOME_RSVPS_SUCCESS:
      return { ...state, rsvps: action.payload };
    default:
      return { ...state };
  }
}
