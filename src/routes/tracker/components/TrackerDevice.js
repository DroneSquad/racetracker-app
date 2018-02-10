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
    connect: Function,
    setConnecting: Function,
    goToSettings: Function
  };

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

  /** Connect to the tracker */
  connectTracker = () => {
    if (!this.props.isConnected) {
      this.props.setConnecting(this.props.id);
      this.props.connect({ deviceId: this.props.id, getChannels: true });
    }
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
