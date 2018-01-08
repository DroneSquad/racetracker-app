import React from 'react';

import { ListItem, Toggle } from 'material-ui';

import Setting from './Setting';

export default class FlyoverSetting extends Setting {
  props: {
    id: string,
    raceMode: string,
    setRaceMode: Function
  };

  handleOnToggle = (event: Object, isInputChecked: boolean) => {
    if (isInputChecked) {
      this.props.setRaceMode('flyby');
    } else {
      this.props.setRaceMode('shotgun');
    }
  };

  render() {
    let toggle = this.props.raceMode === 'flyby';
    let text = <h3 className="no-margin">Detect VTx to start timing</h3>;
    let toggleSwitch = <Toggle defaultToggled={false} toggled={toggle} onToggle={this.handleOnToggle} label={text} />;
    let secondary = 'Timing begins when the video transmitter flies over the RaceTracker';
    return <ListItem primaryText={toggleSwitch} secondaryText={secondary} />;
  }
}
