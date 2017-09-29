import api from '../../../services/api';

export const HOME_GROUP_REQUEST = 'HOME_GROUP_REQUEST';
export const HOME_GROUP_SUCCESS = 'HOME_GROUP_SUCCESS';
export const HOME_GROUP_ERROR = 'HOME_GROUP_ERROR';

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
        })
      })
      .catch(error => dispatch({
        type: HOME_GROUP_ERROR,
        payload: error
      }));
  };
}

/** Request the meetups for the pilot */
export function requestMeetups(lng = 0, lat = 0) {
  return dispatch => {
    // dispatch({
    //   type: HOME_GROUP_REQUEST,
    //   payload: { lng: lng, lat: lat }
    // });
    // return api.pilots
    //   .groups(lng, lat)
    //   .then(groups => {
    //     delete groups.$response;
    //     dispatch({
    //       type: HOME_GROUP_SUCCESS,
    //       payload: groups
    //     })
    //   })
    //   .catch(error => dispatch({
    //     type: HOME_GROUP_ERROR,
    //     payload: error
    //   }));
  };
}

/** The default state for the home page */
const defaultState = {
};

/** The reducer for the state */
export default function(state = defaultState, action) {
  switch (action.type) {
    case HOME_GROUP_REQUEST:
      return { ...state, groups: null };
    case HOME_GROUP_SUCCESS:
      return { ...state, groups: action.payload };
    default:
      return { ...state };
  }
}
