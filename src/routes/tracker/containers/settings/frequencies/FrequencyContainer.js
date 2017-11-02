// @flow
import { connect } from 'react-redux';
import Frequency from '../../../components/settings/frequencies/Frequency';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, a Frequency */

const mapStateToProps = (state, props) => ({
  id: props.match.params.id || props.location.state, // passed in via react-router-redux push command,
  defaultBand: (props.location.state && props.location.state.band) || 'A',
  defaultChannel: (props.location.state && props.location.state.number) || 1,
  videoProfile: state.frequencies.profile,
  profiles: state.frequencies.profiles,
});

const FrequencyContainer = connect(mapStateToProps)(Frequency);

export default FrequencyContainer;
