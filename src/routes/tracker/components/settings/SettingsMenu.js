import React from 'react';

import './settings-menu.css';
import { AppBar, List, ListItem, Divider } from 'material-ui';

import DeviceSettings from '../../containers/DeviceSettingsContainer';
import FlyoverSetting from '../../containers/FlyoverSettingContainer';

import SensitivitySetting from './SensitivitySetting';
import TimeDelaySetting from './TimeDelaySetting';

import { historyBackButton } from '../../../../utils';

/** Handles the main logic for the Tracker Settings Menu */
export default class extends React.Component {
  render() {
    // active tracker id, passed along as part of react-router-redux push command
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
            <ListItem disabled primaryText={<DeviceSettings id={device_id} history={this.props.history} />} />
            <Divider />
            <ListItem disabled primaryText={<FlyoverSetting id={device_id} />} />
            <Divider />
            <ListItem disabled primaryText={<SensitivitySetting id={device_id} />} />
            <Divider />
            <ListItem disabled primaryText={<TimeDelaySetting id={device_id} />} />
          </List>
        </main>
      </div>
    );
  }
}
