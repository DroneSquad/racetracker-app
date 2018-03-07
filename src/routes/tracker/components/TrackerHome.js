// @flow
import React, { Component } from 'react';

import './tracker-home.css';
import { AppBar, Divider, FlatButton } from 'material-ui';

import { historyBackButton } from '../../../utils';

import BluetoothCard from '../../../global/app/containers/BluetoothCardContainer';
import TrackerList from '../containers/TrackerListContainer';

export default class extends Component {
  props: {
    isBtEnabled: boolean,
    isBtScanning: boolean,
    trackers: Array<RaceTracker>,
    availableTrackers: Array<RaceTracker>,
    connectedTrackers: Array<RaceTracker>,
    startTrackerScan: Function,
    stopTrackerScan: Function,
    validateTrackers: Function
  };

  componentDidMount() {
    if (this.props.isBtEnabled) {
      this.initSearchOrScan();
    }
  }

  componentWillReceiveProps(nextProps) {
    // bluetooth was just enabled, lets validate any trackers from previous sessions
    if (nextProps.isBtEnabled !== this.props.isBtEnabled && nextProps.isBtEnabled) {
      this.initSearchOrScan();
    }
  }

  initSearchOrScan() {
    if (this.props.trackers.length === 0) {
      this.startDiscovery(); // automagically start bluetooth scan for all racetrackers
    } else {
      this.verifyTrackers(); // verify connection state of all known trackers available
    }
  }

  /** Validate that the device exists on the internal bluetooth scan list */
  verifyTrackers() {
    if (!this.props.isBtScanning) {
      this.props.validateTrackers(this.props.trackers);
    }
  }

  /** Start racetracker discovery if possible */
  startDiscovery = () => {
    if (!this.props.isBtScanning) {
      this.props.startTrackerScan(this.props.trackers);
    }
  };

  stopDiscovery = () => {
    // TODO: should we run the validation on a manually stopped scan
    // see the racetracker module function stopTrackerScan, where this call is used
    // possible options: improved callback, only validate connected trackers, wipe all?
    // ------------------------ two options -----------------------------
    // 1.)
    // this.props.stopTrackerScan(this.props.trackers); // completes validation on cancel
    // 2.)
    this.props.stopTrackerScan(); // no validation on cancel
  };

  /** change button purpose: start/stop scan based on scanning state */
  btScanButton = () => {
    let { isBtScanning, ...attrs } = this.props;
    attrs = {
      className: 'right'
    };
    if (isBtScanning) {
      attrs = {
        ...attrs,
        onClick: this.stopDiscovery,
        label: 'stop'
      };
    } else {
      attrs = {
        ...attrs,
        onClick: this.startDiscovery,
        label: 'rescan'
      };
    }
    return <FlatButton primary {...attrs} />;
  };

  /** displays all connected/available racetrackers */
  rtDiscoveryList = () => {
    return (
      <div>
        <TrackerList
          history={this.props.history}
          trackers={this.props.connectedTrackers}
          headerText="Connected RaceTrackers"
          emptyText="No connected RaceTrackers"
        />
        <Divider />
        <TrackerList
          history={this.props.history}
          trackers={this.props.availableTrackers}
          headerText="Available RaceTrackers"
          emptyText="No available RaceTrackers"
        />
      </div>
    );
  };

  render() {
    let { isBtEnabled } = this.props;
    return (
      <div className={isBtEnabled ? 'main tracker-home' : 'main'}>
        <header>
          <AppBar
            title="RaceTracker"
            iconClassNameLeft="mdi mdi-arrow-left"
            onLeftIconButtonTouchTap={historyBackButton.bind(this)}
          />
        </header>
        <main>
          <BluetoothCard />
          {isBtEnabled && <this.rtDiscoveryList />}
        </main>
        <footer>
          {isBtEnabled && <this.btScanButton />}
        </footer>
      </div>
    );
  }
}
