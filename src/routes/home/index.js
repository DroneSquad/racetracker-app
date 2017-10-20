import React from 'react';
import { push } from 'react-router-redux';

import uuid from 'uuid';
import moment from 'moment';

import { AppBar, List, ListItem, TextField } from 'material-ui';

import { sendVoice } from '../../global/voice/modules/voice';
import { logoutRequest } from '../../routes/login/modules/login';
import { announceLapsFromResponse } from '../../routes/fly/modules/announcer';
import { setQueryInterval } from '../../routes/fly/modules/race';

import { connect } from '../../store';

/** This component is used to test things in the app */
@connect()
export default class Home extends React.Component {

  componentWillMount() {
    let interval = 1
    if (this.props.raceQueryInterval) {
      interval = this.props.raceQueryInterval
    }
    this.setState({ interval: interval });
  }

  state = {}

  static mapStateToProps = states => ({
    token: states.auth.token,
    raceQueryInterval: states.race.queryInterval
  });

  static mapDispatchToProps = dispatch => ({
    onHome: () => dispatch(push('/')),
    onLogout: token => dispatch(logoutRequest(token)),
    onVoiceSend: () => dispatch(sendVoice('hello world')),
    onTracker: () => dispatch(push('/tracker')),
    onFakeLap: () => dispatch(announceLapsFromResponse({ racer: Number(1), lap: Number(1), lapTime: moment().format('mm:ss.SS'), totalTime: '12345', heat: { id: uuid.v4() } })),
    setInterval: value => dispatch(setQueryInterval(value)),
  });

  handleChange = (event, value) => {
    if (value) {
      this.props.setInterval(value);
    }
  };

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
        Interval Value:
        <TextField className="right" type="number" defaultValue={this.state.interval} onChange={this.handleChange} />
      </div>
    );
  }
}
