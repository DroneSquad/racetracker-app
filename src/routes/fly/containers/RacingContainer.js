// @flow
import { connect } from 'react-redux';

import Racing from '../components/Racing';

import { createRace } from '../modules/race';

import { validateTrackers } from '../../tracker/modules/racetracker';

/*  This is a container component. It does not contain any JSX, or
    import React. This component is **only** responsible for wiring
    in actions and state necessary to render a presentational component */

const mapStateToProps = state => ({
  connectedTrackers: state.trackers.filter(t => t.isConnected),
  isRaceActive: state.race.isActive,
  activeHeatId: state.race.activeHeat,
  activeRaceId: state.race.id,
  isBtScanning: state.bluetooth.isScanning,
  // activeTrackerId: state.race.trackerId,
  // raceMode: state.race.raceMode,
  // heats: state.race.heats ? state.race.heats : [],
  // raceState: state.race ? state.race : {}
  // pendingHeats: (state.heats) ? state.heats.filter(t => t.isPending) : [],
  // completeHeats: (state.race.heats) ? state.race.heats.filter(t => t.isComplete) : []
});

const mapDispatchToProps = (dispatch: Function) => ({
  createRace: array => dispatch(createRace(array)),
  validateTrackers: array => dispatch(validateTrackers(array))
});

const RacingContainer = connect(mapStateToProps, mapDispatchToProps)(Racing);

export default RacingContainer;
