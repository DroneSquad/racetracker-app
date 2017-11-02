// @flow
import { connect } from 'react-redux';
import Frequencies from '../../../components/settings/frequencies/Frequencies';

import frequencies from './frequencies.json';

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
  profilesMap: state.frequencies.profilesMap,
  isDeviceProfile: state.frequencies.profile && state.frequencies.deviceProfile,
  deviceProfileBandIndex: state.frequencies.deviceProfileBandIndex
});

const mapDispatchToProps = dispatch => ({
  // Only save when device id > 0
  onSave: (deviceId, channels) => deviceId > 0 && dispatch(saveFrequencies(deviceId, channels)),
  // Only read frequences when device id > 0 or use first profile
  readFrequencies: deviceId => deviceId > 0 ? dispatch(readFrequencies(deviceId)) : dispatch(updateProfile(frequencies.profiles[0])),
  updateProfile: profile => dispatch(updateProfile(profile))
});

const FrequenciesContainer = connect(mapStateToProps, mapDispatchToProps)(Frequencies);

export default FrequenciesContainer;
