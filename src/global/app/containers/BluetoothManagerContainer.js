// @flow
import { connect } from 'react-redux';

import { isAvailable, isEnabled, startStateNotifications, stopStateNotifications } from '../modules/bluetooth';

import BluetoothManager from '../components/BluetoothManager';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the BluetoothManager  */

const mapStateToProps = state => ({
  btError: state.bluetooth.error,
  isBtAvailable: state.bluetooth.isAvailable,
  isBtNotifying: state.bluetooth.isNotifying
});

const mapDispatchToProps = (dispatch: Function) => ({
  checkIsBtAvailable: () => dispatch(isAvailable()),
  checkIsBtEnabled: () => dispatch(isEnabled()),
  startBtStateNotifications: () => dispatch(startStateNotifications()),
  stopBtStateNotifications: () => dispatch(stopStateNotifications())
});

const BluetoothManagerContainer = connect(mapStateToProps, mapDispatchToProps)(BluetoothManager);

export default BluetoothManagerContainer;
