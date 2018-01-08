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
    // TODO: lets do more checking on exactly how to handle these checks
    // bluetooth was just enabled, lets validate 'available' trackers now,
    // 'connected' trackers will be handled by the TrackerManager. ??
    if (nextProps.isBtEnabled !== this.props.isBtEnabled && nextProps.isBtEnabled) {
      this.initSearchOrScan();
    }
  }

  initSearchOrScan() {
    if (this.props.trackers.length === 0) {
      this.startDiscovery(); // automagically start bluetooth scan for racetrackers
    } else {
      this.verifyTrackers(); // verify all trackers available
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
    // TODO: determine if we should run the validation on a manually stopped scan
    // see the racetracker module function stopTrackerScan, where this call is used
    // possible options: improved callback, only validate connected trackers, wipe all?
    // -----------------------------------------------------
    // this.props.stopTrackerScan(this.props.trackers); // (validation option call)
    this.props.stopTrackerScan();
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
          emptyText="No connected race trackers"
        />
        <Divider />
        <TrackerList
          history={this.props.history}
          trackers={this.props.availableTrackers}
          headerText="Available RaceTrackers"
          emptyText="No available race trackers"
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
