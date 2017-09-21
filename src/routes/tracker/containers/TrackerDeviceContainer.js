// @flow
import { connect } from 'react-redux';
import TrackerDevice from '../components/TrackerDevice';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the TrackerDevice:   */

const mapStateToProps = (state, ownProps) => ({
  isConnecting: state.trackers.filter(t => t.id === ownProps.id)[0].isConnecting,
  isConnected: state.trackers.filter(t => t.id === ownProps.id)[0].isConnected
});

const mapDispatchToProps = (dispatch: Function, ownProps) => ({
  connectTracker() {
    // console.log('connectTracker: ' & device_id);
    console.log('connectTracker: ' & ownProps.id);
  }
   /*connectSuccess() {
     console.log('connection success: ' & ownProps.id);
    //  dispatch(connectTracker(ownProps.id));
   },
   connectFailure(device) {
     console.log('connection failed disconnected: ' & device.id);
     // dispatch(disconnectTracker(device.id));
   }*/
});

const TrackerDeviceContainer = connect(mapStateToProps, mapDispatchToProps)(TrackerDevice);

export default TrackerDeviceContainer;
