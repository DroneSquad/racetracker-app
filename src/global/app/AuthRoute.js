import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const isAuthenticated = props => {
  // TODO: perform actual validation regarding ttl, etc
  return props.token;
};

const AuthRoute = ({ component, ...props }) => {
  return <Route {...props} component={component} />;
  // disabled the login routine for this release
  /*if (isAuthenticated(props)) {
    return <Route {...props} component={component} />;
  } else {
    return (
      <Redirect
        to={{
          pathname: `/account/login?redirect=${props.location.pathname}`,
          state: { from: props.location }
        }}
      />
    );
  }*/
};

AuthRoute.propTypes = {
  // TODO: can we do this in flow? wouldnt check need to happen at runtime? not sure..
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
};

const mapStateToProps = state => ({
  token: state.auth.token
});

export default connect(mapStateToProps)(AuthRoute);
