// @flow
import { connect } from 'react-redux';
import Frequencies from '../components/settings/frequencies/Frequencies';

import { readRacerChannels } from '../modules/racetracker';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, a Frequencies */

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.location.state, // passed in via react-router-redux push command
  channelCount: state.trackers.filter(t => t.id === ownProps.location.state)[0].channelCount,
  racerChannels: state.trackers.filter(t => t.id === ownProps.location.state)[0].racerChannels
});

const mapDispatchToProps = (dispatch: Function) => ({
  getRacerChannels: object => dispatch(readRacerChannels(object)),
});

const FrequenciesContainer = connect(mapStateToProps, mapDispatchToProps)(Frequencies);

export default FrequenciesContainer;
