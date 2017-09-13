// @flow

import React from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

export default class Home extends React.Component {
<<<<<<< HEAD
  props: {};
=======
  state = {pilot: {}}

  componentWillMount() {
    api.pilot().then(pilot => this.setState({pilot: pilot.$request.data}));
  }
>>>>>>> 52f6ee9b089ab5d7e64101257be170dc492fca1a

  render() {
  return (
      <div>
        Home Content
        <hr />
        <Link to="/tracker">TBS Race Tracker</Link>
        <hr />
        <Link to="/people">People</Link>
        <hr />
        <pre>
          {JSON.stringify(this.state.pilot, '&nbsp;', 2)}
        </pre>
      </div>
    );
  }
}
