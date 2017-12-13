// @flow
import { connect } from 'react-redux';

import { enable } from '../modules/bluetooth';

import BluetoothCard from '../components/BluetoothCard';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, a BluetoothCard  */

const mapStateToProps = state => ({
  isBtEnabled: state.bluetooth.isEnabled,
  isBtAvailable: state.bluetooth.isAvailable
});

const mapDispatchToProps = (dispatch: Function) => ({
  enableBt: () => dispatch(enable())
});

const BluetoothCardContainer = connect(mapStateToProps, mapDispatchToProps)(BluetoothCard);

export default BluetoothCardContainer;
