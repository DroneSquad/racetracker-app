// @flow
import { connect } from 'react-redux';

import {
  connectTracker,
  setConnecting,
  disconnectTracker,
  setDisconnected
} from '../../../routes/tracker/modules/racetracker';

import RecoverySnackbar from '../components/RecoverySnackbar';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the TrackerDevice:   */

const mapStateToProps = state => ({
  reconnectingTrackers: state.trackers.filter(t => t.isReconnecting),
  connectingTrackers: state.trackers.filter(t => t.isConnecting),
  connectedTrackers: state.trackers.filter(t => t.isConnected)
});

const mapDispatchToProps = (dispatch: Function) => ({
  connect: deviceId => dispatch(connectTracker(deviceId)),
  setConnecting: deviceId => dispatch(setConnecting(deviceId)),
  disconnect: deviceId => dispatch(disconnectTracker(deviceId)),
  setDisconnected: deviceId => dispatch(setDisconnected(deviceId))
});

const RecoverySnackbarContainer = connect(mapStateToProps, mapDispatchToProps)(RecoverySnackbar);

export default RecoverySnackbarContainer;
