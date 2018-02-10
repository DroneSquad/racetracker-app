// @flow
import { connect } from 'react-redux';

import Stopwatch from '../components/Stopwatch';

import {
  startFlyoverHeat,
  startShotgunHeat,
  stopHeat,
  createHeat,
  getActiveHeat,
  getActiveTracker
} from '../../../global/app/modules/race';

/*  This is a container component. It does not contain any JSX, or
    import React. This component is **only** responsible for wiring
    in actions and state necessary to render a presentational component */

const mapStateToProps = (state, ownProps) => ({
  activeHeat: getActiveHeat(state),
  activeTracker: getActiveTracker(state),
  raceMode: state.race.raceMode,
  isSendingCommand: !!state.race.sentCommand,
  activeRace: state.race
});

const mapDispatchToProps = (dispatch: Function) => ({
  startFlyoverHeat: object => dispatch(startFlyoverHeat(object)),
  startShotgunHeat: object => dispatch(startShotgunHeat(object)),
  stopHeat: object => dispatch(stopHeat(object)),
  createHeat: object => dispatch(createHeat(object))
});

const StopwatchContainer = connect(mapStateToProps, mapDispatchToProps)(Stopwatch);

export default StopwatchContainer;
