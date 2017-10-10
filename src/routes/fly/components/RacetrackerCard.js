import React, { Component } from 'react';

import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class RacetrackerCard extends Component {
  props: {
    title: string,
    subtitle: string,
    text: string,
    button: boolean,
    goToTrackerHome: Function
  };

  render() {
    return (
      <Card>
        <CardTitle title={this.props.title} subtitle={this.props.subtitle} />
        <CardText>
          {this.props.text}
        </CardText>
        <CardActions>
          {!!this.props.button && <FlatButton label={this.props.button} onClick={() => this.props.goToTrackerHome()}/>}
        </CardActions>
      </Card>
    );
  }
}
