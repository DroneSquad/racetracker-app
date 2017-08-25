import React from 'react';

import {
  Paper,
  List,
  ListItem,
} from 'material-ui';

import HeatBuilder from "./HeatBuilder";

/** The basic component for displaying the race heats */
export default class RaceHeats extends React.Component {

  render() {
    return (
      <div>
        <Paper className="heat-action">
          <p>There is no action yet</p>
        </Paper>

        <List className="heat-list">
          <ListItem disabled primaryText={<HeatBuilder {...this.props} id="1"/>}/>
          <ListItem disabled primaryText={<HeatBuilder {...this.props} id="2"/>}/>
          <ListItem disabled primaryText={<HeatBuilder {...this.props} id="3"/>}/>
        </List>
      </div>
    );
  }
}
