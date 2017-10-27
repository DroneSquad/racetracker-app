import React from 'react';

import './settings-menu.css';
import { AppBar, List, ListItem, Divider } from 'material-ui';

import DeviceSettings from '../../containers/settings/DeviceSettingsContainer';
import FlyoverSetting from '../../containers/settings/FlyoverSettingContainer';
import DisconnectTracker from '../../containers/settings/DisconnectTrackerContainer';
import SensitivitySetting from '../../containers/settings/SensitivitySettingContainer';
import TimeDelaySetting from '../../containers/settings/TimeDelaySettingContainer';

import { historyBackButton } from '../../../../utils';

/** Handles the main logic for the Tracker Settings Menu */
export default class extends React.Component {
  props: {
    id: string
  };

  render() {
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
            <ListItem disabled primaryText={<DeviceSettings id={this.props.id} history={this.props.history} />} />
            <Divider />
            <ListItem disabled primaryText={<FlyoverSetting id={this.props.id} />} />
            <Divider />
            <ListItem disabled primaryText={<SensitivitySetting id={this.props.id} />} />
            <Divider />
            <ListItem disabled primaryText={<TimeDelaySetting id={this.props.id} />} />
            <Divider />
            <ListItem disabled primaryText={<DisconnectTracker id={this.props.id} />} />
          </List>
        </main>
      </div>
    );
  }
}
