import React, { Component } from 'react';

import { Tabs, Tab, IconMenu, MenuItem, FontIcon, IconButton } from 'material-ui';

import RaceHeats from '../containers/RaceHeatsContainer';
import DroneSquadAppBar from '../../../global/app/containers/DroneSquadAppBarContainer';
import Racing from '../containers/RacingContainer';

import './fly.css';

// TODO: state does not appear to be managed across tabs ..? investigate and fix
export default class Race extends Component {
  props: {
    goToTrackerHome: Function
  };

  /** Fast tracker icon to go right to the tracker menu */
  tracker = () => <IconButton iconClassName="mdi mdi-timer" onTouchTap={() => this.props.goToTrackerHome()} />;

  render() {
    return (
      <div className="fly">
        <header>
          <DroneSquadAppBar iconElementRight={this.tracker()} />
        </header>
        <main>
          <Tabs initialSelectedIndex={0}>
            <Tab label="Racing">
              <Racing history={this.props.history} />
            </Tab>
            <Tab label="Heats">
              <RaceHeats history={this.props.history} />
            </Tab>
            {/*<Tab label="Stats">*/}
            {/*{card}*/}
            {/*</Tab>*/}
          </Tabs>
        </main>
      </div>
    );
  }
}
