import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        Home Content
        <hr />
        <Link to="/tracker">TBS Race Tracker</Link>
      </div>
    );
  }
}
