import React from 'react';

import {
  ListItem,
  FontIcon,
  Toggle,
} from 'material-ui';

import Setting from './Setting';

export default class FrequencySetting extends Setting {
  constructor(props) {
    super(props);
    setTimeout(() => this.doneLoading(), Math.random() * 1000 + 500); // todo trigger after we fetch the settings from the device
  }

  render() {
    let toggleSwitch = <Toggle disabled={this.state.loading} label="Start timer on flyover" />;
    return (
      <div className={this.isLoadingClass()}>
        <ListItem disabled leftIcon={<FontIcon className="mdi mdi-earth push-down-icon"/>} primaryText={toggleSwitch}/>
      </div>
    );
  }
}


