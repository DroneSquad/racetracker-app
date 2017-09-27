import React from 'react';
// import { List, ListItem, FontIcon, Divider } from 'material-ui';

import Setting from './Setting';
// import FrequencySetting from './FrequencySetting';
// import { toPercent, batteryLevelIcon } from '../../../../utils';

export default class DeviceSettings extends Setting {

  constructor(props) {
    super(props);
    console.log("constructor called");
    console.log(props);
    // go and fetch updated properties from the RaceTracker
    // this.props.getBatteryLevel(this.props.device_id);

      /*setTimeout(() => {
        this.doneLoading();
        this.setState({
          name: this.props.bluetooth.name,
          firmware: '1.56',
          batteryLevel: this.props.bluetooth.battery,
          bluetoothLevel: this.props.bluetooth.single
        });
      }, Math.random() * 1000 + 500); // todo trigger after we fetch the settings from the device*/
  }

  componentDidMount() {
    console.log("componentDidMount");
    // in here we need to check the state of the props and set done after complete
    // this.props.getBatteryLevel(this.props.device_id);
 }

 componentWillMount() {
   console.log("componentWillMount");
  /* if (!this.props.isBtAvailable) {
     this.props.checkIsBtAvailable();
   } else {
     if (this.props.trackers.length === 0) {
       this.startDiscovery();
     }
   }*/
 }
 componentWillReceiveProps(nextProps) {
   console.log("componentWillReceiveProps");
   console.log(nextProps);
  /*if (nextProps.forPerson !== this.props.forPerson) {
    this.props.dispatch(
      makeASandwichWithSecretSauce(nextProps.forPerson)
    );
  }*/
}


/*  constructor(props) {
    super(props);
    setTimeout(() => {
      this.doneLoading();
      this.setState({
        name: this.props.bluetooth.name,
        firmware: '1.56',
        batteryLevel: this.props.bluetooth.battery,
        bluetoothLevel: this.props.bluetooth.single
      });
    }, Math.random() * 1000 + 500); // todo trigger after we fetch the settings from the device
  }*/

  /*componentDidMount() {
    this.lazyLoad = lazyLoad(document.getElementById(this.uuid), () => {
      api.public
        .pilot(this.props.id)
        .then(pilot =>
          this.setState({
            name: pilot.callsign || pilot.display || 'No Pilot Name',
            loading: false
          })
        )
        .catch(() => this.setState({ loading: false }));
    });
  }*/


  render() {
    console.log("render called");
    console.log(this.props);
    console.log(this.state);
    /* let batteryLevel = (
      <span className="bar-item">
        {toPercent(this.state.batteryLevel)}
      </span>
    );
    let bluetoothLevel = (
      <span className="bar-item">
        {toPercent(this.state.bluetoothLevel)}
      </span>
    ); */
    return (
      <div className={this.isLoadingClass()}>
        <h2 className="ds-blue-text bar-item">
          {this.state.name || 'Undefined'}
        </h2>
        <h6 className="no-margin bar-item">
          Firmware {this.state.firmware || '0.0'}
        </h6>
      </div>
    );
  }
}

/*
<div className={this.isLoadingClass()}>
  <h2 className="ds-blue-text bar-item">
    {this.state.name || 'Undefined'}
  </h2>
  <h6 className="no-margin bar-item">
    Firmware {this.state.firmware || '0.0'}
  </h6>
  <List>
    <ListItem
      disabled
      primaryText="Battery Level"
      leftIcon={<FontIcon className={batteryLevelIcon(this.state.batteryLevel)} />}
      rightIcon={batteryLevel}
    />
    <Divider />
    <ListItem
      disabled
      primaryText="Bluetooth Single Strength"
      leftIcon={<FontIcon className="mdi mdi-bluetooth" />}
      rightIcon={bluetoothLevel}
    />
    <Divider />
    <FrequencySetting history={this.props.history} />
  </List>
</div>
*/
