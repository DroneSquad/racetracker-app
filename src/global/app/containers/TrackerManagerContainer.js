// @flow
import { connect } from 'react-redux';

import {
  connectTracker,
  setConnecting,
  setDisconnected,
  validateTrackers,
  getConnectedTrackers,
  getConnectingTrackers,
  getReconnectingTrackers
} from '../modules/racetracker';

import TrackerManager from '../components/TrackerManager';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the TrackerManager  */

const mapStateToProps = state => ({
  reconnectingTrackers: getReconnectingTrackers(state), // state.trackers.filter(t => t.isReconnecting),
  connectingTrackers: getConnectingTrackers(state), // state.trackers.filter(t => t.isConnecting),
  connectedTrackers: getConnectedTrackers(state), // state.trackers.filter(t => t.isConnected),
  isBtAvailable: state.bluetooth.isAvailable,
  isBtEnabled: state.bluetooth.isEnabled,
  isBtScanning: state.bluetooth.isScanning,
});

const mapDispatchToProps = (dispatch: Function) => ({
  connect: deviceId => dispatch(connectTracker(deviceId)),
  setConnecting: deviceId => dispatch(setConnecting(deviceId)),
  setDisconnected: deviceId => dispatch(setDisconnected(deviceId)),
  validateTrackers: array => dispatch(validateTrackers(array))
});

/* Memoized selectors with 'Reselect'
export const isHeatActive = createSelector(
  // TODO: finish the selectors started in the racetracker module
) */

const TrackerManagerContainer = connect(mapStateToProps, mapDispatchToProps)(TrackerManager);

export default TrackerManagerContainer;
