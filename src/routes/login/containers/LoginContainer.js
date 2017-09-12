// @flow

import { connect } from 'react-redux';
import { loginRequest } from '../modules/login';

import Login from '../components/Login';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the Login:   */

const mapStateToProps = (state, ownProps) => ({
  token: state.auth.token,
  error: state.auth.error
});

const mapDispatchToProps = (dispatch: Function) => ({
  authLogin(cert) {
    dispatch(loginRequest(cert));
  }
});

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;
