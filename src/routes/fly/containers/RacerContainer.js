// @flow
import { connect } from 'react-redux';
import { msToClock } from '../../../utils';
import Racer from '../components/Racer';

/*  This is a container component. It does not contain any JSX, or
    import React. This component is **only** responsible for wiring
    in actions and state necessary to render a presentational component */

const mapStateToProps = (state, ownProps) => ({
  lap: state.race.laps
    .filter(h => h.racer === ownProps.id && (h.heatId === ownProps.heatId || h.heat === ownProps.heatId))[0].lap,
  lapTime: msToClock(
    state.race.laps
      .filter(h => h.racer === ownProps.id && (h.heatId === ownProps.heatId || h.heat === ownProps.heatId))[0].lapTime
  ),
  bestTime: msToClock(
    state.race.laps
      .filter(h => h.racer === ownProps.id && (h.heatId === ownProps.heatId || h.heat === ownProps.heatId))
      .sort((a, b) => a.lapTime - b.lapTime)[0].lapTime
  )
});

const RacerContainer = connect(mapStateToProps)(Racer);

export default RacerContainer;
