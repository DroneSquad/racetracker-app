import React from 'react';

import {
  AppBar,
  List,
  ListItem,
  Divider,
} from 'material-ui';

import DeviceSetting from './DeviceSetting';
import SensitivitySetting from './SensitivitySetting';
import TimeDelaySetting from './TimeDelaySetting';
import FlyoverSetting from './FlyoverSetting';

import { historyBackButton } from '../../../utils';

import './settings-menu.css';

/** Handles the main logic for the tracker things */
export default class Tracker extends React.Component {

  render() {
    console.log(this.props);
    return (
      <div className="main settings-menu">
        <header>
          <AppBar title="RaceTracker Settings" iconClassNameLeft="mdi mdi-arrow-left" onLeftIconButtonTouchTap={historyBackButton.bind(this)}/>
        </header>
        <main>
          <List>
            <ListItem disabled primaryText={<DeviceSetting history={this.props.history}/>} />
            <Divider />
            <ListItem disabled primaryText={<FlyoverSetting />}/>
            <Divider />
            <ListItem disabled primaryText={<SensitivitySetting />}/>
            <Divider />
            <ListItem disabled primaryText={<TimeDelaySetting />}/>
          </List>
        </main>
      </div>
    );
  }
}
