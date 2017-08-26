// @flow

import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props: {}) => {
  return (
    <div>
      Home Content
      <hr />
      <Link to="/tracker">TBS Race Tracker</Link>
    </div>
  );
};

export default Home;
