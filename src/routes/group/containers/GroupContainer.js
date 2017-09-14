import Group from '../components/Group';

import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({
  redux: { // im tired of mapping states, just put it all under here
    state: state,
    props: props,
  }
});

const mapDispatchToProps = dispatch => ({

});

const GroupContainer = connect(mapStateToProps, mapDispatchToProps)(Group);

export default GroupContainer;
