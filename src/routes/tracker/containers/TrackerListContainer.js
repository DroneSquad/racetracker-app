import { connect } from 'react-redux';
import TrackerList from '../components/TrackerList';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the TrackerList:   */

const mapStateToProps = (state, ownProps) => ({
  trackers: filterStatus(state.trackers, ownProps.filter),
  isBtScanning: state.bluetooth.isScanning
});

const filterStatus = (trackers, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return trackers;
    case 'SHOW_CONNECTED':
      return trackers.filter(t => t.isConnected);
    case 'SHOW_AVAILABLE':
      return trackers.filter(t => !t.isConnected);
    default:
      return trackers;
  }
};

const TrackerListContainer = connect(mapStateToProps)(TrackerList);

export default TrackerListContainer;
