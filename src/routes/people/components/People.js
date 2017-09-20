import React from 'react';
import _ from 'lodash';

import { AppBar, List, ListItem, FontIcon, FloatingActionButton } from 'material-ui';

import Person from './Person';

import loadingImg from '../../../media/ds-logo-spin.svg';
import { historyBackButton, randomPilotIds } from '../../../utils';

import './people.css';

/** This will display tabs for each section for tab, they keep their state across tabs */
export default class People extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    setTimeout(() => {
      // todo replace with redux things
      this.setState({ loading: false });
    }, 250);
  }

  onNewPilot = () => {
    this.props.history.push('/people/new');
  };

  render() {
    let spinner = (
      <ListItem
        className="center-text"
        disabled
        primaryText={<img src={loadingImg} className="fetching" alt="Loading..." />}
      />
    );
    return (
      <div className="main white-bg people">
        <header>
          <AppBar
            title="Pilots"
            iconClassNameLeft="mdi mdi-close"
            onLeftIconButtonTouchTap={historyBackButton.bind(this)}
          />
        </header>
        <main>
          <List>
            {this.state.loading ? spinner : _.map(randomPilotIds(), value => <Person key={value} id={value} />)}
          </List>
          <FloatingActionButton
            disabled={this.state.loading}
            style={{ position: 'absolute', bottom: '16px', right: '16px' }}
            onTouchTap={this.onNewPilot}
          >
            <FontIcon className="mdi mdi-plus" />
          </FloatingActionButton>
        </main>
      </div>
    );
  }
}
