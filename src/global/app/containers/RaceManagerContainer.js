// @flow
import { connect } from 'react-redux';

import { getConnectedTrackers } from '../modules/racetracker';

import { setIsValid } from '../modules/race';

import RaceManager from '../components/RaceManager';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the RaceManager  */

const mapStateToProps = state => ({
  isRaceActive: state.race.isActive,
  isRaceValid: state.race.isValid,

  // connectedTrackers: getConnectedTrackers(state),
  //
  // activeHeatId: state.race.activeHeat,
  // activeRaceId: state.race.id,
  // activeTrackerId: state.race.trackerId,
  // activeRaceMode: state.race.raceMode,
  // isBtScanning: state.bluetooth.isScanning,
  //  ? state.trackers.filter(t => t.id === state.race.trackerId)[0].raceMode
  //  : state.race.raceMode,
  // pendingHeats: (state.heats) ? state.heats.filter(t => t.isPending) : [],
  // completeHeats: (state.race.heats) ? state.race.heats.filter(t => t.isComplete) : []
});

const mapDispatchToProps = (dispatch: Function) => ({
  setIsValid: boolean => dispatch(setIsValid(boolean)),
});

const RaceManagerContainer = connect(mapStateToProps, mapDispatchToProps)(RaceManager);

export default RaceManagerContainer;
