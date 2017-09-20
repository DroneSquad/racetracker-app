import React from 'react';
import _ from 'lodash';

import { AppBar, List, ListItem, Divider, SelectField, MenuItem } from 'material-ui';

import { historyBackButton } from '../../../../utils';
import frequencies from './frequencies.json'; // the config to generate the profiles

import './frequencies.css';

export default class Frequency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      band: 0,
      channel: 0,
      bands: frequencies.bands,
      profiles: _.map(frequencies.profiles, profile => profile.name)
    };
    setTimeout(() => {
      this.setState({ loading: false, band: 0, channel: 4 });
    }, 1000);
  }

  /** When the user selects a band */
  onBandSelect = (event, value) => {
    this.setState({ band: value });
    console.log(value);
  };

  /** When the user selects a channel */
  onChannelSelect = (event, value) => {
    this.setState({ channel: value });
    console.log(value);
  };

  /** All the frequencies */
  frequencies = () => {
    return (
      <SelectField
        disabled={this.state.loading}
        className="drop-down-width"
        value={this.state.channel}
        onChange={this.onChannelSelect}
      >
        {this.state.loading && <MenuItem value={0} primaryText={<span className="bar-item">Loading...</span>} />}
        {!this.state.loading &&
          _.map(_.keys(this.state.bands), (value, index) => {
            let text = `${_.upperCase(value)} - ${this.state.bands[value]}`;
            return <MenuItem value={index} primaryText={text} />;
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
          _.map(this.state.profiles, (value, index) => <MenuItem value={index} primaryText={value} />)}
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
            <ListItem primaryText="Band" rightToggle={this.bands()} />
            <Divider />
            <ListItem primaryText="Frequency" rightToggle={this.frequencies()} />
            <Divider />
          </List>
        </main>
      </div>
    );
  }
}
