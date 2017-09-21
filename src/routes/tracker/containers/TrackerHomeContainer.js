// @flow
import { connect } from 'react-redux';
import { isAvailable, isEnabled, enable } from '../modules/bluetooth';
import TrackerHome from '../components/TrackerHome';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the TrackerHome:   */

const mapStateToProps = (state, ownProps) => ({
  message: state.bluetooth.message,
  isBtAvailable: state.bluetooth.isAvailable,
  isBtEnabled: state.bluetooth.isEnabled
});

const mapDispatchToProps = (dispatch: Function) => ({
  checkIsBtAvailable() {
    dispatch(isAvailable());
  },
  checkIsBtEnabled() {
    dispatch(isEnabled());
  },
  enableBt() {
    dispatch(enable());
  }
});

const TrackerHomeContainer = connect(mapStateToProps, mapDispatchToProps)(TrackerHome);

export default TrackerHomeContainer;
