// @flow
import { connect } from 'react-redux';
import { forgotRequest } from '../modules/login';

import Forgot from '../components/Forgot';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the Forgot:   */

const mapStateToProps = state => ({
  loading: state.loading,
  error: state.auth.error,
  message: state.auth.message
});

const mapDispatchToProps = (dispatch: Function) => ({
  forgotLogin(email) {
    dispatch(forgotRequest(email));
  }
});

const ForgotContainer = connect(mapStateToProps, mapDispatchToProps)(Forgot);

export default ForgotContainer;
