import React from 'react';
import { Link } from 'react-router-dom';

import Logout from '../login/containers/LogoutContainer';
import { sendVoice } from '../../global/voice/modules/voice';

/** This component is used to test things in the app */
export default class Home extends React.Component {
  state = { pilot: {} };

  onSendVoice = () => {
    sendVoice('hello world');
  };

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
        <Logout />
        <button onClick={this.onSendVoice}>Send Voice</button>
      </div>
    );
  }
}
