import _ from 'lodash';

import Container from '../components/RaceHeats';

import { connect } from '../../../store';

/** Url pattern /fly/racer */
@connect()
export default class extends Container {
  static mapStateToProps = (states, props) => ({
    // internal data
    heats: _.filter(_.get(states, 'race.heats'), 'isComplete')
  });

  /** Currently needed for the connect decorator */
  static mapDispatchToProps = dispatch => ({});
}
