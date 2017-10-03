// @flow
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import FrequencySetting from '../components/settings/FrequencySetting';

import { readChannelCount, readRacerChannels } from '../modules/racetracker';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, a FrequencySetting */

const mapStateToProps = (state, ownProps) => ({
  channelCount: state.trackers.filter(t => t.id === ownProps.id)[0].channelCount
});

const mapDispatchToProps = (dispatch: Function) => ({
  getChannelCount: device_id => dispatch(readChannelCount(device_id)),
  getRacerChannels: object => dispatch(readRacerChannels(object)),
  frequencies: device_id => dispatch(push('/tracker/settings/frequencies', device_id))
});

const FrequencySettingContainer = connect(mapStateToProps, mapDispatchToProps)(FrequencySetting);

export default FrequencySettingContainer;
