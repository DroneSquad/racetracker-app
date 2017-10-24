// @flow
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import { msToClock } from '../../../utils';
import Racer from '../components/Racer';

/*  This is a container component. It does not contain any JSX, or
    import React. This component is **only** responsible for wiring
    in actions and state necessary to render a presentational component */

const mapStateToProps = (state, ownProps) => ({
  lap: state.race.laps.filter(l => l.racer === ownProps.id).filter(h => h.heat === ownProps.heatId).reverse()[0].lap,
  lapTime: msToClock(
    state.race.laps.filter(l => l.racer === ownProps.id).filter(h => h.heat === ownProps.heatId).reverse()[0].lapTime
  ),
  bestTime: getFastestLap(
    state.race.laps.filter(l => l.racer === ownProps.id).filter(h => h.heat === ownProps.heatId).sort(function(a, b) {
      return a.lapTime - b.lapTime;
    })
  )
  // totalTime: state.race.laps.filter(l => l.racer === ownProps.id).filter(h => h.heat === ownProps.heatId).reverse()[0].lap.totalTime
});

const getFastestLap = laps => {
  if (laps.length > 1) {
    if (laps[0].lapTime === 0) {
      return msToClock(laps[1].lapTime);
    }
  }
  return msToClock(laps[0].lapTime);
};

const RacerContainer = connect(mapStateToProps)(Racer);

export default RacerContainer;
