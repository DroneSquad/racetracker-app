import React from 'react';
import { List, ListItem, FontIcon, Divider } from 'material-ui';

import Setting from './Setting';
// import FrequencySetting from './FrequencySetting';
import { /*toPercent,*/ batteryLevelIcon } from '../../../utils';

export default class DeviceSettings extends Setting {
  props: {
    id: string,
    name: string,
    batteryLevel: string,
  };

  constructor(props) {
    super(props);
    // go and fetch all the RaceTracker settings
    this.props.getBatteryLevel(this.props.id);
    this.props.getRssiLevel(this.props.id);
    this.props.getName(this.props.id);
    // determine if loading state is complete
    this.isLoading();
  }

  isLoading() {
    if (this.props.name && this.props.batteryLevel && this.props.rssiLevel) {
      this.doneLoading();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.loading) {
      if (nextProps.batteryLevel !== this.props.batteryLevel) {
        if (this.props.batteryLevel) {
          this.isLoading();
        }
      }
      if (nextProps.rssiLevel !== this.props.rssiLevel) {
        if (this.props.rssiLevel) {
          this.isLoading();
        }
      }
      if (nextProps.name !== this.props.name) {
        if (this.props.name) {
          this.isLoading();
        }
      }
    }
  }

  render() {
    console.log("render called");
      let batteryLevel = (
      <span className="bar-item">
        {(this.props.batteryLevel)}
      </span>
    );
    let bluetoothLevel = (
      <span className="bar-item">
        {(this.props.bluetoothLevel)}
      </span>
    );
    return (
      <div className={this.isLoadingClass()}>
        <h2 className="ds-blue-text bar-item">
          {this.props.name || 'Undefined'}
        </h2>
        <h6 className="no-margin bar-item">
          Firmware 1.56
        </h6>
        <List>
          <ListItem
            disabled
            primaryText="Battery Level"
            leftIcon={<FontIcon className={batteryLevelIcon(this.state.batteryLevel)} />}
            rightIcon={batteryLevel}
          />
          <Divider />
          <ListItem
            disabled
            primaryText="Bluetooth RSSI"
            leftIcon={<FontIcon className="mdi mdi-bluetooth" />}
            rightIcon={bluetoothLevel}
          />
          <Divider />
        </List>
      </div>
    );
  }
}

/*
<div className={this.isLoadingClass()}>
  <h2 className="ds-blue-text bar-item">
    {this.state.name || 'Undefined'}
  </h2>
  <h6 className="no-margin bar-item">
    Firmware {this.state.firmware || '0.0'}
  </h6>
  <List>
    <ListItem
      disabled
      primaryText="Battery Level"
      leftIcon={<FontIcon className={batteryLevelIcon(this.state.batteryLevel)} />}
      rightIcon={batteryLevel}
    />
    <Divider />
    <ListItem
      disabled
      primaryText="Bluetooth Single Strength"
      leftIcon={<FontIcon className="mdi mdi-bluetooth" />}
      rightIcon={bluetoothLevel}
    />
    <Divider />
    <FrequencySetting history={this.props.history} />
  </List>
</div>
*/
