// @flow
import { connect } from 'react-redux';
import { isAvailable, isEnabled, enable, startStateNotifications, stopStateNotifications, startDeviceScan, stopDeviceScan } from '../modules/bluetooth';
import { clearUnpairedTrackers } from '../modules/racetracker';
import TrackerHome from '../components/TrackerHome';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the TrackerHome:   */

const mapStateToProps = (state) => ({
  message: state.bluetooth.message,
  isBtAvailable: state.bluetooth.isAvailable,
  isBtEnabled: state.bluetooth.isEnabled,
  isBtScanning: state.bluetooth.isScanning
});

const mapDispatchToProps = (dispatch: Function) => ({
  checkIsBtAvailable() {
    dispatch(isAvailable());
  },
  checkIsBtEnabled() {
    dispatch(isEnabled());
  },
  enableBt() {
    dispatch(enable());
  },
  startBtStateNotifications() {
    dispatch(startStateNotifications());
  },
  stopBtStateNotifications() {
    dispatch(stopStateNotifications());
  },
  clearUnpairedRaceTrackers() {
    dispatch(clearUnpairedTrackers());
  },
  startBtDeviceScan() {
    dispatch(startDeviceScan());
  },
  stopBtDeviceScan() {
    dispatch(stopDeviceScan());
  }
});

const TrackerHomeContainer = connect(mapStateToProps, mapDispatchToProps)(TrackerHome);

export default TrackerHomeContainer;
