// @flow
import React, { Component} from 'react';
import { List, ListItem } from 'material-ui';

import Heat from '../containers/HeatContainer';
import Stopwatch from '../containers/StopwatchContainer';
import RacetrackerCard from '../containers/RacetrackerCardContainer';

export default class Racing extends Component {
  props: {
    connectedTrackers: Array<RaceTracker>,
    isRaceActive: boolean,
    activeTrackerId: string,
  };

  componentDidMount() {
    if (!this.props.isRaceActive) {
      if (this.props.connectedTrackers.length === 1) {
        this.createRace();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    // TODO: update for multitracker support
    if (!this.props.isRaceActive) {
      if (this.props.connectedTrackers.length !== nextProps.connectedTrackers.length) {
        if (nextProps.connectedTrackers.length === 1) {
          this.createRace();
        }
      }
    }
  }

  // TODO: enhance for multitracker support and additional parameters
  createRace() {
    this.props.createRace({
      trackerId: this.props.connectedTrackers[0].id,
      racerChannels: this.props.connectedTrackers[0].racerChannels,
      raceMode: this.props.connectedTrackers[0].raceMode,
    });
  }

/** displays all connected/available racetrackers */
/*rtDiscoveryList = () => {
  return (
    <div>
      <TrackerList
        history={this.props.history}
        filter="SHOW_CONNECTED"
        headerText="Connected RaceTrackers"
        emptyText="No connected race trackers"
      />
      <Divider />
      <TrackerList
        history={this.props.history}
        filter="SHOW_AVAILABLE"
        headerText="Available RaceTrackers"
        emptyText="No available race trackers"
      />
    </div>
  );
};*/



  raceInterface = () => {
    return (
        <Stopwatch />
    );
  };

  heatList = () => {
    let { heats } = this.props;
    console.log(heats);
    return (
      <List className="heat-list">
        {heats.map(heat =>
          <ListItem key={heat.id} className="small-screen" disabled
            primaryText={ <Heat {...this.props} id={heat.number} /> }
          />)}
      </List>
    );
  };

  handleListClick = (event: RaceTracker) => {
    this.props.createRace(event.id);
  }

  render() {
    let { isRaceActive, connectedTrackers } = this.props;
    return (
      <div>
        {isRaceActive && <this.raceInterface />}
        {isRaceActive && <this.heatList />}
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

/*
          { heats.map(heat =>
            <ListItem key={heat.id} className="small-screen" disabled primaryText={ <Heat {...this.props} id={heat.id} />} />)}
*/
