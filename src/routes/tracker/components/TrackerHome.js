// @flow
import React, { Component } from 'react';

import './tracker-home.css';
import { AppBar, Divider, FlatButton, Snackbar } from 'material-ui';

import { historyBackButton } from '../../../utils';

import BluetoothCard from '../containers/BluetoothCardContainer';
import TrackerList from '../containers/TrackerListContainer';

export default class extends Component {
  props: {
    btError: string,
    isBtAvailable: boolean,
    isBtEnabled: boolean,
    isBtScanning: boolean,
    trackers: Array<RaceTracker>,
    checkIsBtAvailable: Function,
    checkIsBtEnabled: Function,
    enableBt: Function,
    startBtStateNotifications: Function,
    startTrackerScan: Function,
    stopTrackerScan: Function,
    validateTrackers: Function
  };

  componentDidMount() {
    if (!this.props.isBtAvailable) {
      // console.log("componentDidMount-checkIsBtAvailable")
      this.props.checkIsBtAvailable();
    } else {
      if (this.props.trackers.length === 0) {
        if (!this.props.isBtScanning) {
          // console.log("componentDidMount-startDiscovery")
          this.startDiscovery();
        }
      } else {
        this.validateTrackers();
      }
    }
  }

  /** Watch bluetooth state properties for changes */
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isBtAvailable !== this.props.isBtAvailable) {
      if (this.props.isBtAvailable) {
        // TODO: currently this is never stopped, when/where should we handle that
        // console.log("componentDidUpdate-startBtStateNotifications")
        this.props.startBtStateNotifications();
      }
    }
    if (prevProps.isBtEnabled !== this.props.isBtEnabled) {
      if (this.props.isBtEnabled) {
        if (this.props.trackers.length === 0) {
          // console.log("componentDidUpdate-startDiscovery")
          this.startDiscovery();
        } else {
          // console.log("componentDidUpdate-validateTrackers")
          this.validateTrackers();
        }
      }
    }
  }

  /** Validate that the device exists on the internal bluetooth scan list */
  validateTrackers = () => {
    if (!this.props.isBtScanning) {
      console.log('validateTrackers-TRACKERHOME');
      this.props.validateTrackers(this.props.trackers);
    }
  };

  /** Start racetracker discovery if possible */
  startDiscovery = () => {
    if (!this.props.isBtEnabled) {
      // console.log("startDiscovery-checkIsBtEnabled")
      this.props.checkIsBtEnabled(); // check/update bluetooth enabled
    } else {
      if (!this.props.isBtScanning) {
        // prevent scanning if already running
        // console.log("startDiscovery-startTrackerScan")
        this.props.startTrackerScan(this.props.trackers); // begin bluetooth discovery scan
      }
    }
  };

  stopDiscovery = () => {
    // TODO: determine if we should run the validation on a manually stopped scan
    // see the racetracker module function stopTrackerScan, where this call is used
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
          filter="SHOW_CONNECTED"
          headerText="Connected RaceTrackers"
          emptyText="No connected race trackers"
        />
        <Divider />
        <TrackerList
          history={this.props.history}
          filter="SHOW_AVAILABLE"
          headerText="Available RaceTrackers"
          emptyText="No available race trackers"
        />
      </div>
    );
  };

  render() {
    let { btError, isBtEnabled, isBtAvailable } = this.props;
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
          {!isBtAvailable &&
            <BluetoothCard
              title="No Bluetooth LE Available"
              subtitle="This device does not support Bluetooth LE"
              text="The Cordova plugin for Bluetooth LE support is missing"
              button=""
            />}
          {isBtAvailable &&
            !isBtEnabled &&
            <BluetoothCard
              title="Enable Bluetooth"
              subtitle="Bluetooth LE is required to use TBS RaceTrackers"
              text="Enable Bluetooth by clicking the button below"
              button="enable"
            />}
          {isBtAvailable && isBtEnabled && <this.rtDiscoveryList />}
        </main>
        <footer>
          {isBtAvailable && isBtEnabled && <this.btScanButton />}
        </footer>
        <Snackbar open={!!btError} message={btError} autoHideDuration={5000} />
      </div>
    );
  }
}
