import React from 'react';
import Setting from './Setting';

import { Paper, RaisedButton } from 'material-ui';

export default class SensitivitySetting extends Setting {
  render() {
    return (
      <Paper zDepth={1} rounded={false}>
        <h2 className="no-margin">Sensitivity</h2>
        <div>
          123%
        </div>
        <div>
          <RaisedButton label="Trim Down" secondary/>
          <RaisedButton label="Calibrate" secondary/>
          <RaisedButton label="Trim Up" secondary/>
        </div>
        <p>Increase for missed laps, reduce to prevent double counting.</p>
      </Paper>
    );

  }
}
