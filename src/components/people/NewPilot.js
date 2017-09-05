import React from 'react';
import _ from 'lodash';

import {
  AppBar,
  TextField,
  List,
  ListItem,
  FontIcon,
  Subheader,
  Divider,
} from 'material-ui';

import PilotAvatar from '../app/PilotAvatar';
import loadingImg from '../../media/ds-logo-spin.svg';
import { historyBackButton, randomPilotIds } from '../../utils';

class Pilot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      name: 'Unknown',
      channel: 'Unassigned',
      avatar: `https://api.dronesquad.com/avatar/${this.props.id}`
    };
  }

  componentWillMount() {
    // todo replace with loopback, this is just to test loading
    fetch.get(`https://api.dronesquad.com/pilot/${this.props.id}`, data => {
      this.setState({
        name: data.callsign || data.display || 'No Pilot Found',
        loading: false
      });
    });
  }

  /** When the list item was clicked*/
  onClick = () => {

  };

  render() {
    let name = <div className="bar-item" style={{marginBottom: '1px'}}>{this.state.name}</div>;
    let avatar = <PilotAvatar src={this.state.avatar} />;
    return (
      <ListItem onTouchTap={this.onClick} className={this.state.loading ? 'loading-bar' : ''} leftAvatar={avatar} primaryText={name}/>
    );
  }
}

/** This will display tabs for each section for tab, they keep their state across tabs */
export default class NewPilot extends React.Component {

  constructor(props) {
    super(props);
    this.state = {loading: true};
    setTimeout(() => { // todo replace with redux things
      this.setState({loading: false});
    }, 250);
  }

  render() {
    let spinner = <ListItem className="center-text" disabled primaryText={<img src={loadingImg} className="scanning" alt="Loading..." />}/>;
    return (
      <div className="main white-bg">
        <header>
          <AppBar title="Add Pilot" iconClassNameLeft="mdi mdi-arrow-left" onLeftIconButtonTouchTap={historyBackButton.bind(this)}/>
        </header>
        <main>
          <List>
            <ListItem leftIcon={<FontIcon className="mdi mdi-magnify"/>} primaryText={<TextField hintText="Enter name or callsign"/>}/>
            <Divider />
            <ListItem leftIcon={<FontIcon className="mdi mdi-account-multiple-plus"/>} primaryText="New guest" onTouchTap={() => this.props.history.push('/people/guest/new')}/>
          </List>
          <List>
            <Subheader>Pilots</Subheader>
            {this.state.loading ? spinner : _.map(randomPilotIds(), value => <Pilot key={value} id={value} />)}
          </List>
        </main>
      </div>
    )
  }
}
