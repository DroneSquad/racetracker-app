import Group from '../components/Group';

import { push } from 'react-router-redux';

import reducer, { requestAllGroupData, requestMembers } from '../modules/group';
import { groupPilots } from '../../people/modules/people';

import { connect } from '../../../store';

import { lazyLoad } from '../../../utils';


// Math to caculate the number of avatars to show, this is magic numbers no way to really know
const MEMBER_LIMIT = Math.floor(window.innerWidth / (25 + 4 * 2)) - 4;

/** Sample class that will use the decorators to connect the classes */
@connect(reducer, 'group')
export default class extends Group {

  /** Currently needed for the connect decorator */
  static mapStateToProps = states => ({
    group: states.group,
    /** Actions one can make on the group, to do generate from action, depending on who is viewing */
    actions: [
      {
        logo: 'message-text-outline',
        name: 'Contact'
      },
      {
        logo: 'account-plus',
        name: 'Join'
      },
      {
        logo: 'share-variant',
        name: 'Share'
      }
    ]
  });

  /** Currently needed for the connect decorator */
  static mapDispatchToProps = dispatch => ({
    requestGroup: id => dispatch(requestAllGroupData(id)),
    requestMembers: id => dispatch(requestMembers(id, { order: 'id DESC', limit: MEMBER_LIMIT })),
    showMembers: id => {
      dispatch(groupPilots(id));
      dispatch(push('/people'));
    }
  });

  componentWillMount() {
    this.id = this.props.match.params.id;
    this.props.requestGroup(this.id);
  }

  componentDidMount() {
    // lazy load the members list
    let element = document.getElementById(`group-${this.id}-members`);
    this.membersLazyLoad = lazyLoad(element, () => this.props.requestMembers(this.id));
  }

  componentWillUnmount() {
    this.membersLazyLoad && this.membersLazyLoad();
  }
}
