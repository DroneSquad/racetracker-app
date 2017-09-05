import React from 'react';
import _ from 'lodash';

import {
  AppBar,
  List,
  ListItem,
  FontIcon,
  IconButton,
  FloatingActionButton,
} from 'material-ui';

import PilotAvatar from '../app/PilotAvatar';
import loadingImg from '../../media/ds-logo-spin.svg';
import { historyBackButton, randomPilotIds } from '../../utils';
import fetch from '../../fetch';

import './people.css';

class Person extends React.Component {
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

  /** When the icon was clicked */
  onClickIcon = () => {

  };

  render() {
    let name = <div className="bar-item" style={{marginBottom: '1px'}}>{this.state.name}</div>;
    let avatar = <PilotAvatar src={this.state.avatar} />;
    let channel = <span className="bar-item">{this.state.channel}</span>;
    let icon = <IconButton style={{ padding: '0' }} onTouchTap={this.onClickIcon} children={<FontIcon className="mdi mdi-clipboard-outline"/>}/>;
    return (
      <ListItem onTouchTap={this.onClick} className={this.state.loading ? 'loading-bar' : ''} leftAvatar={avatar} primaryText={name} secondaryText={channel} rightIcon={icon}/>
    );
  }
}

/** This will display tabs for each section for tab, they keep their state across tabs */
export default class NewGuest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {loading: true};
    setTimeout(() => { // todo replace with redux things
      this.setState({loading: false});
    }, 250);
  }

  onNewPilot = () => {
    this.props.history.push('/people/new');
  };

  render() {
    let spinner = <ListItem className="center-text" disabled primaryText={<img src={loadingImg} className="fetching" alt="Loading..." />}/>;
    return (
      <div className="main white-bg people">
        <header>
          <AppBar title="Pilots" iconClassNameLeft="mdi mdi-close" onLeftIconButtonTouchTap={historyBackButton.bind(this)}/>
        </header>
        <main>
          <List>
            {this.state.loading ? spinner : _.map(randomPilotIds(), value => <Person key={value} id={value} />)}
          </List>
          <FloatingActionButton disabled={this.state.loading} style={{position: 'absolute', bottom: '16px', right: '16px'}} onTouchTap={this.onNewPilot}>
            <FontIcon className="mdi mdi-plus" />
          </FloatingActionButton>
        </main>
      </div>
    )
  }
}
