// @flow
import { connect } from 'react-redux';

import TrackerHome from '../components/TrackerHome';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the TrackerHome:   */

const mapStateToProps = state => ({
  trackers: state.trackers
});

const mapDispatchToProps = (dispatch: Function) => ({
  /*discover(token) {
    dispatch(logoutRequest(token));
  }*/
});

/*const mapDispatchToProps = (dispatch: Function) => ({
  deviceFound(device) {
    if (device.name.startsWith('TBSRT')) {
      dispatch(discoverTracker(device));
    }
  },
  clearUnpaired() {
    dispatch(clearUnpairedTrackers());
  },
  handleBtIsScanning(value) {
    dispatch(setBtIsScanning(value));
  },
  handleBtIsEnabled(value) {
    dispatch(setBtIsEnabled(value));
  }
});*/

const TrackerHomeContainer = connect(mapStateToProps, mapDispatchToProps)(TrackerHome);

export default TrackerHomeContainer;
