// @flow

import React from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

export default class Home extends React.Component {
  state = { pilot: {} };

  componentWillMount() {
    api.pilots.groups(0, 0).then(pilot => {
      console.log(pilot);
      this.setState({ pilot: pilot.$request.data });
    });
  }

  render() {
    return (
      <div>
        Home Content
        <hr />
        <Link to="/tracker">TBS Race Tracker</Link>
        <hr />
        <Link to="/people">People</Link>
        <hr />
        <pre>{JSON.stringify(this.state.pilot, '&nbsp;', 2)}</pre>
      </div>
    );
  }
}
