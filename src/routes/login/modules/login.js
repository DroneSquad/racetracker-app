import api from '../../../services/api';

/** types/constants */
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

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
    return api.pilots
      .login({ email: credentials.login, password: credentials.password })
      .then(response => {
        console.log(response);
        //sessionStorage.setItem('jwt', response.jwt);
        dispatch(loginSuccess());
      })
      .catch(error => {
        throw error;
      });
  };
};

/** initial_state */
const initialState = {
  token: null,
  error: null
};

/** reducers */
export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS: {
      return { ...state, token: payload };
    }
    case LOGIN_FAILURE: {
      return { ...state, error: payload };
    }
    default:
      return state;
  }
};
