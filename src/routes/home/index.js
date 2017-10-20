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
    console.log("CONSTRUCTOR");
    let interval = 1
    console.log(interval);
    if (this.props.raceQueryInterval) {
      console.log("INHERE")
      interval = this.props.raceQueryInterval
    }
    console.log("BEFORE");
    this.setState({ interval: interval });
    console.log(this.state.interval);
  }

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

  handleChange = event => {
    console.log(event)
    if (event.target.value) {
      this.props.setInterval(event.target.value);
    }
  };

  render() {
    console.log("RENDER");
    console.log(this.state.interval);
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
          <ListItem
            primaryText={<TextField className="right" type="number" value={this.state.interval} onChange={this.props.handleChange} />}
          />
        </List>
      </div>
    );
  }
}
