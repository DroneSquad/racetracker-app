// @flow
import React, { Component } from 'react';
import { List, ListItem } from 'material-ui';

import Heat from '../containers/HeatContainer';
import Stopwatch from '../containers/StopwatchContainer';
import RacetrackerCard from '../containers/RacetrackerCardContainer';

export default class Racing extends Component {
  props: {
    isRaceActive: boolean,
    isRaceValid: boolean,
    connectedTrackers: Array<RaceTracker>,
  };

  componentDidMount() {
    console.log("Racing-componentDidMount")
    // no previous race exists, create a new race with the connected tracker
    if (!this.props.isRaceActive && this.props.connectedTrackers.length === 1) {
      this.createRace(this.props.connectedTrackers[0]);
    }
    // a previous race was setup, validate it or reset as needed
    // if (this.props.isRaceActive && !this.props.isRaceValid) {
    //  console.log("attenot a race validation")
    /*  if (this.props.connectedTrackers) {
        if (this.props.connectedTrackers.length === 1) {
          if (this.props.connectedTrackers[0].racerChannels) {
            if (this.props.connectedTrackers[0].racerChannels.length !== 0) {
              this.createRace(this.props.connectedTrackers[0]);
            }
          }
        }
      } */

  //   }
  }

  // check here if race exists already check heat?
  componentWillReceiveProps(nextProps) {
    console.log("Racing-componentWillReceiveProps")
    if (!nextProps.isRaceActive && nextProps.connectedTrackers.length === 1) {
      this.createRace(nextProps.connectedTrackers[0]);
    }




    /*if (!this.props.isRaceActive) {
      if (this.props.connectedTrackers) {
        if (this.props.connectedTrackers.length === 1) {
          if (this.props.connectedTrackers[0].racerChannels) {
            if (
              this.props.connectedTrackers[0].racerChannels.length !==
              nextProps.connectedTrackers[0].racerChannels.length
            ) {
              if (nextProps.connectedTrackers[0].racerChannels.length !== 0) {
                this.createRace(nextProps.connectedTrackers[0]);
              }
            }
          }
        }
      }
    } else {
      if (nextProps.trackerRaceMode !== this.props.activeRaceMode) {
        this.props.updateRaceMode(nextProps.trackerRaceMode);
      }
    }*/
  }

  /** Validate that the device exists on the internal bluetooth scan list */
  validateTrackers = () => {
    if (!this.props.isBtScanning) {
      let aTracker = this.props.connectedTrackers.filter(t => t.id === this.props.activeTrackerId);
      this.props.validateTrackers(aTracker);
    }
  };

  createRace(tracker) {
    this.props.createRace(tracker);
  }

  heatInterface = () => {
    return <Stopwatch />;
  };

  heatList = () => {
    let { activeHeatId } = this.props;
    return (
      <List className="heat-list">
        <ListItem key={activeHeatId} className="small-screen" disabled primaryText={<Heat id={activeHeatId} />} />
      </List>
    );
  };

  handleListClick = (event: RaceTracker) => {
    this.props.createRace([event]);
  };

  render() {
    console.log("Racing-Render")
    console.log(this.props.theState);
    let { isRaceActive, activeHeatId, connectedTrackers } = this.props;
    return (
      <div>
        {isRaceActive && activeHeatId && <this.heatInterface />}
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
