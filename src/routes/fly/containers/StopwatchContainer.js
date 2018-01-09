// @flow
import { connect } from 'react-redux';

import Stopwatch from '../components/Stopwatch';

import { startFlyoverHeat, startShotgunHeat, stopHeat, createHeat, getActiveHeat, getRacerChannels } from '../../../global/app/modules/race';

/*  This is a container component. It does not contain any JSX, or
    import React. This component is **only** responsible for wiring
    in actions and state necessary to render a presentational component */

const mapStateToProps = (state, ownProps) => ({
  activeChannels: getRacerChannels(state),
  activeHeat: getActiveHeat(state),
  raceMode: state.race.raceMode,
  trackerId: state.race.trackerId,
  isSendingCommand: !!state.race.sentCommand
});

const mapDispatchToProps = (dispatch: Function) => ({
  startFlyoverHeat: object => dispatch(startFlyoverHeat(object)),
  startShotgunHeat: object => dispatch(startShotgunHeat(object)),
  stopHeat: object => dispatch(stopHeat(object)),
  createHeat: object => dispatch(createHeat(object)),
});

const StopwatchContainer = connect(mapStateToProps, mapDispatchToProps)(Stopwatch);

export default StopwatchContainer;
