import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontIcon } from 'material-ui';
import { rssiToPercentage } from '../../utils';
import { ListItem } from 'material-ui';

import { connectTracker } from '../../reducers/tracker';

export const DeviceProperties = (props: { name: string, rssi: string }) => {
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

class TrackerDevice extends Component {
  props: {
    name: string,
    rssi: string,
    connected: boolean,
    id: string
  };

  connect(id) {
    console.log('connect racetracker');
    window.ble.connect(id, this.props.connectSuccess, this.props.connectFailure);
  }

  openSettings(id) {
    console.log('open racetracker settings');
    console.log(id);
  }

  render() {
    let deviceLogo = <FontIcon className="ds-blue-text pull-icon-down mdi mdi-timer" />;
    let deviceComponent = <DeviceProperties name={this.props.name} rssi={this.props.rssi} />;
    if (this.props.connected) {
      return (
        <ListItem
          key={this.props.id}
          primaryText={deviceComponent}
          leftIcon={deviceLogo}
          rightIcon={<FontIcon className="pull-icon-down mdi mdi-settings" />}
          onClick={() => this.openSettings(this.props.id)}
        />
      );
    } else {
      return (
        <ListItem
          key={this.props.id}
          primaryText={deviceComponent}
          leftIcon={deviceLogo}
          onClick={() => this.connect(this.props.id)}
        />
      );
    }
  }
}

const mapStateToProps = state => ({
  connected: state.connected
});

const mapDispatchToProps = (dispatch: Function, ownProps) => ({
  connectSuccess() {
    dispatch(connectTracker(ownProps.id));
  },
  connectFailure(device) {
    console.log('connectFailure');
    console.log(device);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackerDevice);
