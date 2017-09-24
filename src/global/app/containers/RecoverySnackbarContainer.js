// @flow
import { connect } from 'react-redux';

import { connectTracker, disconnectTracker } from '../../../routes/tracker/modules/racetracker';

import RecoverySnackbar from '../components/RecoverySnackbar';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the TrackerDevice:   */

const mapStateToProps = (state, ownProps) => ({
  // deviceIsConnected: state.trackers.filter(t => t.isConnected).length > 0 ? true : false,
  // reconnectingTrackers: state.trackers.filter(t => t.isReconnecting),
});

const mapDispatchToProps = (dispatch: Function) => ({
  connect: device_id => dispatch(connectTracker(device_id)),
  disconnect: device_id => dispatch(disconnectTracker(device_id)),
});

const RecoverySnackbarContainer = connect(mapStateToProps, mapDispatchToProps)(RecoverySnackbar);

export default RecoverySnackbarContainer;
