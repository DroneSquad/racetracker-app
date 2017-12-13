// @flow
import { connect } from 'react-redux';

import { enable } from '../../../global/app/modules/bluetooth';

import { stopTrackerScan, validateTrackers, discoverTrackers, getAvailableTrackers, getConnectedTrackers } from '../../../global/app/modules/racetracker';

import TrackerHome from '../components/TrackerHome';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the TrackerHome:   */

const mapStateToProps = state => ({
  isBtAvailable: state.bluetooth.isAvailable,
  isBtEnabled: state.bluetooth.isEnabled,
  isBtScanning: state.bluetooth.isScanning,
  trackers: state.trackers,
  availableTrackers: getAvailableTrackers(state),
  connectedTrackers: getConnectedTrackers(state)
});

const mapDispatchToProps = (dispatch: Function) => ({
  enableBt: () => dispatch(enable()),
  startTrackerScan: array => dispatch(discoverTrackers(array)),
  stopTrackerScan: array => dispatch(stopTrackerScan(array)),
  validateTrackers: array => dispatch(validateTrackers(array))
});

const TrackerHomeContainer = connect(mapStateToProps, mapDispatchToProps)(TrackerHome);

export default TrackerHomeContainer;
