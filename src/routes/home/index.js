import React from 'react';
import { push } from 'react-router-redux';

import uuid from 'uuid';

import { AppBar, List, ListItem } from 'material-ui';

import { sendVoice } from '../../global/voice/modules/voice';
import { logoutRequest } from '../../routes/login/modules/login';
import { announceLapsFromResponse } from '../../routes/fly/modules/announcer';

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
    onTracker: () => dispatch(push('/tracker')),
    onFakeLap: () => dispatch(announceLapsFromResponse({ racer: Number(1), lap: Number(1), lapTime: '5:55.5', totalTime: '12:12.12', heat: { id: uuid.v4() } }))
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
          <ListItem onTouchTap={this.props.onFakeLap}>Fake Lap</ListItem>
        </List>
      </div>
    );
  }
}
