// @flow

import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {

  props: {};

  render() {
    return (
      <div>
        Home Content 55
        <hr />
        <Link to="/tracker">TBS Race Tracker</Link>
        <hr />
        <Link to="/people">People</Link>
      </div>
    );
  }
}
