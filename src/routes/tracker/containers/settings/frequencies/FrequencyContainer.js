// @flow
import _ from 'lodash';

import { connect } from 'react-redux';
import Frequency from '../../../components/settings/frequencies/Frequency';

import { historyBackButton } from '../../../../../utils';

const mapStateToProps = (state, props) => ({
  id: props.match.params.id, // passed in via react-router-redux push command,
  copyBands: (props.location.state && props.location.state.copyBands) || [],
  bandIndex: (props.location.state && props.location.state.bandIndex) || 0,
  defaultBand: (props.location.state && props.location.state.band) || 'A',
  defaultChannel: (props.location.state && props.location.state.number) || 1,
  videoProfile: state.frequencies.profile,
  profiles: state.frequencies.profiles
});

const mapDispatchToProps = dispatch => ({
  rawDispatch: value => dispatch(value),
  onUpdate: function() {
    let letter = _.values(this.state.profiles)[this.state.band][this.state.channel];
    // Only create the custom profle if we changed something
    if (this.props.copyBands[this.props.bandIndex] !== letter) {
      dispatch({
        type: 'FREQ_CUSTOM_PROFILE',
        payload: { lastBands: this.props.copyBands, newBand: letter, position: this.props.bandIndex }
      });
    }
    dispatch(historyBackButton.bind(this));
  }
});

const FrequencyContainer = connect(mapStateToProps, mapDispatchToProps)(Frequency);

export default FrequencyContainer;
