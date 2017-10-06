// @flow
import { connect } from 'react-redux';

import Racing from '../components/Racing';

import { createRace, createHeat } from '../modules/race';

/*  This is a container component. It does not contain any JSX, or
    import React. This component is **only** responsible for wiring
    in actions and state necessary to render a presentational component */

const mapStateToProps = state => ({
  connectedTrackers: state.trackers.filter(t => t.isConnected),
  isRaceActive: state.race.isActive,
  activeTrackerId: state.race.trackerId,
  racerChannels: (state.race.trackerId) ? state.trackers.filter(t => t.id === state.race.trackerId)[0].racerChannels : [],
  heats: (state.race.heats) ? state.race.heats : [],
  // pendingHeats: (state.race.heats) ? state.race.heats.filter(t => t.isPending) : [],
  // completeHeats: (state.race.heats) ? state.race.heats.filter(t => t.isComplete) : []
});

const mapDispatchToProps = (dispatch: Function) => ({
  createRace: tracker_id => dispatch(createRace(tracker_id)),
  createHeat: heat => dispatch(createHeat(heat))
});

const RacingContainer = connect(mapStateToProps, mapDispatchToProps)(Racing);

export default RacingContainer;
