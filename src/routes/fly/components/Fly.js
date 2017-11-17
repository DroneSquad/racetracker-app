import React, { Component } from 'react';

import { Card, CardTitle, CardText, Tabs, Tab, IconMenu, MenuItem, FontIcon, IconButton } from 'material-ui';

// import RaceHeats from './RaceHeats';
import DroneSquadAppBar from '../../../global/app/containers/DroneSquadAppBarContainer';
import Racing from '../containers/RacingContainer';

import './fly.css';

// TODO: state does not appear to be managed across tabs ..? investigate and fix
export default class Race extends Component {
  props: {
    goToTrackerHome: Function
  };

  /** The drop down menu when there are more to do on the tracker */
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

  /** Fast tracker icon to go right to the tracker menu */
  tracker = () => (
    <IconButton iconClassName="mdi mdi-timer" onTouchTap={() => this.props.goToTrackerHome()} />
  );

  render() {
    let card = (
    <Card style={{ margin: '8px', padding: '16px', color: '#666' }}>
      <CardTitle title="Coming Soon" />
      <CardText>Previous heats will be listed here.</CardText>
    </Card>
    );
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
              {/*<RaceHeats history={this.props.history} />*/}
              {card}
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
