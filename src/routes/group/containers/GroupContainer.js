import Group from '../components/Group';

import reducer, { requestGroup } from '../modules/group';

import { connect } from '../../../store';

/** Sample class that will use the decorators to connect the classes */
@connect(reducer, 'group')
export default class extends Group {

  /** Currently needed for the connect decorator */
  static mapStateToProps = states => ({
    group: states.group
  });

  /** Currently needed for the connect decorator */
  static mapDispatchToProps = dispatch => ({
    requestGroup: id => dispatch(requestGroup(id))
  });

  componentWillMount() {
    this.props.requestGroup(this.props.match.params.id)
  }
}
