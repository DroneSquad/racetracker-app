import React, { Component } from 'react';

import { AppBar, Paper, List, ListItem, GridList } from 'material-ui';

import { historyBackButton } from '../../../utils';

/** Used to display the pilot info for the heat builder */
export default class RacerDetails extends Component {

  render() {
    let { person } = this.props;
    return (
      <div className="main">
        <header>
          <AppBar
            title={person || 'Null'}
            iconClassNameLeft="mdi mdi-arrow-left"
            onLeftIconButtonTouchTap={historyBackButton.bind(this)}
          />
        </header>
        <main>
          <Paper>
            test
          </Paper>
          <List>
            <ListItem>a</ListItem>
            <ListItem>a</ListItem>
          </List>
        </main>
      </div>
    );
  }
}
