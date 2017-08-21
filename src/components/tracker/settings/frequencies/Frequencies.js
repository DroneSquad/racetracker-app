import React from 'react';

import {
  AppBar,
  List,
  ListItem,
  Divider,
  DropDownMenu,
  MenuItem,
} from 'material-ui';

import { historyBackButton, toPercent } from '../../../../utils';

import './frequencies.css';

export default class Frequencies extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="main video-frequencies">
        <header>
          <AppBar title="Video Frequencies" iconClassNameLeft="mdi mdi-arrow-left" onLeftIconButtonTouchTap={historyBackButton.bind(this)}/>
        </header>
        <main>
          <DropDownMenu value={1} onChange={() => {}}>
            <MenuItem value={1} primaryText="Never" />
            <MenuItem value={2} primaryText="Every Night" />
            <MenuItem value={3} primaryText="Weeknights" />
            <MenuItem value={4} primaryText="Weekends" />
            <MenuItem value={5} primaryText="Weekly" />
          </DropDownMenu>
          <DropDownMenu value={1} onChange={() => {}}>
            <MenuItem value={1} primaryText="Never" />
            <MenuItem value={2} primaryText="Every Night" />
            <MenuItem value={3} primaryText="Weeknights" />
            <MenuItem value={4} primaryText="Weekends" />
            <MenuItem value={5} primaryText="Weekly" />
          </DropDownMenu>
          <p>
            Drone Squad quality rating: {toPercent(this.state.quality)} <br />
            Reduce frequencies to improve timing accuracy.
          </p>
          <List>
            <ListItem primaryText="All mail" rightIcon={<span>Text</span>} />
            <Divider />

            <ListItem primaryText="Trash" rightIcon={<span>Text</span>} />
            <Divider />

            <ListItem primaryText="Spam" rightIcon={<span>Text</span>} />
            <Divider />

            <ListItem primaryText="Follow up" rightIcon={<span>Text</span>} />
            <Divider />

          </List>
        </main>
      </div>
    );
  }
}
