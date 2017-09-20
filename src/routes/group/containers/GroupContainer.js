import Group from '../components/Group';

import reducer, { requestGroup, requestMembers } from '../modules/group';

import { connect } from '../../../store';

import { lazyLoad } from '../../../utils';

// Math to caculate the number of avatars to show, this is magic numbers no way to really know
const MEMBER_LIMIT = Math.floor(window.innerWidth / 25) - 5;

/** Sample class that will use the decorators to connect the classes */
@connect(reducer, 'group')
export default class extends Group {

  /** Currently needed for the connect decorator */
  static mapStateToProps = states => ({
    group: states.group
  });

  /** Currently needed for the connect decorator */
  static mapDispatchToProps = dispatch => ({
    requestGroup: id => dispatch(requestGroup(id)),
    requestMembers: id => dispatch(requestMembers(id, { order: 'id DESC', limit: MEMBER_LIMIT }))
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
