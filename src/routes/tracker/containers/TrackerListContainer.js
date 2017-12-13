import { connect } from 'react-redux';

import TrackerList from '../components/TrackerList';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the TrackerList  */

const mapStateToProps = (state, ownProps) => ({
  trackers: ownProps.trackers,
  isBtScanning: state.bluetooth.isScanning
});

const TrackerListContainer = connect(mapStateToProps)(TrackerList);

export default TrackerListContainer;
