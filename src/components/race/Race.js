import React from 'react';

import {
  AppBar,
  Tabs,
  Tab,
  IconMenu,
  MenuItem,
  FontIcon,
} from 'material-ui';

import RaceHeats from './RaceHeats';

import './race.css';

/** This will display tabs for each section for tab, they keep their state across tabs */
export default class Race extends React.Component {

  /** The drop down menu for the options menu */
  menuDropdown = () => {
    return (
      <IconMenu iconButtonElement={<FontIcon style={{paddingTop: '8px'}} className="ds-white-text mdi mdi-dots-vertical" />}>
        <MenuItem primaryText="RaceTracker Settings" onTouchTap={() => this.props.history.push('/tracker')} />
      </IconMenu>
    );
  };

  render() {
    return (
      <div className="race">
        <header>
          <AppBar title="Race" iconElementRight={this.menuDropdown()} />
        </header>
        <main>
          <Tabs initialSelectedIndex={1}>
            <Tab label="Racing" >

            </Tab>
            <Tab label="Heats" >
              <RaceHeats {...this.props}/>
            </Tab>
            <Tab label="Leaders">

            </Tab>
          </Tabs>
        </main>
      </div>
    )
  }
}
