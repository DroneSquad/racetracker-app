// @flow
import { connect } from 'react-redux';

import Racing from '../components/Racing';

import { createRace } from '../modules/race';

/*  This is a container component. It does not contain any JSX, or
    import React. This component is **only** responsible for wiring
    in actions and state necessary to render a presentational component */

const mapStateToProps = (state, ownProps) => ({
  connectedTrackers : state.trackers.filter(t => t.isConnected),
  isRaceActive: state.race.isActive,
  // activeTracker: state.race.tracker,
  // racerChannels: (state.race.tracker) ? state.trackers.filter(t => t.id === state.race.tracker.id)[0].racerChannels : [],
  // pendingHeats: state.race.heats.filter(t => t.isPending),
  // completeHeats: state.race.heats.filter(t => t.isComplete)
});

const mapDispatchToProps = (dispatch: Function) => ({
  createRace: tracker => dispatch(createRace(tracker))
});

const RacingContainer = connect(mapStateToProps, mapDispatchToProps)(Racing);

export default RacingContainer;
