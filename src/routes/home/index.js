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
    let interval = 1;
    if (this.props.raceQueryInterval) {
      interval = this.props.raceQueryInterval;
    }
    this.setState({ interval: interval });
  }

  state = {};

  static mapStateToProps = states => ({
    token: states.auth.token,
    raceQueryInterval: states.race.queryInterval
  });

  static mapDispatchToProps = dispatch => ({
    onHome: () => dispatch(push('/')),
    onLogout: token => dispatch(logoutRequest(token)),
    onVoiceSend: value => dispatch(sendVoice(value)),
    onTracker: () => dispatch(push('/tracker')),
    onFakeLap: () =>
      dispatch(
        announceLapsFromResponse({
          racer: Number(1),
          lap: Number(1),
          lapTime: '654535',
          totalTime: '12345',
          heat: { id: uuid.v4() }
        })
      ),
    setInterval: value => dispatch(setQueryInterval(value))
  });

  /** Listen for the return key and trigger the announcer*/
  onKeyPressVoiceText = event => {
    if (event.charCode === 13) { // Return key
      event.preventDefault();
      event.stopPropagation();
      this.props.onVoiceSend(this._tts.input.value);
    }
  };

  /** Handle the change for the interval setting */
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
          <ListItem
            onTouchTap={() => this.props.onVoiceSend(this._tts.input.value)}
            rightIconButton={
              <TextField className="right" type="text" defaultValue="Hello World" ref={ref => (this._tts = ref)} onKeyPress={this.onKeyPressVoiceText} />
            }
          >
            Send Voice
          </ListItem>
          <ListItem onTouchTap={this.props.onFakeLap}>Fake Lap</ListItem>
          <ListItem
            rightIconButton={
              <TextField
                className="right"
                type="number"
                defaultValue={this.state.interval}
                onChange={this.handleChange}
              />
            }
          >
            {' '}Interval Value:
          </ListItem>
        </List>
      </div>
    );
  }
}
