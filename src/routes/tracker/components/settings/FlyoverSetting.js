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
      this.props.setRaceMode({ device_id: this.props.id, raceMode: 'flyby' });
    } else {
      this.props.setRaceMode({ device_id: this.props.id, raceMode: 'shotgun' });
    }
  };

  render() {
    let toggle = this.props.raceMode === 'flyby' ? true : false;
    let text = <h3 className="no-margin">Detect VTx to start timing</h3>;
    let toggleSwitch = <Toggle defaultToggled={toggle} onToggle={this.handleOnToggle} label={text} />;
    let secondary = 'Timing begins when the video transmitter flies over the RaceTracker';
    return <ListItem disabled primaryText={toggleSwitch} secondaryText={secondary} />;
  }
}
