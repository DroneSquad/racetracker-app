import Group from '../components/Group';

import { connect as _connect } from 'react-redux';

import { requestGroup } from '../modules/group';
import { notNull } from '../../../utils';

/**
 * This is to test decorators, this logic is a WIP and may / will change without notice
 * @returns {function(*=)}
 */
function connect() {
  return clazz => {
    // depending how advance we can get this we may be able to grab them from variables within the class
    let mapStateToProps = notNull(clazz.mapStateToProps, 'mapStateToProps');
    // depending how advance we can get this we may be able to grab them from function within the class
    let mapDispatchToProps = notNull(clazz.mapDispatchToProps, 'mapDispatchToProps');
    return _connect(mapStateToProps, mapDispatchToProps)(clazz);
  }
}

/** Sample class that will use the decorators to connect the classes */
@connect() export default class extends Group {

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
