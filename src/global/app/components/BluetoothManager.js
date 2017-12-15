// @flow
import React from 'react';

import { Snackbar } from 'material-ui';

export default class BluetoothManager extends React.PureComponent {
  props: {
    btError: string,
    isBtAvailable: boolean,
    isBtNotifying: boolean,
    checkIsBtAvailable: Function,
    checkIsBtEnabled: Function,
    startBtStateNotifications: Function,
    stopBtStateNotifications: Function
  };

  componentDidMount() {
    // on startup check/update the device bluetooth availability state
    this.props.checkIsBtAvailable();
  }

  componentWillReceiveProps(nextProps) {
    // if bluetooth is found to be available on startup, check if it is enabled
    if (this.props.isBtAvailable !== nextProps.isBtAvailable && nextProps.isBtAvailable) {
      // update redux with the current enabled state of bluetooth on this device
      this.props.checkIsBtEnabled();
      // activate bluetooth state notifications (watches for all bt status changes)
      if (!this.props.isBtNotifying) {
        // updates redux anytime bluetooth is turned on/off
        this.props.startBtStateNotifications();
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // the only reason to ever render is if there is a bluetooth error to show
    // the user. otherwise dont bother, save the cycle and move along..
    if (nextProps.btError) {
      return true;
    }
    return false;
  }

  componentWillUnMount() {
    // stop watching for bluetooth status changes
    if (this.props.isBtNotifying) {
      this.props.stopBtStateNotifications();
    }
  }

  render() {
    let { btError } = this.props;
    return <Snackbar open={!!btError} message={btError} autoHideDuration={4000} />;
  }
}
