// @flow
import { connect } from 'react-redux';
import DeviceSettings from '../components/DeviceSettings';

import { getTrackerBatteryLevel, getTrackerRssi, getTrackerFirmwareVersion } from '../modules/racetracker';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, a DeviceSettings */

const mapStateToProps = (state, ownProps) => ({
  battery: state.trackers.filter(t => t.id === ownProps.id)[0].battery,
  rssi: state.trackers.filter(t => t.id === ownProps.id)[0].rssi,
  name: state.trackers.filter(t => t.id === ownProps.id)[0].name,
  firmware: state.trackers.filter(t => t.id === ownProps.id)[0].firmware
});

const mapDispatchToProps = (dispatch: Function) => ({
  getBattery: device_id => dispatch(getTrackerBatteryLevel(device_id)),
  getRssi: device_id => dispatch(getTrackerRssi(device_id)),
  getFirmware: device_id => dispatch(getTrackerFirmwareVersion(device_id))
});

const DeviceSettingsContainer = connect(mapStateToProps, mapDispatchToProps)(DeviceSettings);

export default DeviceSettingsContainer;
