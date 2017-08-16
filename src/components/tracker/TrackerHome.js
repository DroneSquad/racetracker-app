import React from 'react';
import _ from 'lodash';

import {
  AppBar,
  IconButton,
  List,
  Divider,
  Subheader,
  FlatButton,
  ListItem,
  FontIcon,
} from 'material-ui';

import loadingImg from '../../media/ds-logo-spin.svg';
import TrackerDevice from './TrackerDevice';

import './tracker-home.css';

/** Test component to view the other views */
export default class TrackerHome extends React.Component {

  constructor(props) {
    super(props);
    this.rescan = this.rescan.bind(this);
    this.connect = this.connect.bind(this);
    this.openSettings = this.openSettings.bind(this);
    this.state = {
      paired: []
    };
  }

  componentWillMount() {
    this.rescan(); // Scan for new devices when the component mounts
  }

  /** Create the item list from a device object, maps click events*/
  device(id = 0, device, paired) {
    let deviceLogo = <FontIcon className="mdi mdi-watch"/>;
    let deviceComponent = <TrackerDevice name={device.name} />; // todo pass what you need
    if (paired) {
      return <ListItem key={id} primaryText={deviceComponent} leftIcon={deviceLogo} rightIcon={<FontIcon className="mdi mdi-settings"/>} onClick={() => this.openSettings(device)}/>
    }
    return <ListItem key={id} primaryText={deviceComponent} leftIcon={deviceLogo} onClick={() => this.connect(device)}/>
  }

  /** Maps the paired devices to the view components */
  pairedDevices() {
    let { paired } = this.state;
    if (_.size(paired) > 0) {
      return _.map(paired, (device, id) => device && this.device(id, device, true));
    }
    return <ListItem disabled primaryText={<span>No paired race trackers</span>}/>;
  }

  /** Maps the available devices to the view components */
  availableDevices() {
    let { available } = this.state;
    if (_.size(available) > 0) {
      return _.map(available, (device, id) => device && this.device(id, device));
    }
    return <ListItem disabled primaryText={<span>No available race trackers</span>}/>;
  }

  /** Rescan the bluetooth devices */
  rescan() {
    console.log('rescanning');
    this.setState({ available: null });
    // todo call action, replace the faked state
    setTimeout(() => {
      this.setState({
        available: [
          {
            name: 'IvoryMarten',
            frequency: 'F8',
            single: .82,
            battery: .99,
          },
          {
            name: 'WhiteGoat',
            frequency: 'F2',
            single: .76,
            battery: .97,
          },
          (() => {
            if (Math.random() > .5) {
              return {
                name: 'BlueGull',
                frequency: 'F4',
                single: .78,
                battery: .89,
              };
            }
          })()
        ],
      });
    }, Math.random() * 1000 + 1000);
  }

  /** Open the settings view with the selected device */
  openSettings(device) {
    console.log('opening settings');
    console.log(device);
    this.props.history.push('/tracker/settings');
  }

  /** Connect to the current device */
  connect(device) {
    console.log('connecting');
    console.log(device);
    this.setState(state => { // todo better handle things with actions
      state.paired.push(device);
      state.available.splice(state.available.indexOf(device), 1);
    })
  }

  render() {
    let { paired, available } = this.state;
    let loadingComponent = <ListItem className="center-text" disabled primaryText={<img src={loadingImg} className="scanning" alt="Loading..."/>}/>;
    return (
      <div className="main tracker-home">
        <header>
          <AppBar title="RaceTracker" iconElementLeft={<IconButton />}/>
        </header>
        <main>
          <List>
            <Subheader className="ds-blue-text">Paired devices</Subheader>
            {(paired && this.pairedDevices()) || loadingComponent}
          </List>
          <Divider />
          <List>
            <Subheader className="ds-blue-text">Available devices</Subheader>
            {(available && this.availableDevices()) || loadingComponent}
          </List>
        </main>
        <footer>
          <FlatButton primary label="rescan" className="right" onClick={this.rescan}/>
        </footer>
      </div>
    );
  }
}
