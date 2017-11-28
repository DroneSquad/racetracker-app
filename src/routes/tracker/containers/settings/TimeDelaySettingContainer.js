import { connect } from 'react-redux';
import TimeDelaySetting from '../../components/settings/TimeDelaySetting';

import { writeMinLapTime, readMinLapTime } from '../../../global/racetracker/modules/racetracker';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, a TimeDelaySetting */

const mapStateToProps = (state, ownProps) => ({
  minLapTime: state.trackers.filter(t => t.id === ownProps.id)[0].minLapTime
});

const mapDispatchToProps = (dispatch: Function) => ({
  getMinLapTime: deviceId => dispatch(readMinLapTime(deviceId)),
  setMinLapTime: object => dispatch(writeMinLapTime(object))
});

const TimeDelaySettingContainer = connect(mapStateToProps, mapDispatchToProps)(TimeDelaySetting);

export default TimeDelaySettingContainer;
