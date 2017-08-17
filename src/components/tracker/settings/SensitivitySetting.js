import React from 'react';
import Setting from './Setting';

import { Slider } from 'material-ui';

import { toPercent } from '../../../utils';

export default class SensitivitySetting extends Setting {

  constructor(props) {
    super(props);
    this.onSlider = this.onSlider.bind(this);
    setTimeout(() => this.doneLoading(), Math.random() * 1000 + 500); // todo trigger after we fetch the settings from the device
  }

  /** When the slider changes */
  onSlider(event, value) {
    this.setState({slider: value});
  }

  render() {
    return (
      <div className={this.isLoadingClass()}>
        <h2 className="no-margin ds-blue-text left push-down-text">Sensitivity</h2>
        <div className="right clear-right bar-item push-down-text">{toPercent(this.state.slider || 0)}</div>
        <div className="clear">
          <br />
          <Slider className="sensitivity-slider" disabled={this.state.loading} step={0.05} value={this.state.slider || 0} onChange={this.onSlider} />
          <p>Increase for missed laps, reduce to prevent double counting.</p>
        </div>
      </div>
    );
  }
}
