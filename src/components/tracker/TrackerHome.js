import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AppBar, Divider, FlatButton } from 'material-ui';
import { historyBackButton } from '../../utils';
import './tracker-home.css';

import TrackerList from './TrackerList';
import { discoverTracker } from '../../reducers/tracker';

class TrackerHome extends Component {
  props: {
    deviceFound: Function
  };

  discover() {
    console.log('discover BLE devices');
    // TODO: should timer setting be a user setting?
    window.ble.scan([], 10, this.props.deviceFound, function() {
      console.log('BLE device discovery failed');
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
          <TrackerList headerText="Connected RaceTrackers" emptyText="No connected race trackers" />
          <Divider />
          <TrackerList headerText="Available RaceTrackers" emptyText="No available race trackers" />
        </main>
        <footer>
          <FlatButton primary label="rescan" className="right" onClick={this.discover.bind(this)} />
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
  }
  //  handleClick(event) {
  //    dispatch(discoverTracker({ name: 'TBS Orange', rssi: '-87', id: '9287359j' }));
  //  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackerHome);
