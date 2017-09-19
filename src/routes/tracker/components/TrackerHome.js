// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AppBar, Divider, FlatButton } from 'material-ui';
import { historyBackButton } from '../../../utils';
import './tracker-home.css';

import FilteredTrackerList from '../containers/FilteredTrackerList';
// import { discoverTracker } from '../../reducers/tracker';
// import { clearUnpairedTrackers } from '../../reducers/tracker';
// import { setBtIsScanning } from '../../reducers/bluetooth';
// import { setBtIsEnabled } from '../../reducers/bluetooth';

class TrackerHome extends Component {
  props: {
    trackers: Array
    // deviceFound: Function,
    // clearUnpaired: Function,
    // handleBtIsScanning: Function,
    // handleBtIsEnabled: Function
  };

  componentWillMount() {
    // this.startDiscovery();
  }

  /** Stop finding trackers
  stopDiscovery = () => {
    if ('ble' in window) {
      window.ble.stopScan(this.props.handleBtIsScanning(false), function() {
        console.log('Bluetooth stop discovery failed!'); // TODO: handle failure correctly
      });
    }
  }; */

  /** Start finding trackers
  startDiscovery = () => {
    if ('ble' in window) {
      this.props.clearUnpaired();
      this.props.handleBtIsScanning(true);
      window.ble.startScan([], this.props.deviceFound, function() {
        console.log('Bluetooth device discovery failed!'); // TODO: handle failure correctly
      });
      setTimeout(() => this.stopDiscovery(), 5000); // TODO: make timeout variable?
    } else {
      this.props.deviceFound({ id: 'id', name: `TBSRT Blue Gull`, rssi: 0.6 });
      this.stopDiscovery();
    }
  }; */

  render() {
    return (
      <div className="main tracker-home">
        <header>
          <AppBar
            title="RaceTracker"
            iconClassNameLeft="mdi mdi-arrow-left"
            onLeftIconButtonTouchTap={historyBackButton.bind(this)}
          />
        </header>
        <main>
          <FilteredTrackerList
            history={this.props.history}
            filter="SHOW_CONNECTED"
            headerText="Connected RaceTrackers"
            emptyText="No connected race trackers"
          />
          <Divider />
          <FilteredTrackerList
            history={this.props.history}
            filter="SHOW_AVAILABLE"
            headerText="Available RaceTrackers"
            emptyText="No available race trackers"
          />
        </main>
        <footer>
          <FlatButton primary label="rescan" className="right" onClick={this.startDiscovery} />
        </footer>
      </div>
    );
  }
}

export default TrackerHome;
