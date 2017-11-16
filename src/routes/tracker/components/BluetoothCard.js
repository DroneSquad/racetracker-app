import React, { Component } from 'react';

import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class BluetoothCard extends Component {
  props: {
    title: string,
    subtitle: string,
    text: string,
    button: boolean,
    enableBt: Function
  };

  handleButtonClick = (event: Object) => {
    this.props.enableBt();
  };

  render() {
    // TODO: handle ios/android diffs for enabling bluetooth use window.device.platform to find type
    return (
      <Card style={{ margin: '8px', padding: '16px', color: '#666' }}>
        <CardTitle title={this.props.title} subtitle={this.props.subtitle} />
        <CardText>
          {this.props.text}
        </CardText>
        <CardActions>
          {!!this.props.button && <FlatButton label={this.props.button} onClick={this.handleButtonClick} />}
        </CardActions>
      </Card>
    );
  }
}
