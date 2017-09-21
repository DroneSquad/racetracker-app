// @flow

import React, { Component } from 'react';

import { Snackbar } from 'material-ui';

import { AppBar, Divider, FlatButton } from 'material-ui';
import { historyBackButton } from '../../../utils';
import './tracker-home.css';

import BluetoothCardContainer from '../containers/BluetoothCardContainer';
import TrackerListContainer from   '../containers/TrackerListContainer';

class TrackerHome extends Component {
  props: {
    message: string,
    error: null,
    isBtAvailable: boolean,
    isBtEnabled: boolean,
    checkIsBtAvailable: Function,
    checkIsBtEnabled: Function,
    enableBt: Function
  };

  componentWillMount() {
    this.startDiscovery();
  }

  /** Watch state.properties for changes on bluetooth enabled state */
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isBtAvailable !== this.props.isBtAvailable) {
      if (this.props.isBtAvailable) {
        console.log("componentDidUpdate.isBtAvailable");
        this.startDiscovery();
      }
    }
    if (prevProps.isBtEnabled !== this.props.isBtEnabled) {
      if (this.props.isBtEnabled) {
        console.log("componentDidUpdate.isBtEnabled");
        this.startDiscovery();
      }
    }
  }

  /** Start tracker discovery if possible */
  startDiscovery = () => {
    if (!this.props.isBtAvailable){  // currently no bluetooth is available
      console.log("x");
      this.props.checkIsBtAvailable(); // verify the above is correct
    } else { // bluetooth is available
      console.log("z");
      if (!this.props.isBtEnabled){  // currently bluetooth is not enabled
        this.props.checkIsBtEnabled();  // verify the above is correct
      } else {  // bluetooth is enabled

        // perform our scan here
        console.log("bluetooth enabled, perform scan now");
        /*if ('ble' in window) {
          this.props.clearUnpaired();
          this.props.handleBtIsScanning(true);
          window.ble.startScan([], this.props.deviceFound, function() {
            console.log('Bluetooth device discovery failed!'); // TODO: handle failure correctly
          });
          setTimeout(() => this.stopDiscovery(), 5000); // TODO: make timeout variable?
        } else {
          this.props.deviceFound({ id: 'id', name: `TBSRT Blue Gull`, rssi: 0.6 });
          this.stopDiscovery();
        }*/
      }
    }
  };

  handleSnackBarTap = (event: Object) => {
    this.props.enableBt();
  };

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
          {!isBtAvailable && <BluetoothCardContainer title="No Bluetooth Available" subtitle="This device does not support BluetoothLE" text="Cordova Bluetooth is not available" button='' />}
          {isBtAvailable && !isBtEnabled && <BluetoothCardContainer title="Enable Bluetooth" subtitle="Bluetooth is required to use TBS RaceTrackers" text="Enable Bluetooth by clicking the button below" button='ENABLE' />}
          {isBtAvailable && isBtEnabled && <this.RtDiscoveryList />}
        </main>
        <footer>
          {isBtAvailable && isBtEnabled && <FlatButton primary label="rescan" className="right" onClick={this.startDiscovery} />}
        </footer>
        <this.BtSnackBar/>
      </div>
    );
  }
}

export default TrackerHome;
