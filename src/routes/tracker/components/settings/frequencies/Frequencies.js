import React from 'react';
import _ from 'lodash';

import { AppBar, List, ListItem, Divider, DropDownMenu, MenuItem } from 'material-ui';

import { historyBackButton, toPercent } from '../../../../../utils';

import frequencies from '../../../containers/settings/frequencies/frequencies.json'; // the config to generate the profiles
import './frequencies.css';

export default class Frequencies extends React.Component {
  static MAX_FREQUENCY_AMOUNT = 8;

  constructor(props) {
    super(props);
    this.state = {
      bands: frequencies.bands,
      profiles: _.map(frequencies.profiles, profile => profile.name),
      amount: 0,
      channel: 0,
      data: (() => { // todp update with map reduce
        let data = {};
        for (let index in frequencies.profiles) {
          let profile = frequencies.profiles[index];
          for (let indexBands in profile.frequencies) {
            let band = profile.frequencies[indexBands];
            let bands = data[band.bands.length];
            let i = Number(index);
            if (bands) {
              bands.push(i);
            } else {
              data[band.bands.length] = [i]
            }
          }
        }
        return data;
      })()
    };
  }

  /** When the frequency amount changes */
  onFrequencyAmount = (event, value) => {
    this.setState({ amount: value, channel: this.state.channel > this.state.data[value + 1].length - 1 ? 0 : this.state.channel });
  };

  /** When the frequency amount changes */
  onFrequencyChannel = (event, value) => {
    this.setState({ channel: value });
  };

  /** When the user clicks on the frequency */
  onFrequencyClick = () => {
    this.props.history.push('/tracker/settings/frequencies/edit');
  };

  render() {
    let videoProfile = frequencies.profiles[this.state.data[this.state.amount + 1][this.state.channel]];
    let videoFrequencies = _.find(videoProfile.frequencies, freq => freq.bands.length === this.state.amount + 1);
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
          <DropDownMenu value={this.state.amount} onChange={this.onFrequencyAmount}>
            {_.map(this.state.data, (array, i) => <MenuItem key={i - 1} value={i - 1} primaryText={i} />)}
          </DropDownMenu>
          <DropDownMenu value={this.state.channel} onChange={this.onFrequencyChannel}>
            {_.map(this.state.data[this.state.amount + 1], (value, index) =>
              <MenuItem key={index} value={index} primaryText={frequencies.profiles[value].name} />
            )}
          </DropDownMenu>
          <p>
            Drone Squad quality rating: {toPercent(videoFrequencies.imd)} <br />
            Reduce frequencies to improve timing accuracy.
          </p>
          <List>
            {videoFrequencies &&
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
          </List>
        </main>
        <footer>
          <span>Pro video profiles by Alex "IBCrazy" Greve</span>
        </footer>
      </div>
    );
  }
}
