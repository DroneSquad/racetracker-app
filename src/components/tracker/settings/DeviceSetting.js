import React from 'react';

import {
  List,
  ListItem,
  FontIcon,
  Divider,
} from 'material-ui';

import Setting from './Setting';
import FrequencySetting from './FrequencySetting';

import { toPercent, batteryLevelIcon } from '../../../utils';

export default class DeviceSettings extends Setting {
  constructor(props) {
    super(props);
    setTimeout(() => {
      this.doneLoading();
      this.setState({
        name: this.props.bluetooth.name,
        firmware: '1.56',
        batteryLevel: this.props.bluetooth.battery,
        bluetoothLevel: this.props.bluetooth.single,
      });
    }, Math.random() * 1000 + 500); // todo trigger after we fetch the settings from the device
  }

  render() {
    let batteryLevel = <span className="bar-item" >{toPercent(this.state.batteryLevel)}</span>;
    let bluetoothLevel = <span className="bar-item" >{toPercent(this.state.bluetoothLevel)}</span>;
    return (
      <div className={this.isLoadingClass()}>
        <h2 className="ds-blue-text bar-item">{this.state.name}</h2>
        <h6 className="no-margin bar-item">Firmware {this.state.firmware}</h6>
        <List>
          <ListItem disabled primaryText="Battery Level" leftIcon={<FontIcon className={batteryLevelIcon(this.state.batteryLevel)}/>} rightIcon={batteryLevel}/>
          <Divider />
          <ListItem disabled primaryText="Bluetooth Single Strength" leftIcon={<FontIcon className="mdi mdi-bluetooth"/>} rightIcon={bluetoothLevel}/>
          <Divider />
          <FrequencySetting history={this.props.history}/>
        </List>
      </div>
    );
  }
}


