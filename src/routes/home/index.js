import React from 'react';
import { Link } from 'react-router-dom';

import { AppBar, List, ListItem } from 'material-ui';

import Logout from '../login/containers/LogoutContainer';
import { sendVoice } from '../../global/voice/modules/voice';

/** This component is used to test things in the app */
export default class Home extends React.Component {
  state = { };

  onSendVoice = () => {
    console.log('sending voice');
    sendVoice('hello world');
  };

  render() {
    return (
      <div>
        <AppBar title="Developer Menu" />
        <List>
          <ListItem>
            <Link to="/">Home</Link>
          </ListItem>
          <ListItem>
            <Logout />
          </ListItem>
          <ListItem>
            <Link to="/tracker">TBS RaceTracker</Link>
          </ListItem>
          <ListItem>
            <a onClick={this.onSendVoice}>Send Voice</a>
          </ListItem>
        </List>
      </div>
    );
  }
}
