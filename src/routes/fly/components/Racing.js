// @flow
import React, { Component} from 'react';

import _ from 'lodash';
import { List, ListItem } from 'material-ui';

import Heat from '../containers/HeatContainer';
import Stopwatch from '../containers/StopwatchContainer';
import RacetrackerCard from '../containers/RacetrackerCardContainer';

export default class Racing extends Component {
  props: {
    connectedTrackers: Array<RaceTracker>,
  };

  componentDidMount() {
    if (!this.props.isRaceActive) {
      if (this.props.connectedTrackers.length === 1) {
        this.props.createRace(this.props.connectedTrackers[0].id);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isRaceActive) {
      if (this.props.connectedTrackers.length !== nextProps.connectedTrackers.length) {
        if (nextProps.connectedTrackers.length === 1) {
          this.props.createRace(this.props.connectedTrackers[0].id);
        }
      }
    }
  }

  raceInterface = () => {
    return (
      <div>
        <Stopwatch />
        <List className="heat-list">
          {_.range(1, 5).map(i =>
            <ListItem key={i} className="small-screen" disabled primaryText={<Heat {...this.props} id={i} />} />
          )}
        </List>
      </div>
    );
  };

  handleListClick = (event: object) => {
    this.props.createRace(event.id);
  }

  render() {
    let { isRaceActive, connectedTrackers } = this.props;
    return (
      <div>
        {isRaceActive && <this.raceInterface />}
        {!isRaceActive && connectedTrackers.length > 1 ?
          <RacetrackerCard
            title="Multi-tracker racing is not yet supported"
            subtitle="Select the Racetracker you want to use for racing"
            button=""
            text={
            <List>
              {connectedTrackers.map(tracker =>
                <ListItem primaryText={tracker.name} id={tracker.id}
                  onClick={this.handleListClick.bind(this, tracker)}/>)}
            </List>
          }/> : null }
        {!isRaceActive && connectedTrackers.length === 0 ?
          <RacetrackerCard
            title="Racetracker connection required"
            subtitle="Race mode requires the connection of a TBS Racetracker"
            text="Click below to discover, connect, and configure Racetrackers"
            button="Racetracker Management"
          /> : null}
      </div>
    );
  }
}
