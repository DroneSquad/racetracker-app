import React, { Component } from 'react';

import { AppBar, Tabs, Tab, IconMenu, MenuItem, FontIcon, IconButton } from 'material-ui';

// import RaceHeats from './RaceHeats';
import Racing from './Racing';

import './fly.css';

// TODO: these do not seem to keep their state across tabs?
/** This will display tabs for each section for tab, they keep their state across tabs */
export default class Race extends Component {
  props: {
    selectedTab: string;
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedTab : 'race',
    };
  }

  /** The drop down menu for the options menu */
  menuDropdown = () => {
    let icon = (
      <IconButton>
        <FontIcon style={{ paddingTop: '8px' }} className="ds-white-text mdi mdi-dots-vertical" />
      </IconButton>
    );
    return (
      <IconMenu iconButtonElement={icon}>
        <MenuItem primaryText="RaceTracker Settings" onTouchTap={() => this.props.history.push('/tracker')} />
      </IconMenu>
    );
  };

  handleTabChange = (value) => {
    this.setState({
      selectedTab: value,
    });
  };

  render() {
    return (
      <div className="fly">
        <header>
          <AppBar title="Fly" iconElementRight={this.menuDropdown()} />
        </header>
        <main>
          <Tabs value={this.state.selectedTab} onChange={this.handleTabChange}>
            <Tab value="race" label="Racing">
              <Racing history={this.props.history} />
            </Tab>
            <Tab value="heats" label="Heats">
              {/*<RaceHeats history={this.props.history} />*/}
              <div className="center-text">Heats Tab Temp Disabled</div>
            </Tab>
            <Tab value="stats" label="Stats" />
          </Tabs>
        </main>
      </div>
    );
  }
}
