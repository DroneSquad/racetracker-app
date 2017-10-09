import React from 'react';
import { push } from 'react-router-redux';

import { AppBar, List, ListItem } from 'material-ui';

import { sendVoice } from '../../global/voice/modules/voice';
import { logoutRequest } from '../../routes/login/modules/login';

import { connect } from '../../store';

/** This component is used to test things in the app */
@connect()
export default class Home extends React.Component {
  static mapStateToProps = states => ({
    token: states.auth.token
  });

  static mapDispatchToProps = dispatch => ({
    onHome: () => dispatch(push('/')),
    onLogout: token => dispatch(logoutRequest(token)),
    onVoiceSend: () => dispatch(sendVoice('hello world')),
    onTracker: () => dispatch(push('/tracker'))
  });

  render() {
    return (
      <div>
        <AppBar
          iconClassNameLeft="mdi mdi-home"
          onLeftIconButtonTouchTap={this.props.onHome}
          title="Developer Menu"
          iconClassNameRight="mdi mdi-logout"
          onRightIconButtonTouchTap={() => this.props.onLogout(this.props.token)}
        />
        <List>
          <ListItem onTouchTap={this.props.onTracker}>TBS RaceTracker</ListItem>
          <ListItem onTouchTap={this.props.onVoiceSend}>Send Voice</ListItem>
        </List>
      </div>
    );
  }
}
