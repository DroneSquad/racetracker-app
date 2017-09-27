// @flow
import { connect } from 'react-redux';
import DeviceSettings from '../components/DeviceSettings';

import { getTrackerBatteryLevel, getTrackerName, getTrackerRssi } from '../modules/racetracker';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, a BluetoothCard   */

const mapStateToProps = (state, ownProps) => ({
  batteryLevel: state.trackers.filter(t => t.id === ownProps.id)[0].battery,
  rssiLevel: state.trackers.filter(t => t.id === ownProps.id)[0].rssi,
  name: state.trackers.filter(t => t.id === ownProps.id)[0].name,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getBatteryLevel: device_id => dispatch(getTrackerBatteryLevel(device_id)),
  getName: device_id => dispatch(getTrackerName(device_id)),
  getRssiLevel: device_id => dispatch(getTrackerRssi(device_id)),
});

const DeviceSettingsContainer = connect(mapStateToProps, mapDispatchToProps)(DeviceSettings);

export default DeviceSettingsContainer;
