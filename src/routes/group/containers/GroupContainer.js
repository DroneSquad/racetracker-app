import Group from '../components/Group';

import { connect } from 'react-redux';

import { requestGroup } from '../modules/group';

const mapStateToProps = (state, ownProps) => ({
  redux: { // im tired of mapping states, just put it all under here
    state: state
  }
});

const mapDispatchToProps = dispatch => ({
  requestGroup: id => dispatch(requestGroup(id))
});


const GroupContainer = connect(mapStateToProps, mapDispatchToProps)(class extends Group {
  componentWillMount() {
    this.props.requestGroup(this.props.match.params.id)
  }
});

export default GroupContainer;
