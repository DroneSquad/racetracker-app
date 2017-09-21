// @flow
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { connectDevice } from '../modules/bluetooth';

import TrackerDevice from '../components/TrackerDevice';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the TrackerDevice:   */

const mapStateToProps = (state, ownProps) => ({
  isConnecting: state.trackers.filter(t => t.id === ownProps.id)[0].isConnecting,
  isConnected: state.trackers.filter(t => t.id === ownProps.id)[0].isConnected
});

const mapDispatchToProps = (dispatch: Function) => ({
  connectBtDevice(device_id) {
    dispatch(connectDevice(device_id))
  },
  openBtDeviceSettings(device_id) {
    dispatch(push('/tracker/settings', device_id));
  }
});

const TrackerDeviceContainer = connect(mapStateToProps, mapDispatchToProps)(TrackerDevice);

export default TrackerDeviceContainer;
