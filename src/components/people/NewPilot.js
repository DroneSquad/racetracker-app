import React from 'react';

import {
  AppBar,
  TextField,
  List,
  ListItem,
  FontIcon,
} from 'material-ui';

import { historyBackButton } from '../../utils';

/** This will display tabs for each section for tab, they keep their state across tabs */
export default class NewPilot extends React.Component {

  constructor(props) {
    super(props);
    this.state = {loading: true};
    setTimeout(() => { // todo replace with redux things
      this.setState({loading: false, saving: false});
    }, 250);
  }

  render() {
    return (
      <div className="main white-bg">
        <header>
          <AppBar title="Add Pilot" iconClassNameLeft="mdi mdi-arrow-left" onLeftIconButtonTouchTap={historyBackButton.bind(this)}/>
        </header>
        <main>
          <List>
            <ListItem leftIcon={<FontIcon className="mdi mdi-magnify"/>} primaryText={<TextField hintText="Enter name or callsign"/>}/>
          </List>
        </main>
      </div>
    )
  }
}
