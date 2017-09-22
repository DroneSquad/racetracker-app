import _ from 'lodash';
import api from '../../../services/api';

export const PEOPLE_REQUEST = 'PEOPLE_REQUEST';
export const PEOPLE_SUCCESS = 'PEOPLE_SUCCESS';

/** Request to fetch people */
export const peopleRequest = groupId => ({
  type: PEOPLE_REQUEST,
  payload: groupId
});

/** When people has been successfully generated */
export const peopleSuccess = pilots => ({
  type: PEOPLE_SUCCESS,
  payload: _.groupBy(pilots, 'role')
});

/** Get the group pilots */
export const groupPilots = groupId => {
  return dispatch => {
    dispatch(peopleRequest(groupId));
    api.groups.members(groupId).then(members => {
      delete members.$response;
      dispatch(peopleSuccess(members));
    });
  };
};

/** The default state for the people page */
const defaultState = {
  pilots: [] // There are no pilots to show by default
};

/** The reducer for the state */
export default function(state = defaultState, action) {
  switch (action.type) {
    case PEOPLE_REQUEST:
      return { ...state, pilots: null };
    case PEOPLE_SUCCESS:
      return { ...state, pilots: action.payload };
    default:
      return { ...state };
  }
}
