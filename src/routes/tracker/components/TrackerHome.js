// @flow
import React, { Component } from 'react';

import './tracker-home.css';
import { Snackbar } from 'material-ui';
import { AppBar, Divider, FlatButton } from 'material-ui';

import { historyBackButton } from '../../../utils';

import BluetoothCardContainer from '../containers/BluetoothCardContainer';
import TrackerListContainer from   '../containers/TrackerListContainer';

class TrackerHome extends Component {
  props: {
    message: string,
    error: null,
    isBtAvailable: boolean,
    isBtEnabled: boolean,
    isBtScanning: boolean,
    checkIsBtAvailable: Function,
    checkIsBtEnabled: Function,
    enableBt: Function,
    startBtStateNotifications: Function,
    stopBtStateNotifications: Function,
    startBtDeviceScan: Function,
    stopBtDeviceScan: Function,
    clearUnpairedRaceTrackers: Function
  };

  componentWillMount() {
    if (!this.props.isBtAvailable){  // by default
      this.props.checkIsBtAvailable(); // check and update accordingly
    } else { // bluetooth is available (rehydration)
      this.startDiscovery();  // run device discovery
    }
  }

  componentWillUnmount() {
    // stop state notifications if activated
    if (this.props.isBtAvailable){
      this.props.stopBtStateNotifications();
    }
  }

  /** Watch state.properties for changes on bluetooth enabled state */
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isBtAvailable !== this.props.isBtAvailable) {
      if (this.props.isBtAvailable) {
        this.props.startBtStateNotifications();
      }
    }
    if (prevProps.isBtEnabled !== this.props.isBtEnabled) {
      if (this.props.isBtEnabled) {
        this.startDiscovery();
      }
    }
  }

  /** Start tracker discovery if possible */
  startDiscovery = () => {
    if (!this.props.isBtEnabled){  // default
      this.props.checkIsBtEnabled();  // verify the above is correct
    } else {  // bluetooth is enabled, start bluetooth scan
      this.props.clearUnpairedRaceTrackers();  // remove any unpaired devices from a prev scan
      this.props.startBtDeviceScan(); // actively scan for bluetooth devices
    }
  };

  handleSnackBarTap = (event: Object) => {
    this.props.enableBt();
  };

  BtScanButton = () => {
    let { isBtScanning, ...attrs } = this.props
    attrs = {
      className: "right"
    }
    if (isBtScanning) {
      attrs = {
        ...attrs,
        onClick: this.props.stopBtDeviceScan,
        label: 'stop'
      }
    } else {
      attrs = {
        ...attrs,
        onClick: this.startDiscovery,
        label: 'rescan'
      }
    }
    return (
      <FlatButton primary {...attrs} />
    )
  }

  BtSnackBar = () => {
    // TODO: handle ios/android diffs for enabling bluetooth use window.device.platform to find platform
    let { isBtEnabled, isBtAvailable, message, ...attrs } = this.props
    attrs = {
      open: !!message,
      message: message,
      autoHideDuration: 5000,
    }
    if (isBtAvailable && !isBtEnabled) {
      attrs = {
        ...attrs,
        action: 'ENABLE',
        onTouchTap: this.handleSnackBarTap
      }
    }
    return (
      <Snackbar {...attrs} />
    )
  }

  RtDiscoveryList = () => {
    return (
      <div>
        <TrackerListContainer
          history={this.props.history}
          filter="SHOW_CONNECTED"
          headerText="Connected RaceTrackers"
          emptyText="No connected race trackers"
        />
        <Divider />
        <TrackerListContainer
          history={this.props.history}
          filter="SHOW_AVAILABLE"
          headerText="Available RaceTrackers"
          emptyText="No available race trackers"
        />
      </div>
    )
  }

  render() {
    let { isBtEnabled, isBtAvailable } = this.props
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
          {!isBtAvailable && <BluetoothCardContainer
            title="No Bluetooth Available"
            subtitle="This device does not support BluetoothLE"
            text="Cordova Bluetooth is not available"
            button='' />}
          {isBtAvailable && !isBtEnabled && <BluetoothCardContainer
            title="Enable Bluetooth"
            subtitle="Bluetooth is required to use TBS RaceTrackers"
            text="Enable Bluetooth by clicking the button below"
            button='ENABLE' />}
          {isBtAvailable && isBtEnabled && <this.RtDiscoveryList />}
        </main>
        <footer>
          {isBtAvailable && isBtEnabled && <this.BtScanButton />}
        </footer>
        <this.BtSnackBar/>
      </div>
    );
  }
}

export default TrackerHome;
