// @flow
import { connect } from 'react-redux';

import Stopwatch from '../components/Stopwatch';

import { startHeat, stopHeat, createHeat, getActiveHeat, getActiveTracker } from '../../../global/app/modules/race';

/*  This is a container component. It does not contain any JSX, or
    import React. This component is **only** responsible for wiring
    in actions and state necessary to render a presentational component */

const mapStateToProps = (state, ownProps) => ({
  activeHeat: getActiveHeat(state),
  activeTracker: getActiveTracker(state),
  raceMode: state.race.raceMode,
  isAwaitingResponse: !!state.race.awaitingResponse,
});

const mapDispatchToProps = (dispatch: Function) => ({
  stopHeat: object => dispatch(stopHeat(object)),
  startHeat: object => dispatch(startHeat(object)),
  createHeat: object => dispatch(createHeat(object)),
});

const StopwatchContainer = connect(mapStateToProps, mapDispatchToProps)(Stopwatch);

export default StopwatchContainer;
