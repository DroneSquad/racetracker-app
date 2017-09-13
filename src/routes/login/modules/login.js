import api from '../../../services/api';
import { push } from 'react-router-redux';

/** types/constants */
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const FORGOT_SUCCESS = 'FORGOT_SUCCESS';
export const FORGOT_FAILURE = 'FORGOT_FAILURE';

/** actions */
export const loginSuccess = token => ({
  type: LOGIN_SUCCESS,
  payload: token
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: error
});

export const loginRequest = credentials => {
  return function(dispatch) {
    return (
      api.pilots
        .login(credentials.login, credentials.password)
        .then(response => {
          let token = {
            hash: response.id,
            ttl: response.ttl,
            pilot: response.userId,
            created: response.created
          };
          dispatch(loginSuccess(token));
        })
        // TODO: handle errors correctly
        .catch(error => {
          throw error;
        })
    );
  };
};

export const registerRequest = register => {
  return function(dispatch) {
    return (
      api.pilots
        .register(
          register.firstName,
          register.lastName,
          register.callsign,
          register.email,
          register.password
        )
        .then(response => {
          console.log(response);
          dispatch(push('/account/login'));
        })
        // TODO: handle errors correctly
        .catch(error => {
          throw error;
        })
    );
  };
};

export const forgotRequest = email => {
  return function(dispatch) {
    return (
      api.pilots
        .forgot(email)
        .then(response => {
          console.log(response);
          dispatch(push('/account/login'));
        })
        // TODO: handle errors correctly
        .catch(error => {
          throw error;
        })
    );
  };
};

/** initial_state */
const initialState = {
  token: null,
  error: null
};

/** reducers */
export const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return Object.assign({}, state, {
        token: action.payload
      });
    }
    case LOGIN_FAILURE: {
      return { ...state, error: action.payload };
    }
    default:
      return state;
  }
};
