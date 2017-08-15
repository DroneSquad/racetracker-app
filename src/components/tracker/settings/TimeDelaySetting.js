import React from 'react';

import { Paper, FontIcon } from 'material-ui';

import Setting from './Setting';

export default class TimeDelaySetting extends Setting {
  render() {
    return (
      <Paper zDepth={1} rounded={false}>
        <h2 className="no-margin">Fastest Lap</h2>
        <div>
          <FontIcon className="mdi mdi-battery-50"/> 123%
        </div>
        <p>If the timing gate is close to other sections of
          the track, this will prevent double counting.</p>
      </Paper>
    );
  }
}
