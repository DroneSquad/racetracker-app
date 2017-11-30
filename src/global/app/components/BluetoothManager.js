// @flow
import React from 'react';

import { Snackbar } from 'material-ui';

export default class BluetoothManager extends React.PureComponent {
  props: {
    btError: string,
    isBtAvailable: boolean,
    isBtEnabled: boolean,
    isBtNotifying: boolean,
    checkIsBtAvailable: Function,
    checkIsBtEnabled: Function,
    startBtStateNotifications: Function,
    stopBtStateNotifications: Function
  };

  componentDidMount() {
    // check/update default state for device bluetooth availability
    this.props.checkIsBtAvailable();
  }

  componentWillReceiveProps(nextProps) {
    // on-mount has found that bluetooth is available for this device
    if (this.props.isBtAvailable !== nextProps.isBtAvailable && nextProps.isBtAvailable) {
      // now check/update the default enabled state of bluetooth on the device
      this.props.checkIsBtEnabled();
      // activate bluetooth state notifications (watches for all bt status changes)
      if (!this.props.isBtNotifying) {
        this.props.startBtStateNotifications();
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // the only reason to ever render is if there is a bluetooth error that
    // needs to be show to the user, otherwise save the cycle and move along
    // TODO: adapt this to also work with isConnected checks
    if (nextProps.btError) {
      return true;
    }
    return false;
  }

  // TODO: Investigate further, called on app minimized, close, WHEN/WHY/EVAR!?
  componentWillUnMount() {
    // stop watching for bluetooth sttus changes
    if (this.props.isBtNotifying) {
      this.props.stopBtStateNotifications();
    }
  }

  render() {
    console.log("BluetoothManager-Render");
    // TODO: handle the isConnection messages
    let { btError } = this.props;
    return (
      <Snackbar open={!!btError} message={btError} autoHideDuration={4000} />
    )
  }
}
