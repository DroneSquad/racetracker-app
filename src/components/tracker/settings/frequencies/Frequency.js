import React from 'react';
import _ from 'lodash';

import {
  AppBar,
  RadioButtonGroup,
  RadioButton,
} from 'material-ui';

import { historyBackButton } from '../../../../utils';

import './frequencies.css';

export default class Frequency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      band: 0,
      channel: 0,
    }
  }

  /** When the user selects a band */
  onBandSelect = (event, value) => {
    console.log(value);
  };

  /** When the user selects a channel */
  onChannelSelect = (event, value) => {
    console.log(value);
  };

  render() {
    return (
      <div className="main video-frequencies">
        <header>
          <AppBar title="Video Frequency Selection" iconClassNameLeft="mdi mdi-arrow-left" onLeftIconButtonTouchTap={historyBackButton.bind(this)}/>
        </header>
        <main>
          <div className="pad">
            <h4 className="ds-blue-text">Frequency Band</h4>
            <RadioButtonGroup name="band" defaultSelected={this.state.band} onChange={this.onBandSelect}>
              {_.range(7).map(i => <RadioButton className="horz" key={i} value={i} label={String.fromCharCode(65 + i)} />)}
            </RadioButtonGroup>
          </div>
          <div className="pad clear">
            <h4 className="ds-blue-text">Channel</h4>
            <RadioButtonGroup name="channel" defaultSelected={this.state.channel} onChange={this.onChannelSelect}>
              {_.range(5).map(i => <RadioButton className="horz" key={i} value={i} label={String.fromCharCode(65 + i)} />)}
            </RadioButtonGroup>
          </div>
        </main>
      </div>
    );
  }
}
