import React from 'react';

import { AppBar, Tabs, Tab, IconMenu, MenuItem, FontIcon, IconButton } from 'material-ui';

import RaceHeats from './RaceHeats';
import Racing from './Racing';

import './fly.css';

/** This will display tabs for each section for tab, they keep their state across tabs */
export default class Race extends React.Component {
  /** The drop down menu for the options menu */
  menuDropdown = () => {
    let icon = (
      <IconButton>
        <FontIcon style={{ paddingTop: '8px' }} className="ds-white-text mdi mdi-dots-vertical" />
      </IconButton>
    );
    return (
      <IconMenu iconButtonElement={icon}>
        <MenuItem
          primaryText="RaceTracker Settings"
          onTouchTap={() => this.props.history.push('/tracker')}
        />
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
          <Tabs initialSelectedIndex={1}>
            <Tab label="Racing">
              <Racing history={this.props.history} />
            </Tab>
            <Tab label="Heats">
              <RaceHeats history={this.props.history} />
            </Tab>
            <Tab label="Stats" />
          </Tabs>
        </main>
      </div>
    );
  }
}
