import React, { Component } from 'react';

import { List, ListItem, FontIcon, Divider } from 'material-ui';

import FrequencySetting from './settings/FrequencySetting';
import { rssiToPercentage, batteryLevelIcon } from '../../../utils';

export default class DeviceSettings extends Component {
  props: {
    id: string,
    name: string,
    battery: string,
    rssi: string,
    getBattery: Function,
    getRssi: Function,
  };

  constructor(props) {
    super(props);
    // query racetracker for updates to displayed properties
    this.props.getBattery(this.props.id);
    this.props.getRssi(this.props.id);
  }

  render() {
    let batteryLevel = (
      <span className="bar-item">
        {(this.props.battery)+"%"}
      </span>
    );
    let rssiLevel = (
      <span className="bar-item">
        {rssiToPercentage(this.props.rssi)}
      </span>
    );
    return (
      <div>
        <h2 className="ds-blue-text bar-item">
          {this.props.name}
        </h2>
        <h6 className="no-margin bar-item">
          Firmware 1.56
        </h6>
        <List>
          <ListItem
            disabled
            primaryText="Battery Level"
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
          <FrequencySetting history={this.props.history} />
        </List>
      </div>
    );
  }
}
