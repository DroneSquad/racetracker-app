import React, { Component } from 'react';
import { FontIcon } from 'material-ui';
import { rssiToPercentage } from '../../../utils';
import { ListItem, Snackbar } from 'material-ui';

class TrackerDevice extends Component {
  props: {
    id: string,
    name: string,
    rssi: string,
    isConnecting: boolean,
    isConnected: boolean,
    connectSuccess: Function,
    connectFailure: Function
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
    )
  }

  /** Connect to the tracker */
  connect = () => {
    console.log("connect called")
  /*  if ('ble' in window) {
      window.ble.connect(this.props.id, this.props.connectSuccess, this.props.connectFailure);
    } else {
      this.props.connectSuccess();
    }*/
  };

  /** Open the settings for the tracker */
  openSettings = () => {
    // this.props.history.push('/tracker/settings', this.props.id);
  };

  render() {
    let deviceLogo = <FontIcon className="ds-blue-text pull-icon-down mdi mdi-timer" />;
    let deviceComponent = <this.DeviceProperties name={this.props.name} rssi={this.props.rssi} />;
    let extraProps = { key: this.props.id, primaryText: deviceComponent, leftIcon: deviceLogo };
    let icon = <FontIcon className="pull-icon-down mdi mdi-settings" />;
    if (this.props.isConnected) {
      return <ListItem {...extraProps} rightIcon={icon} onClick={this.openSettings} />;
    }
    return (
      <div>
        <Snackbar open={this.props.isConnecting} message="Connecting..." />
        <ListItem {...extraProps} onClick={this.connect} />
      </div>
    );
  }
}

/*const mapStateToProps = (state, ownProps) => ({
  isConnecting: state.trackers.filter(t => t.id === ownProps.id)[0].isConnecting,
  isConnected: state.trackers.filter(t => t.id === ownProps.id)[0].isConnected
});*/

/*const mapDispatchToProps = (dispatch: Function, ownProps) => ({
  connectSuccess() {
    console.log('connection success: ' & ownProps.id);
    dispatch(connectTracker(ownProps.id));
  },
  connectFailure(device) {
    console.log('connection failed disconnected: ' & device.id);
    dispatch(disconnectTracker(device.id));
  }
});*/

// export default connect(mapStateToProps, mapDispatchToProps)(TrackerDevice);

export default TrackerDevice;
