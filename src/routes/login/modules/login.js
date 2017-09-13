import api from '../../../services/api';
import { push } from 'react-router-redux';

/** types/constants */
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const FORGOT_REQUEST = 'FORGOT_REQUEST';
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
    dispatch({
      type: LOGIN_REQUEST,
      payload: credentials,
    });
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
    dispatch({
      type: REGISTER_REQUEST,
      payload: register,
    });
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
    dispatch({
      type: FORGOT_REQUEST,
      payload: email,
    });
    return (
      api.pilots
        .forgot(email)
        .then(response => {
          dispatch(push('/account/login', {loginMessage: 'Email has been sent'}));
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
  loginMessage: null,
  token: null,
  error: null,
  loading: false,
};

/** reducers */
export const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case FORGOT_REQUEST:
    case LOGIN_REQUEST: {
      return { ...state, loading: true};
    }
    case LOGIN_SUCCESS: {
      return Object.assign({}, state, {
        token: action.payload,
        loading: false
      });
    }
    case LOGIN_FAILURE: {
      return { ...state, error: action.payload, loading: false };
    }
    case FORGOT_SUCCESS: {
      return { ...state, loginMessage: 'true', loading: false };
    }
    default:
      return { ...state, loading: false };
  }
};
