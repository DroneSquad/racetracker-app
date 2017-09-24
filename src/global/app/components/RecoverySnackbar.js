import React from 'react';
import { Snackbar } from 'material-ui';

export default class RecoverySnackbar extends React.PureComponent {
  props: {

  };

  /*onClick = event => {
    this.props.authLogout(this.props.token);
  };*/

  /** Watch tracker state properties for reconnecting changes */
  componentDidUpdate(prevProps, prevState) {
    // if deviceIsConnected
  //  if (prevProps.reconnectingTrackers.length !== this.props.reconnectingTrackers.length) {
    //  if (this.props.reconnectingTrackers.length > 0) {
      //  console.log("YES");
      //  console.log(this.props.reconnectingTrackers);
    //  }

      // determine which is new
      // console.log("reconnecting called");
      // if (!this.props.isReconnecting) {
      //  console.log("reconnecting has failed")
      //}
    //}
  }

  render() {
    return (
      <Snackbar open={false} message="truth"
            onRequestClose={(reason) => {
              if (reason === 'clickaway') {
                return;
              }}} />
    );
  }
}






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
