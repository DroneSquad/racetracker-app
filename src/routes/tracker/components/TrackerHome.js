// @flow
import React, { Component } from 'react';

import './tracker-home.css';
import { AppBar, Divider, FlatButton } from 'material-ui';

import { historyBackButton } from '../../../utils';

import BluetoothCard from '../containers/BluetoothCardContainer';
import TrackerList from '../containers/TrackerListContainer';

export default class extends Component {
  props: {
    isBtAvailable: boolean,
    isBtEnabled: boolean,
    isBtScanning: boolean,
    trackers: Array<RaceTracker>,
    enableBt: Function,
    startTrackerScan: Function,
    stopTrackerScan: Function,
    validateTrackers: Function
  };

  componentDidMount() {
  /*  if (this.props.isBtAvailable && this.props.isBtEnabled) {
      this.initSearchOrScan();
    }*/
  }

  componentWillReceiveProps(nextProps) {
  /*  if (nextProps.isBtEnabled !== this.props.isBtEnabled && nextProps.isBtEnabled) {
      // bluetooth has been enabled do the auto-magic stuff
      this.initSearchOrScan();
    }*/
  }

  initSearchOrScan() {
    if (this.props.trackers.length === 0) {
      // automagically start bluetooth scan for racetrackers
      this.startDiscovery();
    } else {
      // verify each tracker available on the existing list
      this.verifyTrackers();
    }
  }

  /** Validate that the device exists on the internal bluetooth scan list */
  verifyTrackers() {
    if (!this.props.isBtScanning) {
      this.props.validateTrackers(this.props.trackers);
    }
  };

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
    let { isBtEnabled, isBtAvailable } = this.props;
    return (
      <div className={isBtAvailable && isBtEnabled ? 'main tracker-home' : 'main'}>
        <header>
          <AppBar
            title="RaceTracker"
            iconClassNameLeft="mdi mdi-arrow-left"
            onLeftIconButtonTouchTap={historyBackButton.bind(this)}
          />
        </header>
        <main>
          {!isBtAvailable &&
            <BluetoothCard
              title="No Bluetooth LE Available"
              subtitle="This device does not support Bluetooth LE"
              text="The Cordova plugin for Bluetooth LE support was not found"
              button=""
            />}
          {isBtAvailable &&
            !isBtEnabled &&
            <BluetoothCard
              title="Enable Bluetooth"
              subtitle="Bluetooth LE is required to use TBS RaceTrackers"
              text="Enable Bluetooth to continue"
              button="enable"
            />}
          {isBtAvailable && isBtEnabled && <this.rtDiscoveryList />}
        </main>
        <footer>
          {isBtAvailable && isBtEnabled && <this.btScanButton />}
        </footer>
      </div>
    );
  }
}
