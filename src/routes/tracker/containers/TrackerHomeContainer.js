// @flow
import { connect } from 'react-redux';

import {
  isAvailable,
  isEnabled,
  enable,
  startStateNotifications
  // stopStateNotifications, TODO: implement this on application close?
} from '../../../global/bluetooth/modules/bluetooth';

import { stopTrackerScan, validateTrackers, discoverTrackers } from '../../../global/racetracker/modules/racetracker';

import TrackerHome from '../components/TrackerHome';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the TrackerHome:   */

const mapStateToProps = state => ({
  btError: state.bluetooth.error,
  isBtAvailable: state.bluetooth.isAvailable,
  isBtEnabled: state.bluetooth.isEnabled,
  isBtScanning: state.bluetooth.isScanning,
  trackers: state.trackers
});

const mapDispatchToProps = (dispatch: Function) => ({
  checkIsBtAvailable: () => dispatch(isAvailable()),
  checkIsBtEnabled: () => dispatch(isEnabled()),
  enableBt: () => dispatch(enable()),
  startBtStateNotifications: () => dispatch(startStateNotifications()),
  // stopBtStateNotifications: () => dispatch(stopStateNotifications()), // TODO:
  startTrackerScan: array => dispatch(discoverTrackers(array)),
  stopTrackerScan: array => dispatch(stopTrackerScan(array)),
  validateTrackers: array => dispatch(validateTrackers(array))
});

const TrackerHomeContainer = connect(mapStateToProps, mapDispatchToProps)(TrackerHome);

export default TrackerHomeContainer;
