import React from 'react';

import {
  AppBar,
  List,
  ListItem,
  Divider,
  SelectField,
  MenuItem,
} from 'material-ui';

import { historyBackButton } from '../../../../utils';

import './frequencies.css';

export default class Frequency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      band: 0,
      channel: 0,
    };
    setTimeout(() => {
      this.setState({loading: false, band: 1, channel: 1});
    }, 1000);
  }

  /** When the user selects a band */
  onBandSelect = (event, value) => {
    this.setState({band: value});
    console.log(value);
  };

  /** When the user selects a channel */
  onChannelSelect = (event, value) => {
    this.setState({channel: value});
    console.log(value);
  };

  /** All the frequencies */
  frequencies = () => {
    return (
      <SelectField disabled={this.state.loading} className="drop-down-width" value={this.state.channel} onChange={this.onChannelSelect}>
        {this.state.loading && <MenuItem value={0} primaryText={<span className="bar-item">Loading...</span>}/>}
        <MenuItem value={1} primaryText="5000" />
        <MenuItem value={2} primaryText="5001" />
        <MenuItem value={3} primaryText="5002" />
        <MenuItem value={4} primaryText="5003" />
        <MenuItem value={5} primaryText="5004" />
      </SelectField>
    );
  };

  /** All the bands */
  bands = () => {
    return (
      <SelectField disabled={this.state.loading} className="drop-down-width" value={this.state.band} onChange={this.onBandSelect}>
        {this.state.loading && <MenuItem value={0} primaryText={<span className="bar-item">Loading...</span>}/>}
        <MenuItem value={1} primaryText="A" />
        <MenuItem value={2} primaryText="B" />
        <MenuItem value={3} primaryText="C" />
        <MenuItem value={4} primaryText="D" />
        <MenuItem value={5} primaryText="R" />
      </SelectField>
    );
  };

  render() {
    return (
      <div className="main video-frequencies">
        <header>
          <AppBar title="Video Frequency Selection" iconClassNameLeft="mdi mdi-arrow-left" onLeftIconButtonTouchTap={historyBackButton.bind(this)}/>
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
