import Home from '../components/Home';

import reducer, { requestGroups, requestRsvps } from '../modules/home';

import { connect } from '../../../store';

@connect(reducer, 'home')
export default class extends Home {

  static mapStateToProps = states => ({
    groups: states.home.groups, // the groups for the view
    rsvps: states.home.rsvps, // the groups for the view
  });

  /** Currently needed for the connect decorator */
  static mapDispatchToProps = dispatch => ({
    fetchGroups: () => dispatch(requestGroups()),
    fetchRsvps: () => dispatch(requestRsvps())
  });

  componentWillMount() {
    //this.state.index === 0 && this.props.fetchRsvps();
    //this.state.index === 1 && this.props.fetchGroups();
  }
}
