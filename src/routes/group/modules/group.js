import api from '../../../services/api';
import axios from 'axios';

export const GROUP_REQUEST = 'GROUP_REQUEST';
export const GROUP_SUCCESS = 'GROUP_SUCCESS';
export const GROUP_ERROR = 'GROUP_ERROR';
export const GROUP_MEMBERS_REQUEST = 'GROUP_MEMBERS_REQUEST';
export const GROUP_MEMBERS_SUCCESS = 'GROUP_MEMBERS_SUCCESS';
export const GROUP_MEMBERS_ERROR = 'GROUP_MEMBERS_ERROR';
export const GROUP_MEMBER_COUNT_REQUEST = 'GROUP_MEMBER_COUNT_REQUEST';
export const GROUP_MEMBER_COUNT_SUCCESS = 'GROUP_MEMBER_COUNT_SUCCESS';
export const GROUP_MEMBER_COUNT_ERROR = 'GROUP_MEMBER_COUNT_ERROR';
export const GROUP_LOADING = 'GROUP_LOADING';
export const GROUP_LOADING_DONE = 'GROUP_LOADING_DONE';
export const GROUP_ADMIN_REQUEST = 'GROUP_ADMIN_REQUEST';
export const GROUP_ADMIN_SUCCESS = 'GROUP_ADMIN_SUCCESS';
export const GROUP_ADMIN_ERROR = 'GROUP_ADMIN_ERROR';

/** Request all the group data at the same time, so the loading screen can disappear properly */
export function requestAllGroupData(id) {
  return dispatch => {
    dispatch({
      type: GROUP_LOADING,
      payload: id
    });
    axios.all([requestGroup(id)(dispatch), requestMemberCount(id)(dispatch)]).then(
      axios.spread(group => {
        requestPilot(group.payload.createdById)(dispatch).then(() =>
          dispatch({
            type: GROUP_LOADING_DONE,
            payload: id
          })
        );
      })
    );
  };
}

/** Get the request for the group */
export function requestPilot(id) {
  return dispatch => {
    dispatch({
      type: GROUP_ADMIN_REQUEST,
      payload: id
    });
    return api.public
      .pilot(id)
      .then(data =>
        dispatch({
          type: GROUP_ADMIN_SUCCESS,
          payload: data
        })
      )
      .catch(data =>
        dispatch({
          type: GROUP_ADMIN_ERROR,
          payload: data
        })
      );
  };
}

/** Get the request for the group */
export function requestGroup(id) {
  return dispatch => {
    dispatch({
      type: GROUP_REQUEST,
      payload: id
    });
    return api
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

/** Get the member count of the group */
export function requestMemberCount(id) {
  return dispatch => {
    dispatch({
      type: GROUP_MEMBER_COUNT_REQUEST,
      payload: id
    });
    return api.groups
      .memberCount(id)
      .then(data =>
        dispatch({
          type: GROUP_MEMBER_COUNT_SUCCESS,
          payload: data
        })
      )
      .catch(data =>
        dispatch({
          type: GROUP_MEMBER_COUNT_ERROR,
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
      return { ...state, id: Number(action.payload) };
    case GROUP_SUCCESS:
      return { ...state, ...action.payload };
    case GROUP_MEMBERS_REQUEST:
      return { ...state, members: null };
    case GROUP_MEMBERS_SUCCESS:
      return { ...state, members: action.payload };
    case GROUP_MEMBER_COUNT_SUCCESS:
      return { ...state, memberCount: action.payload.count };
    case GROUP_LOADING:
      return { ...state, loading: true };
    case GROUP_LOADING_DONE:
      return { ...state, loading: false };
    case GROUP_ADMIN_REQUEST:
      return { ...state, admin: null };
    case GROUP_ADMIN_SUCCESS:
      return { ...state, admin: action.payload.display };
    default:
      return { ...state, loading: true };
  }
}
