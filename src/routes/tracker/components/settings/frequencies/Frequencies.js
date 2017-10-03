import React from 'react';
import _ from 'lodash';

import { AppBar, List, ListItem, Divider, DropDownMenu, MenuItem } from 'material-ui';

import { historyBackButton, toPercent } from '../../../../../utils';

import frequencies from './frequencies.json'; // the config to generate the profiles
import './frequencies.css';

export default class Frequencies extends React.Component {
  props: {
    id: string,
    getRacerChannels: Function
  };

  static MAX_FREQUENCY_AMOUNT = 8;

  constructor(props) {
    super(props);
    // TODO: these are just testing the racerChannels
    let racers = Array(Number(this.props.channelCount)).fill().map((_, idx) => 1 + idx)
    this.props.getRacerChannels({ device_id: this.props.id, racers: racers });
    this.state = {
      bands: frequencies.bands,
      profiles: _.map(frequencies.profiles, profile => profile.name),
      amount: 0,
      channel: 0
    };
  }

  /** When the frequency amount changes */
  onFrequencyAmount = (event, value) => {
    this.setState({ amount: value });
  };

  /** When the frequency amount changes */
  onFrequencyChannel = (event, value) => {
    this.setState({ channel: value });
  };

  /** When the user clicks on the frequency */
  onFrequencyClick = () => {
    console.log("onFrequencyClick");
    console.log(this.props.racerChannels);
    this.props.history.push('/tracker/settings/frequencies/edit');
  };

  render() {
    let videoProfile = frequencies.profiles[this.state.channel];
    let selectedAmount =
      videoProfile.frequencies.length <= this.state.amount ? videoProfile.frequencies.length - 1 : this.state.amount;
    let videoFrequencies = videoProfile.frequencies[selectedAmount];
    return (
      <div className="main video-frequencies">
        <header>
          <AppBar
            title="Video Frequencies"
            iconClassNameLeft="mdi mdi-arrow-left"
            onLeftIconButtonTouchTap={historyBackButton.bind(this)}
          />
        </header>
        <main>
          <DropDownMenu value={selectedAmount} onChange={this.onFrequencyAmount}>
            {_.range(videoProfile.frequencies.length).map(i => <MenuItem key={i} value={i} primaryText={++i} />)}
          </DropDownMenu>
          <DropDownMenu value={this.state.channel} onChange={this.onFrequencyChannel}>
            {_.map(this.state.profiles, (profile, index) =>
              <MenuItem key={index} value={index} primaryText={profile} />
            )}
          </DropDownMenu>
          <p>
            Drone Squad quality rating: {toPercent(videoFrequencies.imd)} <br />
            Reduce frequencies to improve timing accuracy.
          </p>
          <List>
            {videoFrequencies.bands.length > 0 &&
              _.map(videoFrequencies.bands, (band, index) =>
                <div key={++index}>
                  <ListItem
                    primaryText={'Frequency ' + index}
                    rightIcon={
                      <span style={{ width: '100%', textAlign: 'right' }}>
                        {_.upperCase(band)} - {frequencies.bands[band]}
                      </span>
                    }
                    onTouchTap={this.onFrequencyClick}
                  />
                  <Divider />
                </div>
              )}
            {videoFrequencies.bands.length === 0 &&
              <ListItem primaryText="There is no profile for this configuration" />}
          </List>
        </main>
        <footer>
          <span>Pro video profiles by Alex "IBCrazy" Greve</span>
        </footer>
      </div>
    );
  }
}
