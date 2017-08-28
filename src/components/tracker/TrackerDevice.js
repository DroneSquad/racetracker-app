// @flow

import React from 'react';
import { connect } from 'react-redux';
import { FontIcon } from 'material-ui';
import { rssiToPercentage } from '../../utils';
import { ListItem } from 'material-ui';

export const Device = (props: { name: string, rssi: string }) => {
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

const TrackerDevice = (props: { name: string, rssi: string, connected: boolean, id: string }) => {
  let deviceLogo = <FontIcon className="ds-blue-text pull-icon-down mdi mdi-timer" />;
  let deviceComponent = <Device name={props.name} rssi={props.rssi} />;
  if (props.connected) {
    return (
      <ListItem
        key={props.id}
        primaryText={deviceComponent}
        leftIcon={deviceLogo}
        rightIcon={<FontIcon className="pull-icon-down mdi mdi-settings" />}
        // onClick={() => this.openSettings(device)}
      />
    );
  } else {
    return (
      <ListItem
        key={props.id}
        primaryText={deviceComponent}
        leftIcon={deviceLogo}
        // onClick={() => this.connect(device)}
      />
    );
  }
};

const mapStateToProps = state => ({
  connected: state.connected
});

//const mapDispatchToProps = (dispatch: Function, ownProps) => ({});

export default connect(mapStateToProps)(TrackerDevice);
