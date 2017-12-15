// @flow
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { connectTracker, setConnecting } from '../../../global/app/modules/racetracker';

import TrackerDevice from '../components/TrackerDevice';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the TrackerDevice:  */

const mapStateToProps = (state, ownProps) => ({
  rssi: state.trackers.filter(t => t.id === ownProps.id)[0].rssi,
  name: state.trackers.filter(t => t.id === ownProps.id)[0].name,
  isConnected: state.trackers.filter(t => t.id === ownProps.id)[0].isConnected
});

const mapDispatchToProps = (dispatch: Function) => ({
  connect: deviceId => dispatch(connectTracker(deviceId)),
  setConnecting: deviceId => dispatch(setConnecting(deviceId)),
  goToSettings: deviceId => dispatch(push(`/tracker/${deviceId}/settings`, deviceId))
});

const TrackerDeviceContainer = connect(mapStateToProps, mapDispatchToProps)(TrackerDevice);

export default TrackerDeviceContainer;
