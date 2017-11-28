// @flow
import { connect } from 'react-redux';

import Racing from '../components/Racing';

import { createRace, setRaceMode } from '../modules/race';

import { validateTrackers } from '../../../global/racetracker/modules/racetracker';

/*  This is a container component. It does not contain any JSX, or
    import React. This component is **only** responsible for wiring
    in actions and state necessary to render a presentational component */

const mapStateToProps = state => ({
  connectedTrackers: state.trackers.filter(t => t.isConnected),
  isRaceActive: state.race.isActive,
  activeHeatId: state.race.activeHeat,
  activeRaceId: state.race.id,
  activeTrackerId: state.race.trackerId,
  activeRaceMode: state.race.raceMode,
  isBtScanning: state.bluetooth.isScanning,
  trackerRaceMode: (state.race.trackerId) ? state.trackers.filter(t => t.id === state.race.trackerId)[0].raceMode : state.race.raceMode,
  // pendingHeats: (state.heats) ? state.heats.filter(t => t.isPending) : [],
  // completeHeats: (state.race.heats) ? state.race.heats.filter(t => t.isComplete) : []
  state: state,
});

const mapDispatchToProps = (dispatch: Function) => ({
  createRace: array => dispatch(createRace(array)),
  updateRaceMode: object => dispatch(setRaceMode(object)),
  validateTrackers: array => dispatch(validateTrackers(array))
});

const RacingContainer = connect(mapStateToProps, mapDispatchToProps)(Racing);

export default RacingContainer;
