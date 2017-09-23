// @flow
import { connect } from 'react-redux';

// import { connectTracker, disconnectTracker } from '../modules/racetracker';

import RtConnSnackbar from '../components/RtConnSnackbar';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the TrackerDevice:   */

const mapStateToProps = (state, ownProps) => ({
  deviceIsConnected: state.trackers.filter(t => t.isConnected).length < 0 ? true : false,
  devicesConnected: state.trackers.filter(t => t.isConnected),
  devicesConnectedCount: state.trackers.filter(t => t.isConnected).length
  // isConnecting: state.trackers.filter(t => t.id === ownProps.id)[0].isConnecting,
  // isConnected: state.trackers.filter(t => t.id === ownProps.id)[0].isConnected
});

const mapDispatchToProps = (dispatch: Function) => ({
  // connect: device_id => dispatch(connectTracker(device_id)),
  // disconnect: device_id => dispatch(disconnectTracker(device_id)),
  // openTrackerSettings: device_id => dispatch(push('/tracker/settings', device_id))
});

const RtConnSnackbarContainer = connect(mapStateToProps, mapDispatchToProps)(RtConnSnackbar);

export default RtConnSnackbarContainer;




/*  <Snackbar open={true} message="truth"
  onRequestClose={(reason) => {
    if (reason === 'clickaway') {
      return;
    }}} /> */


/* RtDisconnectSnackBar = () => {
  // TODO: handle ios/android diffs for enabling bluetooth use window.device.platform to find platform
  let { isBtEnabled, isBtAvailable, message, ...attrs } = this.props;
  attrs = {
    open: !!message,
    message: message,
    autoHideDuration: 5000
  };
  if (isBtAvailable && !isBtEnabled) {
    attrs = {
      ...attrs,
      action: 'enable',
      onTouchTap: this.handleSnackBarTap
    };
  }
  return <Snackbar {...attrs} />;
};*/


/*BtSnackBar = () => {
   // TODO: handle ios/android diffs for enabling bluetooth use window.device.platform to find platform
   let { isBtEnabled, isBtAvailable, message, ...attrs } = this.props;
   attrs = {
     open: !!message,
     message: message,
     autoHideDuration: 5000
   };
   if (isBtAvailable && !isBtEnabled) {
     attrs = {
       ...attrs,
       action: 'ENABLE',
       onTouchTap: this.handleSnackBarTap
     };
   }
   return <Snackbar {...attrs} />;
 };
 */
