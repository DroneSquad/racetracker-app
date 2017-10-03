import React from 'react';

import { ListItem, FontIcon } from 'material-ui';

import Setting from './Setting';

export default class FrequencySetting extends Setting {
  props: {
    id: string,
    channelCount: string,
    getChannelCount: Function,
    getRacerChannels: Function,
    frequencies: Function
  };

  constructor(props) {
    super(props);
    this.props.getChannelCount(this.props.id);
    if (this.props.channelCount) {
      this.state.loading = false;
    } else {
      this.state.loading = true;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.channelCount !== nextProps.channelCount) {
      if (this.state.loading) {
        this.doneLoading();
        // console.log("getRacerChannels-Called");
        // let racers = Array(Number(nextProps.channelCount)).fill().map((_, idx) => 1 + idx)
        // console.log(racers);
        // this.props.getRacerChannels({ device_id: this.props.id, racers: racers });
      }
    }
  }

  /** Open the frequencies settings for the race tracker */
  openFrequencies = () => {
    this.props.frequencies(this.props.id);
  };

  render() {
    let freqCountText = '';
    if (this.props.channelCount === '1') {
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
