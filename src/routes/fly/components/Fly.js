import React, { Component } from 'react';

import { AppBar, Tabs, Tab, IconMenu, MenuItem, FontIcon, IconButton } from 'material-ui';

import RaceHeats from './RaceHeats';
import Racing from '../containers/RacingContainer';

import './fly.css';

// TODO: state does not appear to be managed across tabs ..? investigate and fix

export default class Race extends Component {
  props: {
    goToTrackerHome: Function
  };

  menuDropdown = () => {
    let icon = (
      <IconButton>
        <FontIcon style={{ paddingTop: '8px' }} className="ds-white-text mdi mdi-dots-vertical" />
      </IconButton>
    );
    return (
      <IconMenu iconButtonElement={icon}>
        <MenuItem primaryText="RaceTracker Management" onTouchTap={() => this.props.goToTrackerHome()} />
      </IconMenu>
    );
  };

  render() {
    return (
      <div className="fly">
        <header>
          <AppBar title="Fly" iconElementRight={this.menuDropdown()} />
        </header>
        <main>
          <Tabs initialSelectedIndex={0}>
            <Tab label="Racing">
              <Racing history={this.props.history} />
            </Tab>
            <Tab label="Heats">
              <RaceHeats history={this.props.history} />
              {/*<div className="center-text">Heats Tab Currently Disabled</div>*/}
            </Tab>
            <Tab label="Stats" />
          </Tabs>
        </main>
      </div>
    );
  }
}
