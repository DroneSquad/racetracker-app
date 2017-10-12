// @flow
import React, { Component } from 'react';
import { List, ListItem } from 'material-ui';

import Heat from '../containers/HeatContainer';
// import Stopwatch from '../containers/StopwatchContainer';
import RacetrackerCard from '../containers/RacetrackerCardContainer';

export default class Racing extends Component {
  props: {
    connectedTrackers: Array<RaceTracker>,
    isRaceActive: boolean
  };

  componentDidMount() {
    if (!this.props.isRaceActive) {
      if (this.props.connectedTrackers.length === 1) {
        console.log('componentDidMount-createRace');
        this.createRace(this.props.connectedTrackers[0]);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps-Racing');
    console.log(nextProps);
    if (!this.props.isRaceActive) {
      if (this.props.connectedTrackers.length !== nextProps.connectedTrackers.length) {
        if (nextProps.connectedTrackers.length === 1) {
          console.log('componentWillReceiveProps-createRace');
          this.createRace(this.props.connectedTrackers[0]);
        }
      }
    }
  }

  createRace(tracker) {
    // TODO: handle multitracker support
    console.log('-createRace-');
    console.log(tracker);
    this.props.createRace([tracker]);
  }

  raceInterface = () => {
    //        {isRaceActive && <this.raceInterface />}
    //  return <Stopwatch />;
  };

  heatList = () => {
    console.log('Racing.heatList-render');
    let { activeHeatId } = this.props;
    console.log(activeHeatId);
    return (
      <List className="heat-list">
        <ListItem key={activeHeatId} className="small-screen" disabled primaryText={<Heat id={activeHeatId} />} />
      </List>
    );
  };

  handleListClick = (event: RaceTracker) => {
    console.log('handleListClick-createRace');
    this.props.createRace(event);
  };

  render() {
    console.log('Racing.render');
    let { isRaceActive, activeHeatId, connectedTrackers } = this.props;
    console.log(isRaceActive);
    console.log(activeHeatId);
    return (
      <div>
        {isRaceActive && activeHeatId && <this.heatList />}
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
