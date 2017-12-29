import _ from 'lodash';

import Container from '../components/RacerDetails';

import { connect } from '../../../store';

/** Url pattern /fly/racer */
@connect()
export default class extends Container {
  static mapStateToProps = (states, props) => ({
    // internal data
    heatId: props.match.params.heat,
    racerId: Number(props.match.params.racer),
    // display data
    person: `Racer ${props.match.params.racer}`,
    heat: _.get(_.find(states.race.heats, heat => heat.id === props.match.params.heat), 'number'),
    total: _.get(
      _.reverse(_.sortBy(_.filter(states.race.laps, lap => lap.racer === Number(props.match.params.racer)), ['lap'])),
      '[0].totalTime'
    ),
    bestLap: _.get(
      _.sortBy(_.filter(states.race.laps, lap => lap.racer === Number(props.match.params.racer)), lap =>
        Number(lap.lapTime)
      ),
      '[0].lapTime'
    ),
    laps:
      (states.race.laps &&
        _.map(
          _.reverse(
            _.filter(
              states.race.laps,
              lap => lap.racer === Number(props.match.params.racer) && lap.heatId === props.match.params.heat
            )
          ),
          lap => ({ lap: lap.lap, time: lap.lapTime })
        )) ||
      null
  });

  /** Currently needed for the connect decorator */
  static mapDispatchToProps = dispatch => ({});
}
