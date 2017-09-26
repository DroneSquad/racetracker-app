import React from 'react';

import './settings-menu.css';
import { AppBar, List, ListItem, Divider } from 'material-ui';

import DeviceSettings from '../containers/DeviceSettingsContainer';
// import SensitivitySetting from './SensitivitySetting';
// import TimeDelaySetting from './TimeDelaySetting';
// import FlyoverSetting from './FlyoverSetting';

import { historyBackButton } from '../../../utils';

/** Handles the main logic for the Tracker Settings Menu */
export default class extends React.Component {
  render() {
    let device_id = this.props.location.state;
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
              primaryText={<DeviceSettings device_id={device_id} history={this.props.history} />}
            />
            <Divider />
          </List>
        </main>
      </div>
    );
  }
}

/*
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
*/
