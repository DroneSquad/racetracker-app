// @flow

import React from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import LogoutContainer from '../../routes/login/containers/LogoutContainer';

export default class Home extends React.Component {
  state = { pilot: {} };

  componentWillMount() {
    api.groups.members(82, { limit: 1 }).then(pilot => {
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
        <Link to="/group/82">A Group</Link>
        <hr />
        <LogoutContainer />
        <pre>{JSON.stringify(this.state.pilot, '&nbsp;', 2)}</pre>
      </div>
    );
  }
}
