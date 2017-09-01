import React from 'react';

import { ListItem, Toggle } from 'material-ui';

import Setting from './Setting';

export default class FrequencySetting extends Setting {
  constructor(props) {
    super(props);
    setTimeout(() => this.doneLoading(), Math.random() * 1000 + 500); // todo trigger after we fetch the settings from the device
  }

  render() {
    let text = <h3 className="no-margin">Detect VTx to start timing</h3>;
    let toggleSwitch = <Toggle disabled={this.state.loading} label={text} />;
    let secondary = 'Timing begins when the video transmitter flies over the RaceTracker';
    return <ListItem disabled primaryText={toggleSwitch} secondaryText={secondary} />;
  }
}
