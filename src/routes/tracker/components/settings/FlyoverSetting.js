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
    console.log(this.props);
    if (isInputChecked) {
      console.log('1');
      this.props.setRaceMode({ deviceId: this.props.id, raceMode: 'flyby' });
    } else {
      console.log('2');
      this.props.setRaceMode({ deviceId: this.props.id, raceMode: 'shotgun' });
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
