import People from '../components/People';

import reducer, { groupPilots } from '../modules/people';

import { connect } from '../../../store';

@connect(reducer, 'people')
export default class extends People {

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
