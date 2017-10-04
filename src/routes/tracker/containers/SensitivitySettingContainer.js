// @flow
import { connect } from 'react-redux';
import SensitivitySetting from '../components/settings/SensitivitySetting';

import { calibrateGate } from '../modules/racetracker';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, a SensitivitySetting */

const mapStateToProps = (state, ownProps) => ({
  gateADC: state.trackers.filter(t => t.id === ownProps.id)[0].gateADC
});

const mapDispatchToProps = (dispatch: Function) => ({
  calibrate: device_id => dispatch(calibrateGate(device_id))
});

const SensitivitySettingContainer = connect(mapStateToProps, mapDispatchToProps)(SensitivitySetting);

export default SensitivitySettingContainer;
