// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AppBar, Divider, FlatButton } from 'material-ui';
import { historyBackButton } from '../../utils';
import './tracker-home.css';

import FilteredTrackerList from '../../containers/tracker/FilteredTrackerList';
import { discoverTracker } from '../../reducers/tracker';
import { clearUnpairedTrackers } from '../../reducers/tracker';
import { setBtIsScanning } from '../../reducers/bluetooth';
import { setBtIsEnabled } from '../../reducers/bluetooth';

class TrackerHome extends Component {
  props: {
    deviceFound: Function,
    clearUnpaired: Function,
    handleBtIsScanning: Function,
    handleBtIsEnabled: Function
  };

  stopDiscovery() {
    window.ble.stopScan(this.props.handleBtIsScanning(false), function() {
      console.log('Bluetooth stop discovery failed!'); // TODO: handle failure correctly
    });
  }

  startDiscovery() {
    this.props.clearUnpaired();
    this.props.handleBtIsScanning(true);
    window.ble.startScan([], this.props.deviceFound, function() {
      console.log('Bluetooth device discovery failed!'); // TODO: handle failure correctly
    });
    setTimeout(() => this.stopDiscovery(), 5000); // TODO: make timeout variable?
  }

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
            filter="SHOW_CONNECTED"
            headerText="Connected RaceTrackers"
            emptyText="No connected race trackers"
          />
          <Divider />
          <FilteredTrackerList
            filter="SHOW_AVAILABLE"
            headerText="Available RaceTrackers"
            emptyText="No available race trackers"
          />
        </main>
        <footer>
          <FlatButton
            primary
            label="rescan"
            className="right"
            onClick={() => this.startDiscovery()}
          />
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // add in enabled state watcher
});
const mapDispatchToProps = (dispatch: Function) => ({
  deviceFound(device) {
    if (device.name.startsWith('TBSRT')) {
      dispatch(discoverTracker(device));
    }
  },
  clearUnpaired() {
    dispatch(clearUnpairedTrackers());
  },
  handleBtIsScanning(value) {
    dispatch(setBtIsScanning(value));
  },
  handleBtIsEnabled(value) {
    dispatch(setBtIsEnabled(value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackerHome);
