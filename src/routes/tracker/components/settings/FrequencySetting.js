import React from 'react';

import { ListItem, FontIcon } from 'material-ui';

import Setting from './Setting';

export default class FrequencySetting extends Setting {
  props: {
    id: string,
    frequencyCount: string,
    getFrequencyCount: Function,
    frequencies: Function
  };

  constructor(props) {
    super(props);
    this.props.getFrequencyCount(this.props.id);
    if (this.props.frequencyCount) {
      this.state.loading = false;
    } else {
      this.state.loading = true;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.frequencyCount !== nextProps.frequencyCount) {
      if (this.state.loading) {
        this.doneLoading();
      }
    }
  }

  /** Open the frequencies settings for the race tracker */
  openFrequencies = () => {
    this.props.frequencies(this.props.id);
  };

  render() {
    let freqCountText = '';
    if (this.props.frequencyCount === '1') {
      freqCountText = '1 frequency is being tracked';
    } else {
      freqCountText = this.props.frequencyCount + ' frequencies are being tracked';
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
