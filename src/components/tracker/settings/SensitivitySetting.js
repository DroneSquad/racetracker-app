import React from 'react';
import Setting from './Setting';

import {
  Slider,
  FlatButton,
} from 'material-ui';

import loadingImg from '../../../media/ds-logo-spin.svg';
import { toPercent } from '../../../utils';

export default class SensitivitySetting extends Setting {

  constructor(props) {
    super(props);
    this.onSlider = this.onSlider.bind(this);
    this.calibrate = this.calibrate.bind(this);
    setTimeout(() => this.doneLoading(), Math.random() * 1000 + 500); // todo trigger after we fetch the settings from the device
  }

  /** When the slider changes */
  onSlider(event, value) {
    this.setState({slider: value});
  }

  calibrate() {
    this.setState({calibrating: true});
    setTimeout(() => {
      this.setState({calibrating: false});
    }, 1000); // todo trigger after we fetch the settings from the device
  }

  render() {
    let loadingComponent = <img src={loadingImg} style={{height: '16px', width: '16px'}} alt="Loading..."/>;

    return (
      <div className={this.isLoadingClass()} style={{padding: '0 16px'}}>
        <h3 className="no-margin left push-down-text">Sensitivity</h3>
        <div className="right clear-right bar-item push-down-text">{toPercent(this.state.slider || 0)}</div>
        <div className="clear">
          <br />
          <Slider className="sensitivity-slider" disabled={this.state.loading || this.state.calibrating} step={0.05} value={this.state.slider || 0} onChange={this.onSlider} />
          <div className="center-text">
            <FlatButton primary disabled={this.state.loading || this.state.calibrating} label={this.state.calibrating ? loadingComponent : 'Calibrate'} onTouchTap={this.calibrate}/>
          </div>
          <p>Increase for missed laps, reduce to prevent double counting.</p>
        </div>
      </div>
    );
  }
}
