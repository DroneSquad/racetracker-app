import React from 'react';

import {
  AppBar,
  Paper,
  IconButton
} from 'material-ui';

export default class Frequency extends React.Component {
  render() {
    return (
      <div className="main">
        <header>
          <AppBar title="RaceTracker Settings" iconElementLeft={<IconButton />}/>
        </header>
        <main>
          <Paper zDepth={1} rounded={false}>
            text
          </Paper>
        </main>
      </div>
    );
  }
}
