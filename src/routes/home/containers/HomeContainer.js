import Home from '../components/Home';

import reducer, { requestGroups, requestMeetups } from '../modules/home';

import { connect } from '../../../store';

@connect(reducer, 'home')
export default class extends Home {

  static mapStateToProps = states => ({
    groups: states.home.groups, // the groups for the view
    meetups: states.home.meetups, // the groups for the view
  });

  /** Currently needed for the connect decorator */
  static mapDispatchToProps = dispatch => ({
    fetchGroups: () => dispatch(requestGroups()),
    fetchMeetups: () => dispatch(requestMeetups())
  });

  componentWillMount() {
    this.state.index === 0 && this.props.fetchMeetups();
    this.state.index === 1 && this.props.fetchGroups();
  }
}
