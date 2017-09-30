import React from 'react';

import './settings-menu.css';
import { AppBar, List, ListItem, Divider } from 'material-ui';

import DeviceSettings from '../containers/DeviceSettingsContainer';
import FlyoverSetting from '../containers/FlyoverSettingContainer';

import SensitivitySetting from '../components/settings/SensitivitySetting';
import TimeDelaySetting from '../components/settings/TimeDelaySetting';

import { historyBackButton } from '../../../utils';

import tbs from '../../../services/racetracker';

/** Handles the main logic for the Tracker Settings Menu */
export default class extends React.Component {
  render() {
    // id of the tracker for this menu, passed along as part of react-router-redux push csommand
    let device_id = this.props.location.state;
    /* tbs.sendRawCommand("F", device_id);
    tbs.sendRawCommand("M", device_id);
    tbs.sendRawCommand("O", device_id);
    tbs.sendRawCommand("C", device_id);
    tbs.sendRawCommand("R", device_id);
    tbs.sendRawCommand("I", device_id);
    tbs.sendRawCommand(".", device_id);
    tbs.sendRawCommand("/", device_id);*/

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
