// @flow
import React, { Component } from 'react';
import { List, ListItem } from 'material-ui';

import Heat from '../containers/HeatContainer';
import Stopwatch from '../containers/StopwatchContainer';
import RacetrackerCard from '../containers/RacetrackerCardContainer';

export default class Racing extends Component {
  props: {
    connectedTrackers: Array<RaceTracker>,
    isRaceActive: boolean,
    activeTrackerId: string
  };

  componentDidMount() {
    if (!this.props.isRaceActive) {
      if (this.props.connectedTrackers.length === 1) {
        this.createRace();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isRaceActive) {
      if (this.props.connectedTrackers.length !== nextProps.connectedTrackers.length) {
        if (nextProps.connectedTrackers.length === 1) {
          this.createRace();
        }
      }
    }
  }

  // TODO: enhance for multitracker support
  createRace() {
    this.props.createRace({
      trackerId: this.props.connectedTrackers[0].id,
      racerChannels: this.props.connectedTrackers[0].racerChannels,
      raceMode: this.props.connectedTrackers[0].raceMode
    });
  }

  raceInterface = () => {
    return <Stopwatch />;
  };

  heatList = () => {
    let { heats } = this.props;
    return (
      <List className="heat-list">
        {heats.map(heat =>
          <ListItem key={heat.id} className="small-screen" disabled primaryText={<Heat {...heat} id={heat.id} />} />
        )}
      </List>
    );
  };

  handleListClick = (event: RaceTracker) => {
    this.props.createRace(event.id);
  };

  render() {
    let { isRaceActive, connectedTrackers } = this.props;
    return (
      <div>
        {isRaceActive && <this.raceInterface />}
        {isRaceActive && <this.heatList />}
        {!isRaceActive && connectedTrackers.length > 1
          ? <RacetrackerCard
              title="Multi-tracker racing is not yet supported"
              subtitle="Select the Racetracker you want to use for racing"
              button=""
              text={
                <List>
                  {connectedTrackers.map(tracker =>
                    <ListItem
                      primaryText={tracker.name}
                      id={tracker.id}
                      onClick={this.handleListClick.bind(this, tracker)}
                    />
                  )}
                </List>
              }
            />
          : null}
        {!isRaceActive && connectedTrackers.length === 0
          ? <RacetrackerCard
              title="Racetracker connection required"
              subtitle="Race mode requires the connection of a TBS Racetracker"
              text="Click below to discover, connect, and configure Racetrackers"
              button="Racetracker Management"
            />
          : null}
      </div>
    );
  }
}
