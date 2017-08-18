import React from 'react';

import {
  ListItem,
  FontIcon,
} from 'material-ui';

import Setting from './Setting';

export default class FrequencySetting extends Setting {
  constructor(props) {
    super(props);
    setTimeout(() => {
      this.doneLoading();
      this.setState({frequencies: '8 frequencies are being tracked'});
    }, Math.random() * 1000 + 500); // todo trigger after we fetch the settings from the device
  }

  render() {
    let frequencies = <span className="bar-item" >{this.state.frequencies}</span>;
    return (
      <div className={'frequencies ' + this.isLoadingClass()}>
        <ListItem disabled leftIcon={<FontIcon className="mdi mdi-radio-tower"/>} primaryText="Frequencies" secondaryText={frequencies}/>
      </div>
    );
  }
}


