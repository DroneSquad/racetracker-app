// @flow
import { connect } from 'react-redux';
import { enable } from '../../../global/app/modules/bluetooth';
import BluetoothCard from '../components/BluetoothCard';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, a BluetoothCard   */

const mapDispatchToProps = (dispatch: Function) => ({
  enableBt: () => dispatch(enable())
});

const BluetoothCardContainer = connect(null, mapDispatchToProps)(BluetoothCard);

export default BluetoothCardContainer;
