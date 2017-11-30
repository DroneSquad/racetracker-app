// @flow
import { connect } from 'react-redux';
// import { createSelector } from 'reselect'

import {
  isAvailable,
  isEnabled,
  startStateNotifications,
  stopStateNotifications
} from '../modules/bluetooth';

import BluetoothManager from '../components/BluetoothManager';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the BluetoothManager  */

const mapStateToProps = state => ({
  btError: state.bluetooth.error,
  isBtAvailable: state.bluetooth.isAvailable,
  isBtEnabled: state.bluetooth.isEnabled,
  isBtNotifying: state.bluetooth.isNotifying,

  // isBtRequired: TODO: selector checking the below
  // isRaceActive: state.race.isActive,
  // isHeatActive: activeHeat: state.race.heats ? state.race.heats.filter(t => t.id === state.race.activeHeat)[0] : null,
  // isTrackersConnected
});

const mapDispatchToProps = (dispatch: Function) => ({
  checkIsBtAvailable: () => dispatch(isAvailable()),
  checkIsBtEnabled: () => dispatch(isEnabled()),
  startBtStateNotifications: () => dispatch(startStateNotifications()),
  stopBtStateNotifications: () => dispatch(stopStateNotifications())
});

/* Memoized selectors with 'Reselect'
export const isHeatActive = createSelector(
  // TODO: check
) */

const BluetoothManagerContainer = connect(mapStateToProps, mapDispatchToProps)(BluetoothManager);

export default BluetoothManagerContainer;
