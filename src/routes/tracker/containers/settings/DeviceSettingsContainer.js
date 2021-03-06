// @flow
import { connect } from 'react-redux';
import DeviceSettings from '../../components/settings/DeviceSettings';

import { readBatteryLevel, readRssiLevel, readFirmwareVersion } from '../../../../global/app/modules/racetracker';

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
  getBattery: deviceId => dispatch(readBatteryLevel(deviceId)),
  getRssi: deviceId => dispatch(readRssiLevel(deviceId)),
  getFirmware: deviceId => dispatch(readFirmwareVersion(deviceId))
});

const DeviceSettingsContainer = connect(mapStateToProps, mapDispatchToProps)(DeviceSettings);

export default DeviceSettingsContainer;
