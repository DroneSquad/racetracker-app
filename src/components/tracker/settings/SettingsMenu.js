import React from 'react';

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';

import SensitivitySetting from './SensitivitySetting';
import TimeDelaySetting from './TimeDelaySetting';

import { historyBackButton } from '../../../utils';

/** Handles the main logic for the tracker things */
export default class Tracker extends React.Component {

  constructor(props) {
    super(props);
    this.trackerName = 'Tracker Name';
    this.battery = 50;
    this.range = 100;
  }

  render() {
    let { trackerName, battery, range } = this;

    return (
      <div>
        <header>
          <AppBar title="RaceTracker Settings" iconClassNameLeft="mdi mdi-arrow-left" onLeftIconButtonTouchTap={historyBackButton.bind(this)}/>
        </header>
        <Paper zDepth={1} rounded={false}>
          <h2 className="no-margin">{trackerName}</h2>
          <div>
            <FontIcon className="mdi mdi-battery-50"/> {battery}%
            <FontIcon className="mdi mdi-access-point"/> {range}%
          </div>
        </Paper>
        <SensitivitySetting />
        <TimeDelaySetting />
      </div>
    );
  }
}
