// @flow
import { connect } from 'react-redux';

import Stopwatch from '../components/Stopwatch';

import { startHeat, stopHeat, createHeat } from '../modules/race';

/*  This is a container component. It does not contain any JSX, or
    import React. This component is **only** responsible for wiring
    in actions and state necessary to render a presentational component */

const mapStateToProps = (state, ownProps) => ({
  activeHeat: (state.race.heats) ? state.race.heats.filter(t => t.id === state.race.activeHeat)[0] : null,
  raceMode: state.race.raceMode,
  trackerId: state.race.trackerId,
  racerChannels: state.trackers.filter(t => t.id === state.race.trackerId)[0].racerChannels,
  state: state
});

const mapDispatchToProps = (dispatch: Function) => ({
  startHeat: object => dispatch(startHeat(object)),
  stopHeat: object => dispatch(stopHeat(object)),
  createHeat: object => dispatch(createHeat(object))
});

const StopwatchContainer = connect(mapStateToProps, mapDispatchToProps)(Stopwatch);

export default StopwatchContainer;
