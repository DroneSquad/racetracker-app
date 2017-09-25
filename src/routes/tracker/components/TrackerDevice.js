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
    connectedMsg: string,
    connectingMsg: string,
    isConnected: boolean,
    connect: Function,
    disconnect: Function,
    // opensettings
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
    this.props.connect(this.props.id);
  };

  /** TODO: swap Open the tracker settings */
  disconnectTracker = () => {
    this.props.disconnect(this.props.id);
  };

  render() {
    let { id, name, rssi, isConnected, connectingMsg, connectedMsg } = this.props;
    let deviceLogo = <FontIcon className="ds-blue-text pull-icon-down mdi mdi-timer" />;
    let deviceComponent = <this.DeviceProperties name={name} rssi={rssi} />;
    let extraProps = { key: id, primaryText: deviceComponent, leftIcon: deviceLogo };
    let icon = <FontIcon className="pull-icon-down mdi mdi-settings" />;
    if (isConnected) {
      return <ListItem {...extraProps} rightIcon={icon} onClick={this.disconnectTracker} />;
    }
    return (
      <div>
        <Snackbar open={connectingMsg} message={connectingMsg} />
        <Snackbar open={connectedMsg} message={connectedMsg} autoHideDuration={4000} />
        <ListItem {...extraProps} onClick={this.connectTracker}/>
      </div>
    );
  }
}
