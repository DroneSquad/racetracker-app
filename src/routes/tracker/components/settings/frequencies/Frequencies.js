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
    channel: 0,
  };

  componentWillMount() {
    this.props.readFrequencies(this.props.id);
    this.saveProfile();
  }

  saveProfile() {
    console.log('dispatching profile');
    //this.props.updateProfile(frequencies.profiles[this.state.data[this.state.amount + 1][this.state.channel]]);
  }

  /** When the frequency amount changes */
  onFrequencyAmount = (event, value) => {
    this.setState({
      amount: value,
      channel: this.state.channel > this.props.profilesMap[value + 1].length - 1 ? 0 : this.state.channel
    });
    this.saveProfile();
  };

  /** When the frequency amount changes */
  onFrequencyChannel = (event, value) => {
    this.setState({ channel: value });
    this.saveProfile();
  };

  /** When the user clicks on the frequency */
  onFrequencyClick = () => {
    // todo allow editing frequencies
    //this.props.history.push('/tracker/settings/frequencies/edit');
  };

  render() {
    let { frequencies, profilesMap } = this.props;
    let videoProfile = frequencies.profiles[profilesMap[this.state.amount + 1][this.state.channel]];
    let videoFrequencies = _.find(videoProfile.frequencies, freq => freq.bands.length === this.state.amount + 1);
    return (
      <div className="main video-frequencies">
        <header>
          <AppBar
            title="Video Frequencies"
            iconClassNameLeft="mdi mdi-close"
            onLeftIconButtonTouchTap={historyBackButton.bind(this)}
            iconClassNameRight={this.props.saving ? 'mdi mdi-loading spinner' : 'mdi mdi-check'}
            onRightIconButtonTouchTap={() => this.props.onSave(this.props.id, videoFrequencies.bands)}
          />
        </header>
        <main>
          {!this.props.loading &&
            <DropDownMenu disabled={this.props.saving} value={this.state.amount} onChange={this.onFrequencyAmount}>
              {_.map(profilesMap, (array, i) => <MenuItem key={i - 1} value={i - 1} primaryText={i} />)}
            </DropDownMenu>}
          {!this.props.loading &&
            <DropDownMenu disabled={this.props.saving} value={this.state.channel} onChange={this.onFrequencyChannel}>
              {_.map(profilesMap[this.state.amount + 1], (value, index) =>
                <MenuItem key={index} value={index} primaryText={frequencies.profiles[value].name} />
              )}
            </DropDownMenu>}
          {!this.props.loading &&
            <p>
              Drone Squad quality rating: {toPercent(videoFrequencies.imd)} <br />
              Reduce frequencies to improve timing accuracy.
            </p>}
          <List>
            {!this.props.loading &&
              videoFrequencies &&
              _.map(videoFrequencies.bands, (band, index) =>
                <div key={++index}>
                  <ListItem
                    disabled={this.props.saving}
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
            {this.props.loading &&
              <ListItem>
                <LoadingSpinner />
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
