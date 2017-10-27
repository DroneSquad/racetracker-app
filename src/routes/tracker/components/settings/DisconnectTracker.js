import React from 'react';
import Setting from './Setting';

import { FlatButton } from 'material-ui';

export default class DisconnectTracker extends Setting {
  props: {
    id: string,
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
  disconnect = () => {
    // should dispatch the push `this.props.goToTrackers()` after we get the command back
    this.props.disconnect(this.props.id);
  };

  render() {
    return (
      <div className={this.isLoadingClass()} style={{ padding: '0 16px' }}>
        <h3 className="no-margin left push-down-text">Disconnect Tracker</h3>
        <div className="clear">
          <div className="center-text">
            <FlatButton primary label="Disconnect" onTouchTap={this.disconnect} />
          </div>
        </div>
      </div>
    );
  }
}
