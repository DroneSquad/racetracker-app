import React from 'react';

import { ListItem, FontIcon } from 'material-ui';

import Setting from './Setting';

export default class FrequencySetting extends Setting {
  props: {
    id: string,
    channelCount: number,
    goToFrequencies: Function
  };

  constructor(props) {
    super(props);
    this.state.loading = !this.props.channelCount;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.channelCount !== nextProps.channelCount) {
      if (this.state.loading) {
        this.doneLoading();
      }
    }
  }

  /** Open the frequencies settings for the race tracker */
  openFrequencies = () => {
    this.props.goToFrequencies(this.props.id);
  };

  render() {
    let freqCountText = '';
    if (this.props.channelCount === 1) {
      freqCountText = '1 frequency is being tracked';
    } else {
      freqCountText = this.props.channelCount + ' frequencies are being tracked';
    }
    let frequencies = (
      <span className="bar-item">
        {freqCountText}
      </span>
    );
    return (
      <div className={'frequencies ' + this.isLoadingClass()}>
        <ListItem
          hoverColor="rgba(0, 0, 0, 0)"
          leftIcon={<FontIcon className="mdi mdi-radio-tower" />}
          primaryText="Frequencies"
          secondaryText={frequencies}
          onTouchTap={this.openFrequencies}
        />
      </div>
    );
  }
}
