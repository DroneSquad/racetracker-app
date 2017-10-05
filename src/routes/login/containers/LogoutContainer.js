// @flow
import { connect } from 'react-redux';
import { logoutRequest } from '../modules/login';

import Logout from '../components/Logout';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the Forgot:   */

const mapStateToProps = state => ({
  token: state.auth.token
});

const mapDispatchToProps = (dispatch: Function) => ({
  authLogout: token => dispatch(logoutRequest(token))
});

const LogoutContainer = connect(mapStateToProps, mapDispatchToProps)(Logout);

export default LogoutContainer;
