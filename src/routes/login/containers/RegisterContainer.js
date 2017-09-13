// @flow

import { connect } from 'react-redux';
import { registerRequest } from '../modules/login';

import Register from '../components/Register';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the Login:   */

const mapStateToProps = state => ({
  error: state.auth.error
});

const mapDispatchToProps = (dispatch: Function) => ({
  registerLogin(reg) {
    // TODO: add something to snackbar that indicates soccuess maybe?
    dispatch(registerRequest(reg));
  }
});

const RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(Register);

export default RegisterContainer;
