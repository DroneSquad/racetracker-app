// @flow
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import FrequencySetting from '../components/settings/FrequencySetting';

import { readFrequencyCount } from '../modules/racetracker';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, a FrequencySetting */

const mapStateToProps = (state, ownProps) => ({
  frequencyCount: state.trackers.filter(t => t.id === ownProps.id)[0].frequencyCount
});

const mapDispatchToProps = (dispatch: Function) => ({
  getFrequencyCount: device_id => dispatch(readFrequencyCount(device_id)),
  frequencies: device_id => dispatch(push('/tracker/settings/frequencies', device_id))
});

const FrequencySettingContainer = connect(mapStateToProps, mapDispatchToProps)(FrequencySetting);

export default FrequencySettingContainer;
