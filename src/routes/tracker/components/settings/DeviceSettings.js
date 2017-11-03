import React from 'react';

import { List, ListItem, FontIcon, Divider } from 'material-ui';

import FrequencySetting from '../../containers/settings/FrequencySettingContainer';
import { rssiToPercentage, batteryLevelIcon } from '../../../../utils';

import Setting from './Setting';

export default class DeviceSettings extends Setting {
  props: {
    id: string,
    name: string,
    battery: string,
    rssi: string,
    firmware: string,
    getBattery: Function,
    getRssi: Function,
    getFirmware: Function
  };

  constructor(props) {
    super(props);
    // query racetracker for properties
    this.props.getBattery(this.props.id);
    this.props.getRssi(this.props.id);
    this.props.getFirmware(this.props.id);
    // validate loading state of properties
    this.checkLoading();
  }

  checkLoading() {
    if (this.props.battery) {
      if (this.props.rssi) {
        if (this.props.firmware) {
          if (this.state.loading) {
            this.doneLoading();
          }
        }
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.battery !== prevProps.battery) {
      this.checkLoading();
    }
    if (this.props.rssi !== prevProps.rssi) {
      this.checkLoading();
    }
    if (this.props.firmware !== prevProps.firmware) {
      this.checkLoading();
    }
  }

  render() {
    let batteryLevel = (
      <span className="bar-item">
        {this.props.battery + '%'}
      </span>
    );
    let rssiLevel = (
      <span className="bar-item">
        {rssiToPercentage(this.props.rssi)}
      </span>
    );
    return (
      <div className={this.isLoadingClass()} style={{ padding: '0 16px' }}>
        <h2 className="ds-blue-text">
          {this.props.name}
        </h2>
        <h6 className="no-margin bar-item">
          Firmware {this.props.firmware}
        </h6>
        <List>
          <ListItem
            disabled
            primaryText="Battery level"
            leftIcon={<FontIcon className={batteryLevelIcon(this.props.battery)} />}
            rightIcon={batteryLevel}
          />
          <Divider />
          <ListItem
            disabled
            primaryText="Bluetooth RSSI"
            leftIcon={<FontIcon className="mdi mdi-bluetooth" />}
            rightIcon={rssiLevel}
          />
          <Divider />
          <FrequencySetting id={this.props.id} history={this.props.history} />
        </List>
      </div>
    );
  }
}
