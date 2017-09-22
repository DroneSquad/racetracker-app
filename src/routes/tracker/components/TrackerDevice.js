// flow
import React, { Component } from 'react';

import { FontIcon } from 'material-ui';
import { ListItem, Snackbar } from 'material-ui';

import { rssiToPercentage } from '../../../utils';

export default class TrackerDevice extends Component {
  props: {
    id: string,
    name: string,
    rssi: string,
    isConnecting: boolean,
    isConnected: boolean,
    connectBtDevice: Function,
    openBtDeviceSettings: Function
  };

  DeviceProperties = (props: { name: string, rssi: string }) => {
    return (
      <div className="device">
        <h3>
          {props.name}
        </h3>
        <span className="detail">
          <FontIcon className="mdi mdi-radio-tower" />
          {rssiToPercentage(props.rssi)}
        </span>
      </div>
    );
  };

  /** Connect to the tracker */
  connectTracker = () => {
    this.props.connectBtDevice(this.props.id);
  };

  /** Open the tracker settings */
  openTrackerSettings = () => {
    this.props.openBtDeviceSettings(this.props.id);
  };

  render() {
    let deviceLogo = <FontIcon className="ds-blue-text pull-icon-down mdi mdi-timer" />;
    let deviceComponent = <this.DeviceProperties name={this.props.name} rssi={this.props.rssi} />;
    let extraProps = { key: this.props.id, primaryText: deviceComponent, leftIcon: deviceLogo };
    let icon = <FontIcon className="pull-icon-down mdi mdi-settings" />;
    if (this.props.isConnected) {
      return <ListItem {...extraProps} rightIcon={icon} onClick={this.openTrackerSettings} />;
    }
    return (
      <div>
        <Snackbar open={this.props.isConnecting} message="Connecting..." />
        <ListItem {...extraProps} onClick={this.connectTracker} />
      </div>
    );
  }
}
