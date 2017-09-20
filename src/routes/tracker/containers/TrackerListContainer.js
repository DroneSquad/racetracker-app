import { connect } from 'react-redux';
import TrackerList from '../components/TrackerList';

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

const mapStateToProps = (state, ownProps) => ({
  trackers: filterStatus(state.trackers, ownProps.filter)
  // isScanning: state.bluetooth.isScanning
});

const TrackerListContainer = connect(mapStateToProps)(TrackerList);

export default TrackerListContainer;
