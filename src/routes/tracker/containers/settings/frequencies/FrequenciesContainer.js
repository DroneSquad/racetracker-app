// @flow
import { connect } from 'react-redux';
import Frequencies from '../../../components/settings/frequencies/Frequencies';

import { saveFrequencies, updateProfile, readFrequencies } from '../../../modules/frequencies';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, a Frequencies */

const mapStateToProps = (state, props) => ({
  id: props.match.params.id || props.location.state, // passed in via react-router-redux push command,
  saving: state.frequencies.saving,
  videoProfile: state.frequencies.profile,
  frequencies: state.frequencies.frequencies,
  profiles: state.frequencies.profiles,
  profilesMap: state.frequencies.profilesMap
});

const mapDispatchToProps = dispatch => ({
  onSave: (deviceId, channels) => dispatch(saveFrequencies(deviceId, channels)),
  readFrequencies: deviceId => dispatch(readFrequencies(deviceId)),
  updateProfile: profile => dispatch(updateProfile(profile))
});

const FrequenciesContainer = connect(mapStateToProps, mapDispatchToProps)(Frequencies);

export default FrequenciesContainer;
