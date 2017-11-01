// @flow
import { connect } from 'react-redux';

import Stopwatch from '../components/Stopwatch';

import { startHeat, startShotgunHeat, stopHeat, createHeat, updateLaps } from '../modules/race';

/*  This is a container component. It does not contain any JSX, or
    import React. This component is **only** responsible for wiring
    in actions and state necessary to render a presentational component */

const mapStateToProps = (state, ownProps) => ({
  activeHeat: state.race.heats ? state.race.heats.filter(t => t.id === state.race.activeHeat)[0] : null,
  raceMode: state.race.raceMode,
  queryInterval: state.race.queryInterval,
  trackerId: state.race.trackerId,
  racerChannels: state.trackers.filter(t => t.id === state.race.trackerId)[0].racerChannels,
});

const mapDispatchToProps = (dispatch: Function) => ({
  startHeat: object => dispatch(startHeat(object)),
  startShotgunHeat: object => dispatch(startShotgunHeat(object)),
  stopHeat: object => dispatch(stopHeat(object)),
  createHeat: object => dispatch(createHeat(object)),
  updateLaps: object => dispatch(updateLaps(object))
});

const StopwatchContainer = connect(mapStateToProps, mapDispatchToProps)(Stopwatch);

export default StopwatchContainer;
