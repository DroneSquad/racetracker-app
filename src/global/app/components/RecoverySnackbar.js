import _ from 'lodash';

import React from 'react';
import { Snackbar } from 'material-ui';

export default class RecoverySnackbar extends React.PureComponent {
  props: {
    reconnectingTrackers: Array<RaceTracker>,
    connect: Function,
    disconnect: Function,
    setDisconnected: Function,
    message: string,
    action: string,
    device_id: string,
    tryAgain: boolean,
  };

  constructor(props){
    super(props);
    this.state = {
      message: '',
      action: '',
      device_id: '',
      tryAgain: true,
    };
  }

  /** Watch reconnectingTracker array for applicable changes */
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.reconnectingTrackers.length !== this.props.reconnectingTrackers.length) {;
      if (this.props.reconnectingTrackers.length > 0) {
        // determine which/if any tracker is new to the stack
        let d = _.difference(
          _.map(this.props.reconnectingTrackers, 'id').sort(),
          _.map(prevProps.reconnectingTrackers, 'id').sort());
        if (d.length > 0) {
          let tracker = _(this.props.reconnectingTrackers).filter(t => t.id === d[0]).value()[0];
          if (tracker) {
            console.log("------------configSnackbar-----------");
            this.configSnackbar(tracker);
          }
        }
      }
    }
  }

  configSnackbar(tracker) {
    if (tracker.recover) {
      if (tracker.reconnects > 0) {
        // attempt to automatically reconnect
        if (tracker.wasConnected) {
          console.log("1");
          this.setState({ message: tracker.name + ' connection lost', action: '', device_id: tracker.id, tryAgain: true });
          console.log("1x");
        } else {
          console.log("2");
          this.setState({ message: tracker.name + ' connection failed', action: '', device_id: tracker.id, tryAgain: true });
          console.log("2x");
        }
      } else {
        // reconnection attempts failed, ask our user for advice
        if (tracker.wasConnected) {
          console.log("3");
          this.setState({ message: tracker.name + ' connection lost', action: 'try again', device_id: tracker.id, tryAgain: false });
          console.log("3x");
        } else {
          console.log("4");
          this.setState({ message: tracker.name + ' connection failed', action: 'try again', device_id: tracker.id, tryAgain: false });
          console.log("4x");
        }
      }
    } else {  // recovery is not an option, give them nothing.. NOTHING I SAY
      if (tracker.wasConnected) {
        this.setState({ message: tracker.name + ' connection lost', action: '', device_id: tracker.id, tryAgain: false });
      } else {
        this.setState({ message: tracker.name + ' connection failed', action: '', device_id: tracker.id, tryAgain: false });
      }
    }
  }

  handleTouchTap = () => {
    console.log("handleTouchTap-START");
    this.setState({ tryAgain: true });
    console.log("handleTouchTap-END");
  };

  handleRequestClose = () => {
    console.log("handleRequestClose-START");
    let { device_id, tryAgain } = this.state;
    if (tryAgain) {
      console.log("XXX");
      this.props.connect(device_id);
    } else {
      console.log("YYY");
      this.props.setDisconnected(device_id);
    }
    console.log("RESET");
    this.setState({ message: '', action: '' });
    console.log("handleRequestClose-END");
  };

  render() {
    let { message, action } = this.state;
    let attrs = {
      open: !!message,
      message: message,
      autoHideDuration: 5000,
      onRequestClose: this.handleRequestClose,
    };
    if (action) {
      console.log("ACCTTIONN");
      attrs = {
        ...attrs,
        action: action,
        onActionTouchTap: this.handleTouchTap,
      };
    }
    return (
      <Snackbar {...attrs} />
    );
  }
}
