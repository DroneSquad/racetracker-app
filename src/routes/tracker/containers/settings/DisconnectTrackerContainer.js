// @flow
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import DisconnectTracker from '../../components/settings/DisconnectTracker';

import { disconnectTracker } from '../../../global/racetracker/modules/racetracker';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, TrackerDisconnection */

const mapStateToProps = (state, ownProps) => ({
  isConnected: state.trackers.filter(t => t.id === ownProps.id)[0].isConnected
});

const mapDispatchToProps = (dispatch: Function) => ({
  disconnect: deviceId => dispatch(disconnectTracker(deviceId)),
  goToTrackers: () => dispatch(push(`/tracker`))
});

const DisconnectTrackerContainer = connect(mapStateToProps, mapDispatchToProps)(DisconnectTracker);

export default DisconnectTrackerContainer;
