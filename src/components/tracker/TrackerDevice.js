import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontIcon } from 'material-ui';
import { rssiToPercentage } from '../../utils';
import { ListItem } from 'material-ui';

import { connectTracker, disconnectTracker } from '../../reducers/tracker';

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
    id: string,
    name: string,
    rssi: string,
    isConnected: boolean,
    connectSuccess: Function,
    connectFailure: Function
  };

  connect(id) {
    window.ble.connect(id, this.props.connectSuccess, this.props.connectFailure);
  }

  openSettings(id) {
    console.log('openSettings');
    // TODO: handle navigaion
    // this.props.history.push('/tracker/settings', id);
  }

  render() {
    let deviceLogo = <FontIcon className="ds-blue-text pull-icon-down mdi mdi-timer" />;
    let deviceComponent = <DeviceProperties name={this.props.name} rssi={this.props.rssi} />;
    if (this.props.isConnected) {
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

const mapStateToProps = (state, ownProps) => ({
  isConnected: state.trackers.filter(t => t.id === ownProps.id)[0].isConnected
});

const mapDispatchToProps = (dispatch: Function, ownProps) => ({
  connectSuccess() {
    console.log('connection success: ' & ownProps.id);
    dispatch(connectTracker(ownProps.id));
  },
  connectFailure(device) {
    console.log('connection failed disconnected: ' & device.id);
    dispatch(disconnectTracker(device.id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackerDevice);
