import React from 'react';
// import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

//Mock of an Auth method, can be replaced with an async call to the backend. Must return true or false
const isAuthenticated = props => {
  // TODO: perform actual validation regarding ttl, etc
  return props.token;
};

const AuthRoute = ({ component, ...props }) => {
  if (isAuthenticated(props)) {
    // TODO: check if they are trying to go to login, if so redirect to index
    return <Route {...props} component={component} />;
  } else {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location }
        }}
      />
    );
  }
};

//AuthRoute.propTypes = {
//  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
//};

const mapStateToProps = state => ({
  token: state.auth.token
});

export default connect(mapStateToProps)(AuthRoute);
