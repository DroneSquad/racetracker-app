import Container from '../components/RacerDetails';

import { connect } from '../../../store';

/** Url pattern /fly/ */
@connect()
export default class extends Container {

  static mapStateToProps = states => ({
    pilots: states.people.pilots,
    fab: false, // the fab for the view
  });

  /** Currently needed for the connect decorator */
  static mapDispatchToProps = dispatch => ({
    fetchPilots: () => {},
    onNewPilot: () => {}
  });

  componentWillMount() {
    this.props.fetchPilots();
  }
}
