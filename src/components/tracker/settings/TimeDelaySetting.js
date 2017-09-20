import React from 'react';

import { SelectField, MenuItem } from 'material-ui';

import Setting from './Setting';

export default class TimeDelaySetting extends Setting {
  constructor(props) {
    super(props);
    setTimeout(() => {
      this.setState({ time: 1 }); // todo fetch from device
      this.doneLoading();
    }, Math.random() * 1000 + 500); // todo trigger after we fetch the settings from the device
  }

  /** When they select the menu item */
  onSelectField = (event, index, value) => {
    this.setState({ time: value });
  };

  render() {
    return (
      <div className={this.isLoadingClass()} style={{ padding: '0 16px' }}>
        <h3 className="no-margin left push-down-text">Fastest Lap</h3>
        <SelectField
          disabled={this.state.loading}
          className="right"
          value={this.state.time || 0}
          onChange={this.onSelectField}
        >
          {this.state.loading && <MenuItem value={0} primaryText={<span className="bar-item">Loading...</span>} />}
          <MenuItem value={1} primaryText="5 seconds" />
          <MenuItem value={2} primaryText="10 seconds" />
          <MenuItem value={3} primaryText="15 seconds" />
          <MenuItem value={4} primaryText="20 seconds" />
          <MenuItem value={5} primaryText="30 seconds" />
        </SelectField>
        <p className="clear">
          If the timing gate is close to other sections of the track, this will prevent double counting.
        </p>
      </div>
    );
  }
}
