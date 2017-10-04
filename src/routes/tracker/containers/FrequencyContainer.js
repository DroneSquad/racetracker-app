// @flow
import { connect } from 'react-redux';
import Frequency from '../components/settings/frequencies/Frequency';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, a Frequency */

const mapStateToProps = (state, ownProps) => ({
  channelCount: state.trackers.filter(t => t.id === ownProps.id)[0].racerChannels.length
});

const FrequencyContainer = connect(mapStateToProps)(Frequency);

export default FrequencyContainer;
