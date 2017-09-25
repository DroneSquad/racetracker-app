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
    tryAgain: boolean
  };

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      action: '',
      device_id: '',
      tryAgain: true
    };
  }

  /** Watch reconnectingTracker array for applicable changes */
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.reconnectingTrackers.length !== this.props.reconnectingTrackers.length) {
      if (this.props.reconnectingTrackers.length > 0) {
        // determine which/if any tracker is new to the stack
        let d = _.difference(
          _.map(this.props.reconnectingTrackers, 'id').sort(),
          _.map(prevProps.reconnectingTrackers, 'id').sort()
        );
        if (d.length > 0) {
          let tracker = _(this.props.reconnectingTrackers).filter(t => t.id === d[0]).value()[0];
          if (tracker) {
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
          this.setState({
            message: tracker.name + ' connection lost',
            action: '',
            device_id: tracker.id,
            tryAgain: true
          });
        } else {
          this.setState({
            message: tracker.name + ' connection failed',
            action: '',
            device_id: tracker.id,
            tryAgain: true
          });
        }
      } else {
        // reconnection attempts failed, ask our user for advice
        if (tracker.wasConnected) {
          this.setState({
            message: tracker.name + ' connection lost',
            action: 'try again',
            device_id: tracker.id,
            tryAgain: false
          });
        } else {
          this.setState({
            message: tracker.name + ' connection failed',
            action: 'try again',
            device_id: tracker.id,
            tryAgain: false
          });
        }
      }
    } else {
      // recovery is not an option, give them nothing.. NOTHING I SAY
      if (tracker.wasConnected) {
        this.setState({
          message: tracker.name + ' connection lost',
          action: '',
          device_id: tracker.id,
          tryAgain: false
        });
      } else {
        this.setState({
          message: tracker.name + ' connection failed',
          action: '',
          device_id: tracker.id,
          tryAgain: false
        });
      }
    }
  }

  handleTouchTap = () => {
    this.setState({ tryAgain: true });
  };

  handleRequestClose = () => {
    let { device_id, tryAgain } = this.state;
    if (tryAgain) {
      this.props.connect(device_id);
    } else {
      this.props.setDisconnected(device_id);
    }
    this.setState({ message: '', action: '' });
  };

  render() {
    let { message, action } = this.state;
    let attrs = {
      open: !!message,
      message: message,
      autoHideDuration: 5000,
      onRequestClose: this.handleRequestClose
    };
    if (action) {
      attrs = {
        ...attrs,
        action: action,
        onActionTouchTap: this.handleTouchTap
      };
    }
    return <Snackbar {...attrs} />;
  }
}
