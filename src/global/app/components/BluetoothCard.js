import React, { Component } from 'react';

import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class BluetoothCard extends Component {
  props: {
    title: string,
    subtitle: string,
    text: string,
    button: boolean,
    show: boolean,
    enableBt: Function
  };

  constructor(props) {
    super(props);
    if (!this.props.isBtAvailable) {
      this.state = {
        title: 'No Bluetooth LE Available',
        subtitle: 'This device does not support Bluetooth LE',
        text: 'The Cordova plugin for Bluetooth LE support was not found',
        button: '',
        show: true
      };
    } else if (!this.props.isBtEnabled) {
      this.state = {
        title: 'Enable Bluetooth',
        subtitle: 'Bluetooth LE is required to use TBS RaceTrackers',
        text: 'Enable Bluetooth to continue',
        button: 'enable',
        show: true
      };
    } else {
      this.state = {
        title: '',
        subtitle: '',
        text: '',
        button: '',
        show: false
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isBtEnabled !== this.props.isBtEnabled) {
      if (nextProps.isBtEnabled) {
        this.setState({
          title: '',
          subtitle: '',
          text: '',
          button: '',
          show: false
        });
      } else {
        this.setState({
          title: 'Enable Bluetooth',
          subtitle: 'Bluetooth LE is required to use TBS RaceTrackers',
          text: 'Enable Bluetooth to continue',
          button: 'enable',
          show: true
        });
      }
    }
  }

  handleButtonClick = (event: Object) => {
    this.props.enableBt();
  };

  render() {
    let isAndroid = window.cordova.platformId === 'android';
    if (this.state.show) {
      return (
        <Card style={{ margin: '8px', padding: '16px', color: '#666' }}>
          <CardTitle title={this.state.title} subtitle={this.state.subtitle} />
          <CardText>
            {isAndroid && this.state.text}
          </CardText>
          <CardActions>
            {isAndroid &&
              !!this.state.button &&
              <FlatButton label={this.state.button} onClick={this.handleButtonClick} />}
          </CardActions>
        </Card>
      );
    } else {
      return null;
    }
  }
}
