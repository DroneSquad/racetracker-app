// @flow
import { connect } from 'react-redux';

import Racing from '../components/Racing';

import { getConnectedTrackers } from '../../../global/app/modules/racetracker';

import { createRace, validateRace } from '../../../global/app/modules/race';

/*  This is a container componsent. It does not contain any JSX, or
    import React. This component is **only** responsible for wiring
    in actions and state necessary to render a presentational component */

const mapStateToProps = state => ({
  isRaceActive: state.race.isActive,
  isRaceValid: state.race.isValid,
  activeTrackerId: state.race.trackerId,
  connectedTrackers: getConnectedTrackers(state),

  theState: state,
  activeHeatId: state.race.activeHeat,
  activeRaceMode: state.race.raceMode,
  isBtScanning: state.bluetooth.isScanning,
  //trackerRaceMode: state.race.trackerId
  //  ? state.trackers.filter(t => t.id === state.race.trackerId)[0].raceMode
  //  : state.race.raceMode,
  // pendingHeats: (state.heats) ? state.heats.filter(t => t.isPending) : [],
  // completeHeats: (state.race.heats) ? state.race.heats.filter(t => t.isComplete) : []
});

const mapDispatchToProps = (dispatch: Function) => ({
  validateRace: object => dispatch(validateRace(object)),
  createRace: object => dispatch(createRace(object)),
  // validateTrackers: array => dispatch(validateTrackers(array))
});

const RacingContainer = connect(mapStateToProps, mapDispatchToProps)(Racing);

export default RacingContainer;
