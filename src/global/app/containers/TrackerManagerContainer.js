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

import { getActiveHeat } from '../modules/race';

import TrackerManager from '../components/TrackerManager';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the TrackerManager  */

const mapStateToProps = state => ({
  reconnectingTrackers: getReconnectingTrackers(state),
  connectingTrackers: getConnectingTrackers(state),
  connectedTrackers: getConnectedTrackers(state),
  activeHeat: getActiveHeat(state),
  isBtEnabled: state.bluetooth.isEnabled
});

const mapDispatchToProps = (dispatch: Function) => ({
  connect: object => dispatch(connectTracker(object)),
  setConnecting: deviceId => dispatch(setConnecting(deviceId)),
  setDisconnected: deviceId => dispatch(setDisconnected(deviceId)),
  validateTrackers: array => dispatch(validateTrackers(array))
});

const TrackerManagerContainer = connect(mapStateToProps, mapDispatchToProps)(TrackerManager);

export default TrackerManagerContainer;
