// @flow
import _ from 'lodash';

import { connect } from 'react-redux';
import { msToClock } from '../../../utils';
import Racer from '../components/Racer';
import { push } from 'react-router-redux';

const mapStateToProps = (states, props) => ({
  lap: states.race.laps.filter(
    h => h.racer === props.id && (h.heatId === props.heatId || h.heat === props.heatId)
  )[0].lap,
  lapTime: msToClock(
    states.race.laps.filter(
      h => h.racer === props.id && (h.heatId === props.heatId || h.heat === props.heatId)
    )[0].lapTime
  ),
  bestTime: msToClock(
    _.get(
      _.sortBy(_.filter(states.race.laps, lap => lap.racer === Number(props.id) && (lap.heatId === props.heatId || lap.heat === props.heatId)), lap =>
        Number(lap.lapTime)
      ),
      '[0].lapTime'
    )
  )
});

const mapDispatchToProps = dispatch => ({
  openRacer: (heat, id) => dispatch(push(`/fly/racer/${heat}/${id}`))
});

const RacerContainer = connect(mapStateToProps, mapDispatchToProps)(Racer);

export default RacerContainer;
