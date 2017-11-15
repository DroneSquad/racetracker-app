// @flow
import _ from 'lodash';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import FrequencySetting from '../../components/settings/FrequencySetting';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, a FrequencySetting */

const mapStateToProps = (state, ownProps) => ({
  channelCount: _.size(_.pull(state.trackers.filter(t => t.id === ownProps.id)[0].racerChannels, null))
});

const mapDispatchToProps = (dispatch: Function) => ({
  goToFrequencies: deviceId => dispatch(push(`/tracker/${deviceId}/settings/frequencies`, deviceId))
});

const FrequencySettingContainer = connect(mapStateToProps, mapDispatchToProps)(FrequencySetting);

export default FrequencySettingContainer;
