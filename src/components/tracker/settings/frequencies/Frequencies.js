import React from 'react';
import _ from 'lodash';

import { AppBar, List, ListItem, Divider, DropDownMenu, MenuItem } from 'material-ui';

import { historyBackButton, toPercent } from '../../../../utils';

//import frequencies from './frequencies.json'; // the config to generate the profiles
import './frequencies.css';

export default class Frequencies extends React.Component {
  static MAX_FREQUENCY_AMOUNT = 8;

  constructor(props) {
    super(props);
    this.state = {
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
    this.props.history.push('/tracker/settings/frequencies/edit');
  };

  render() {
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
            {_.range(Frequencies.MAX_FREQUENCY_AMOUNT).map(i =>
              <MenuItem key={i} value={i} primaryText={++i} />
            )}
          </DropDownMenu>
          <DropDownMenu value={this.state.channel} onChange={this.onFrequencyChannel}>
            {_.range(6).map(i =>
              <MenuItem key={i} value={i} primaryText={String.fromCharCode(65 + i)} />
            )}
          </DropDownMenu>
          <p>
            Drone Squad quality rating: {toPercent(this.state.quality)} <br />
            Reduce frequencies to improve timing accuracy.
          </p>
          <List>
            {_.range(this.state.amount + 1).map(i =>
              <div key={i++}>
                <ListItem
                  primaryText={'Frequency ' + i}
                  rightIcon={
                    <span>
                      {String.fromCharCode(64 + i)}
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
