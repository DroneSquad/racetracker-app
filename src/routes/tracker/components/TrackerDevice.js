// flow
import React, { Component } from 'react';

import { FontIcon } from 'material-ui';
import { ListItem } from 'material-ui';

import { rssiToPercentage } from '../../../utils';

export default class TrackerDevice extends Component {
  props: {
    id: string,
    name: string,
    rssi: string,
    isConnected: boolean,
    isBtScanning: boolean,
    connect: Function,
    goToSettings: Function,
    validateTracker: Function
  };

  componentDidMount() {
    if (!this.props.isBtScanning) {
      this.validateDevice();
    }
  }

  deviceProperties = (props: { name: string, rssi: string }) => {
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

  /** Validate that the device exists on the internal bluetooth scan list */
  validateDevice = () => {
    console.log("FIRE-VALIDATE-TRACKER");
    this.props.validateTracker({ device_id: this.props.id, connected: this.props.isConnected });
  }

  /** Connect to the tracker */
  // TODO: some sort of check, no need to connect if already connected
  // TODO: also need to handle on restarts when no scan exists (rehydration?)
  connectTracker = () => {
    console.log("connectTracker");
    console.log(this.props.isConnected);
    this.props.connect(this.props.id);
  };

  /** Go to the Tracker Settings page */
  trackerSettings = () => {
    this.props.goToSettings(this.props.id);
  };

  render() {
    let { id, name, rssi, isConnected } = this.props;
    let deviceLogo = <FontIcon className="ds-blue-text pull-icon-down mdi mdi-timer" />;
    let deviceComponent = <this.deviceProperties name={name} rssi={rssi} />;
    let extraProps = { key: id, primaryText: deviceComponent, leftIcon: deviceLogo };
    let icon = <FontIcon className="pull-icon-down mdi mdi-settings" />;
    if (isConnected) {
      return (
        <div>
          <ListItem {...extraProps} rightIcon={icon} onClick={this.trackerSettings} />
        </div>
      );
    }
    return (
      <div>
        <ListItem {...extraProps} onClick={this.connectTracker} />
      </div>
    );
  }
}
