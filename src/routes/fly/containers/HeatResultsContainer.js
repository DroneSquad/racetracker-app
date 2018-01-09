import Container from '../components/HeatResults';

import { connect } from '../../../store';

/** Url pattern /fly/racer */
@connect()
export default class extends Container {
  static mapStateToProps = (states, props) => ({
    // internal data
    heatId: props.heatId
  });

  /** Currently needed for the connect decorator */
  static mapDispatchToProps = dispatch => ({});
}
