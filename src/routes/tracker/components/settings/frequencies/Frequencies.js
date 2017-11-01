import React from 'react';
import _ from 'lodash';

import { AppBar, List, ListItem, Divider, DropDownMenu, MenuItem } from 'material-ui';
import LoadingSpinner from '../../../../../global/app/LoadingSpinner';

import { historyBackButton, toPercent } from '../../../../../utils';

import './frequencies.css';

export default class Frequencies extends React.Component {
  static MAX_FREQUENCY_AMOUNT = 8;

  state = {
    amount: 0,
    channel: 0
  };

  componentWillMount() {
    this.props.readFrequencies(this.props.id);
  }

  saveProfile(amount, channel) {
    let profile = this.props.frequencies.profiles[this.props.profilesMap[amount][channel]];
    this.props.updateProfile(profile);
  }

  /** When the frequency amount changes */
  onFrequencyAmount = (event, value) => {
    let channel = this.state.channel > this.props.profilesMap[value + 1].length - 1 ? 0 : this.state.channel;
    this.setState({
      amount: value,
      channel: channel
    });
    this.saveProfile(value + 1, channel);
  };

  /** When the frequency amount changes */
  onFrequencyChannel = (event, value) => {
    this.setState({ channel: value });
    this.saveProfile(this.state.amount + 1, value);
  };

  /** When the frequency amount changes */
  onDeviceFrequencyChannel = (event, value, amount) => {
    if (value > 0) {
      this.setState({ amount: amount, channel: value - 1 });
      this.saveProfile(amount + 1, value - 1);
    } else {
      this.props.updateProfile(); // clear profile to show loading
      this.props.readFrequencies(this.props.id); // Re read from the device
    }
  };

  /** When the user clicks on the frequency */
  onFrequencyClick = () => {
    // todo allow editing frequencies
    //this.props.history.push('/tracker/settings/frequencies/edit');
  };

  render() {
    let { frequencies, profilesMap, videoProfile, isDeviceProfile, deviceProfileBandIndex } = this.props;
    let amount = this.state.amount; // the number of racers/pilots
    let channel = this.state.channel; // the index for the channel name
    let videoFrequencies;
    if (videoProfile) {
      videoFrequencies = _.find(videoProfile.frequencies, freq => freq.bands.length === this.state.amount + 1);
      amount = videoFrequencies.bands.length - 1;
      if (isDeviceProfile) {
        // if device profile for an update on all vars
        videoFrequencies = videoProfile.frequencies[deviceProfileBandIndex];
        amount = videoFrequencies.bands.length - 1;
        channel = -1;
      }
    }
    let isLoading = !videoProfile || !videoFrequencies;
    return (
      <div className="main video-frequencies">
        <header>
          <AppBar
            title="Video Frequencies"
            iconClassNameLeft="mdi mdi-close"
            onLeftIconButtonTouchTap={historyBackButton.bind(this)}
            iconClassNameRight={!isLoading && (this.props.saving ? 'mdi mdi-loading spinner' : 'mdi mdi-check')}
            onRightIconButtonTouchTap={() =>
              !isLoading && this.props.onSave(this.props.id, (videoFrequencies && videoFrequencies.bands) || [])}
          />
        </header>
        <main>
          {!isLoading &&
            <DropDownMenu disabled={this.props.saving} value={amount} onChange={this.onFrequencyAmount}>
              {_.map(profilesMap, (array, i) => <MenuItem key={i - 1} value={i - 1} primaryText={i} />)}
            </DropDownMenu>}
          {!isLoading &&
            <DropDownMenu
              disabled={this.props.saving}
              value={channel}
              onChange={
                isDeviceProfile
                  ? (event, value) => this.onDeviceFrequencyChannel(event, value, amount)
                  : this.onFrequencyChannel
              }
            >
              {isDeviceProfile &&
                <MenuItem
                  key={-1}
                  value={-1}
                  primaryText={videoProfile.name === 'Device' ? 'Device' : `${videoProfile.name} (Device)`}
                />}
              {_.map(profilesMap[amount + 1], (value, index) =>
                <MenuItem key={index} value={index} primaryText={frequencies.profiles[value].name} />
              )}
            </DropDownMenu>}
          {!isLoading &&
            videoFrequencies.imd >= 0 &&
            <p>
              Drone Squad quality rating: {toPercent(videoFrequencies.imd)} <br />
              Reduce frequencies to improve timing accuracy.
            </p>}
          <List>
            {!isLoading &&
              _.map(videoFrequencies.bands, (band, index) =>
                <div key={++index}>
                  <ListItem
                    disabled={this.props.saving}
                    primaryText={'Frequency ' + index}
                    rightIcon={
                      <span style={{ width: '100%', textAlign: 'right' }}>
                        {band.toUpperCase()} - {frequencies.bands[band.toLowerCase()] || '0000'}
                      </span>
                    }
                    onTouchTap={this.onFrequencyClick}
                  />
                  <Divider />
                </div>
              )}
            {!isLoading &&
              _.size(videoFrequencies.bands) === 0 &&
              <ListItem primaryText="Error Reading Profile Values" />}
            {isLoading &&
              <ListItem disabled>
                <LoadingSpinner size={30} />
              </ListItem>}
          </List>
        </main>
        <footer>
          <span>Pro video profiles by Alex "IBCrazy" Greve</span>
        </footer>
      </div>
    );
  }
}
