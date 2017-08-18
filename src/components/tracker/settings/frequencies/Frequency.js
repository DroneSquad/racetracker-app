import React from 'react';

import {
  AppBar,
  Paper,
} from 'material-ui';

import { historyBackButton } from '../../../../utils';

export default class Frequency extends React.Component {
  render() {
    return (
      <div className="main">
        <header>
          <AppBar title="RaceTracker Settings"  iconClassNameLeft="mdi mdi-arrow-left" onLeftIconButtonTouchTap={historyBackButton.bind(this)}/>
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
