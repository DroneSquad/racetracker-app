import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

//Mock of an Auth method, can be replaced with an async call to the backend. Must return true or false
const isAuthenticated = () => true;

const AuthRoute = ({ component, ...props }) => {
  if (isAuthenticated()) {
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

AuthRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
};

export default AuthRoute;
