import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AppBar, Divider, FlatButton } from 'material-ui';
import { historyBackButton } from '../../utils';
import './tracker-home.css';

import FilteredTrackerList from '../../containers/tracker/FilteredTrackerList';
import { discoverTracker } from '../../reducers/tracker';
import { clearAvailTrackers } from '../../reducers/tracker';

class TrackerHome extends Component {
  props: {
    deviceFound: Function
  };

  discover() {
    console.log('discover racetrackers');
    this.props.clearAvailDevices();
    // TODO: should timer setting be a user setting?
    window.ble.scan([], 10, this.props.deviceFound, function() {
      // TODO: determine best way to handle failure
      console.log('Bluetooth device discovery failed!');
    });
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
          <FlatButton primary label="rescan" className="right" onClick={() => this.discover()} />
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = (dispatch: Function) => ({
  deviceFound(device) {
    if (device.name.startsWith('TBSRT')) {
      dispatch(discoverTracker(device));
    }
  },
  clearAvailDevices() {
    dispatch(clearAvailTrackers());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackerHome);
