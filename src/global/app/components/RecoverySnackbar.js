import _ from 'lodash';

import React from 'react';
import { Snackbar } from 'material-ui';

export default class RecoverySnackbar extends React.PureComponent {
  props: {
    reconnectingTrackers: Array<RaceTracker>,
    connectingTrackers: Array<RaceTracker>,
    connectedTrackers: Array<RaceTracker>,
    connect: Function, // attempt to connect to tracker
    disconnect: Function, // disconnect a connected tracker
    setDisconnected: Function // update prop of already disconnected tracker
  };

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      message: '',
      action: '', // button on snackbar
      timer: true,
      clicked: false,
      default_action: '',
      clicked_action: ''
    };
  }

  /** Watch tracker array for connection state changes */
  componentDidUpdate(prevProps, prevState) {
    // handle trakers in a connecting state
    if (prevProps.connectingTrackers.length !== this.props.connectingTrackers.length) {
      if (this.props.connectingTrackers.length > 0) {
        // determine which/if any tracker is new to the stack
        let d = _.difference(
          _.map(this.props.connectingTrackers, 'id').sort(),
          _.map(prevProps.connectingTrackers, 'id').sort()
        );
        if (d.length > 0) {
          let tracker = _(this.props.connectingTrackers).filter(t => t.id === d[0]).value()[0];
          if (tracker) {
            this.configSnackbar(tracker);
          }
        }
      }
    }
    // handles trackers in a reconnecting state
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
    // handles trackers in a connected state
    if (prevProps.connectedTrackers.length !== this.props.connectedTrackers.length) {
      if (this.props.connectedTrackers.length > 0) {
        // determine which/if any tracker is new to the stack
        let d = _.difference(
          _.map(this.props.connectedTrackers, 'id').sort(),
          _.map(prevProps.connectedTrackers, 'id').sort()
        );
        if (d.length > 0) {
          let tracker = _(this.props.connectedTrackers).filter(t => t.id === d[0]).value()[0];
          if (tracker) {
            this.configSnackbar(tracker);
          }
        }
      }
    }
  }

  configSnackbar(tracker) {
    let message = '';
    let action = '';
    let timer = true;
    let defAction = '';
    let clkAction = '';
    // handle trackers attempting to connect/reconnect
    if (tracker.isConnecting) {
      timer = false;
      action = 'cancel';
      defAction = 'connect';
      clkAction = 'disconnect';
      if (tracker.wasConnected) {
        message = 'reconnecting ' + tracker.name;
      } else {
        message = 'connecting ' + tracker.name;
      }
    }
    // handle trackers that have connected
    if (tracker.isConnected) {
      if (tracker.wasConnected) {
        message = tracker.name + ' reconnected';
      } else {
        message = tracker.name + ' connected';
      }
    }
    // handle trackers that have failed to connect/reconnect
    if (tracker.isReconnecting) {
      // make sure this tracker is setup for recovery
      if (tracker.recover) {
        // check if it has any reconnection attempts remaining
        if (tracker.reconnects > 0) {
          defAction = 'connect';
          // attempt to automatically reconnect
          if (tracker.wasConnected) {
            // if it was connected and then failed
            message = tracker.name + ' connection lost';
          } else {
            // if has never actually connected
            message = tracker.name + ' connection error';
          }
        } else {
          // attempts at auto connection have failed, ask user for advice
          action = 'retry';
          defAction = 'disconnect';
          clkAction = 'connect';
          if (tracker.wasConnected) {
            message = tracker.name + ' reconnection failed';
          } else {
            message = tracker.name + ' connection failed';
          }
        }
      } else {
        defAction = 'disconnect';
        // recovery is not an option, give them nothing.. NOTHING I SAY
        if (tracker.wasConnected) {
          message = tracker.name + ' connection lost';
        } else {
          message = tracker.name + ' connection error';
        }
      }
    }
    this.setState({
      id: tracker.id,
      message: message,
      action: action,
      timer: timer,
      default_action: defAction,
      clicked_action: clkAction
    });
  }

  handleTouchTap = () => {
    this.setState({ clicked: true });
  };

  handleRequestClose = () => {
    let { id, clicked, default_action, clicked_action } = this.state;
    if (clicked) {
      if (clicked_action === 'connect') {
        this.props.isConnecting(id);
        this.props.connect(id);
      }
      if (clicked_action === 'disconnect') {
        this.props.setDisconnected(id);
      }
    } else {
      if (default_action === 'connect') {
        this.props.isConnecting(id);
        this.props.connect(id);
      }
      if (default_action === 'disconnect') {
        this.props.setDisconnected(id);
      }
    }
    this.setState({ message: '', clicked: false });
  };

  render() {
    let { message, action, timer } = this.state;
    let attrs = {
      open: !!message,
      message: message,
      onRequestClose: this.handleRequestClose
    };
    if (timer) {
      attrs = {
        ...attrs,
        autoHideDuration: 5000
      };
    }
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
