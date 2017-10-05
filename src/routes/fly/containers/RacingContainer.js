// @flow
import { connect } from 'react-redux';

import Racing from '../components/Racing';

import { raceCreate } from '../modules/race';

/*  This is a container component. It does not contain any JSX, or
    import React. This component is **only** responsible for wiring
    in actions and state necessary to render a presentational component */

const mapStateToProps = (state, ownProps) => ({
  connectedTrackers : state.trackers.filter(t => t.isConnected),
  isRaceActive: state.race.isActive,
  activeTrackerId: state.race.trackerId,
  racerChannels: (state.race.trackerId) ? state.trackers.filter(t => t.id === state.race.trackerId)[0].racerChannels : [],
  pendingHeats: state.race.heats.filter(t => t.isPending),
  completeHeats: state.race.heats.filter(t => t.isComplete)
});

const mapDispatchToProps = (dispatch: Function) => ({
  createRace: trackerId => dispatch(raceCreate(trackerId))
});

const RacingContainer = connect(mapStateToProps, mapDispatchToProps)(Racing);

export default RacingContainer;
