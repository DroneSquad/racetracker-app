import React from 'react';
import _ from 'lodash';

import { AppBar, List, ListItem, Divider, SelectField, MenuItem } from 'material-ui';

import { historyBackButton } from '../../../../../utils';
import frequencies from '../../../containers/settings/frequencies/frequencies.json'; // the config to generate the profiles

import './frequencies.css';

export default class Frequency extends React.Component {
  state = {
    saving: false,
    band: (() => {
      let i = 0;
      for (let key in frequencies.band_profiles) {
        // do checks for lowercase values but also the letter must be the first in the string
        let bandName = key.toLowerCase();
        if (bandName[0] === this.props.defaultBand.toLowerCase()) {
          return i;
        }
        i++;
      }
      return 0;
    })(),
    channel: this.props.defaultChannel - 1,
    bands: frequencies.bands,
    profiles: frequencies.band_profiles,
  };

  /** When the user selects a band */
  onBandSelect = (event, value) => {
    this.setState({ band: value });
  };

  /** When the user selects a channel */
  onChannelSelect = (event, value) => {
    this.setState({ channel: value });
    this.props.rawDispatch({type: 'FREQ_TEST'})
  };

  /** All the frequencies */
  frequencies = () => {
    let values = this.state.profiles[_.keys(this.state.profiles)[this.state.band]];
    return (
      <SelectField
        disabled={this.state.loading}
        className="drop-down-width"
        value={this.state.channel}
        onChange={this.onChannelSelect}
      >
        {this.state.loading && <MenuItem value={0} primaryText={<span className="bar-item">Loading...</span>} />}
        {!this.state.loading &&
          _.map(values, (value, index) => {
            let text = `${String(value).toUpperCase()} - ${this.state.bands[value]}`;
            return <MenuItem key={index} value={index} primaryText={text} />;
          })}
      </SelectField>
    );
  };

  /** All the bands */
  bands = () => {
    return (
      <SelectField
        disabled={this.state.loading}
        className="drop-down-width"
        value={this.state.band}
        onChange={this.onBandSelect}
      >
        {this.state.loading && <MenuItem value={0} primaryText={<span className="bar-item">Loading...</span>} />}
        {!this.state.loading &&
          _.map(_.keys(this.state.profiles), (value, index) => <MenuItem key={index} value={index} primaryText={value} />)}
      </SelectField>
    );
  };

  render() {
    return (
      <div className="main video-frequencies">
        <header>
          <AppBar
            title="Video Frequency Selection"
            iconClassNameLeft="mdi mdi-arrow-left"
            onLeftIconButtonTouchTap={historyBackButton.bind(this)}
          />
        </header>
        <main>
          <List className={this.state.loading ? 'loading-bar' : ''}>
            <ListItem primaryText="Band" rightIconButton={this.bands()} />
            <Divider />
            <ListItem primaryText="Frequency" rightIconButton={this.frequencies()} />
            <Divider />
          </List>
        </main>
      </div>
    );
  }
}
