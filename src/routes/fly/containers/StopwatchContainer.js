// @flow
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';

import Stopwatch from '../components/Stopwatch';

import { startHeat, stopHeat } from '../modules/race';

/*  This is a container component. It does not contain any JSX, or
    import React. This component is **only** responsible for wiring
    in actions and state necessary to render a presentational component */

const mapStateToProps = (state, ownProps) => ({
  activeHeat: (state.race.heats) ? state.race.heats.filter(t => t.id === state.race.activeHeat)[0] : null,
  raceMode: state.race.raceMode,
  trackerId: state.race.trackerId,
    state: state,
});

const mapDispatchToProps = (dispatch: Function) => ({
  startHeat: object => dispatch(startHeat(object)),
  stopHeat: object => dispatch(stopHeat(object)),
  // nextHeat: object => dispatch(nextHeat(object))
});

const StopwatchContainer = connect(mapStateToProps, mapDispatchToProps)(Stopwatch);

export default StopwatchContainer;
