import React from 'react';
import Setting from './Setting';

import { FlatButton } from 'material-ui';

export default class DisconnectTracker extends Setting {
  props: {
    id: string,
    isConnected: boolean,
    disconnect: Function,
    goToTrackers: Function
  };

  /** Watch the racetracker connection status */
  componentWillReceiveProps(nextProps) {
    if (!nextProps.isConnected) {
      this.props.goToTrackers();
    }
  }

  /** Disconnect the race tracker */
  handleDisconnect = () => {
    // will change the props, thus the above will fire and return us to homepage
    this.props.disconnect(this.props.id);
  };

  render() {
    return (
      <div style={{ padding: '0 16px' }}>
        <h3 className="no-margin left push-down-text">Connection</h3>
        <div className="clear">
          <div className="center-text">
            <FlatButton primary label="Disconnect" onClick={this.handleDisconnect} />
          </div>
        </div>
      </div>
    );
  }
}
