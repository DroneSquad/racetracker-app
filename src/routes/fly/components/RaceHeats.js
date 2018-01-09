import React, { Component } from 'react';

import _ from 'lodash';

import { Card, CardTitle, CardText, List, ListItem } from 'material-ui';

import HeatResults from './HeatResults';

/** The basic component for displaying the fly heats */
export default class RaceHeats extends Component {
  render() {
    let card = (
      <Card style={{ margin: '8px', padding: '16px', color: '#666' }}>
        <CardTitle title="No Past Laps Found" />
        <CardText>Go fly some laps, there are none here.</CardText>
      </Card>
    );
    return (
      <div>
        <List className="heat-list">
          {this.props.heats &&
            _.map(this.props.heats, heat =>
              <ListItem
                className="small-screen"
                disabled
                primaryText={<HeatResults id={heat.id} number={heat.number} racerChannels={heat.racerChannels} />}
              />
            )}
          {_.size(this.props.heats) == 0 && <ListItem className="small-screen" disabled primaryText={card} />}
        </List>
      </div>
    );
  }
}
