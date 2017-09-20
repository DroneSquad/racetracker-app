import React from 'react';

import { AppBar, List, ListItem, Divider } from 'material-ui';

import DeviceSetting from './DeviceSetting';
import SensitivitySetting from './SensitivitySetting';
import TimeDelaySetting from './TimeDelaySetting';
import FlyoverSetting from './FlyoverSetting';

import { historyBackButton /*notNull*/ } from '../../../utils';

import './settings-menu.css';

/** Handles the main logic for the tracker things */
export default class Tracker extends React.Component {
  render() {
    let bluetoothDevice = this.props.location.state || {}; //notNull(this.props.location.state, 'Must have the state for the current window');
    console.log(this.props.location.state); // this contains the current state for the view
    return (
      <div className="main settings-menu">
        <header>
          <AppBar
            title="RaceTracker Settings"
            iconClassNameLeft="mdi mdi-arrow-left"
            onLeftIconButtonTouchTap={historyBackButton.bind(this)}
          />
        </header>
        <main>
          <List>
            <ListItem
              disabled
              primaryText={<DeviceSetting bluetooth={bluetoothDevice} history={this.props.history} />}
            />
            <Divider />
            <ListItem disabled primaryText={<FlyoverSetting bluetooth={bluetoothDevice} />} />
            <Divider />
            <ListItem disabled primaryText={<SensitivitySetting bluetooth={bluetoothDevice} />} />
            <Divider />
            <ListItem disabled primaryText={<TimeDelaySetting bluetooth={bluetoothDevice} />} />
          </List>
        </main>
      </div>
    );
  }
}
