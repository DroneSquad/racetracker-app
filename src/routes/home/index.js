import React from 'react';
import { Link } from 'react-router-dom';

import { AppBar, List, ListItem } from 'material-ui';

import Logout from '../login/containers/LogoutContainer';
import { sendVoice } from '../../global/voice/modules/voice';

import { connect } from '../../store';

/** This component is used to test things in the app */
@connect()
export default class Home extends React.Component {
  static mapDispatchToProps = dispatch => ({
    onVoiceSend: () => dispatch(sendVoice('hello world')),
  });

  render() {
    return (
      <div>
        <AppBar iconElementLeft={<br />} title="Developer Menu" />
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
          <ListItem onTouchTap={this.props.onVoiceSend}>
            Send Voice
          </ListItem>
        </List>
      </div>
    );
  }
}
