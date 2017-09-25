// @flow
import React, { Component } from 'react';

import './tracker-home.css';
import { AppBar, Divider, FlatButton } from 'material-ui';
import { Snackbar } from 'material-ui';

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
    startBtStateNotifications: Function,
    startBtDeviceScan: Function,
    stopBtDeviceScan: Function,
    refreshRtList: Function
  };

  componentWillMount() {
    if (!this.props.isBtAvailable) {
      this.props.checkIsBtAvailable();
    } else {
      if (this.props.trackers.length === 0) {
        this.startDiscovery();
      }
    }
  }

  /** Watch bluetooth state properties for changes */
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.connectedTrackers.length !== this.props.connectedTrackers.length) {
      console.log('-------------------');
      console.log(prevProps.connectedTrackers);
      console.log(this.props.connectedTrackers);
    }
    if (prevProps.isBtAvailable !== this.props.isBtAvailable) {
      if (this.props.isBtAvailable) {
        // TODO: currently this is never stopped, find a good spot to halt notifications
        this.props.startBtStateNotifications();
      }
    }
    if (prevProps.isBtEnabled !== this.props.isBtEnabled) {
      if (this.props.isBtEnabled) {
        if (this.props.trackers.length === 0) {
          this.startDiscovery();
        }
      }
    }
  }

  /** Start racetracker discovery if possible */
  startDiscovery = () => {
    if (!this.props.isBtEnabled) {
      this.props.checkIsBtEnabled(); // check/update bluetooth enabled
    } else {
      if (!this.props.isBtScanning) {
        // prevent scanning if already running
        this.props.refreshRtList(); // remove any unpaired devices from prev scan
        this.props.startBtDeviceScan(); // begin bluetooth discovery scan
      }
    }
  };

  /** change button purpose: start/stop scan based on scanning state */
  BtScanButton = () => {
    let { isBtScanning, ...attrs } = this.props;
    attrs = {
      className: 'right'
    };
    if (isBtScanning) {
      attrs = {
        ...attrs,
        onClick: this.props.stopBtDeviceScan,
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
  RtDiscoveryList = () => {
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
          {isBtAvailable && isBtEnabled && <this.RtDiscoveryList />}
        </main>
        <footer>
          {isBtAvailable && isBtEnabled && <this.BtScanButton />}
        </footer>
        <Snackbar open={!!btError} message={btError} autoHideDuration={5000} />
      </div>
    );
  }
}
