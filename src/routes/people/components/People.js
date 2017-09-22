import React from 'react';
import _ from 'lodash';

import { AppBar, List, ListItem, FontIcon, FloatingActionButton, Subheader } from 'material-ui';

import Person from '../containers/PersonContainer';

import LoadingSpinner from '../../../components/app/LoadingSpinner';

import { historyBackButton } from '../../../utils';

import './people.css';

/** This will display tabs for each section for tab, they keep their state across tabs */
export default class extends React.Component {
  /** Show the action button */
  actionButton(loading) {
    const style = { position: 'absolute', bottom: '16px', right: '16px' };
    return (
      <FloatingActionButton disabled={loading} style={style} onTouchTap={this.props.onNewPilot}>
        <FontIcon className="mdi mdi-plus" />
      </FloatingActionButton>
    );
  }

  /** Display the pilots depending on the type of input */
  displayPilots(pilots) {
    if (_.size(pilots) === 0) {
      return <ListItem>No pilots to load</ListItem>;
    }
    if (Array.isArray(pilots)) {
      return (
        <List>
          {_.map(_.uniqBy(pilots, 'id'), pilot => <Person key={pilot.id} id={pilot.pilotId} />)}
        </List>
      );
    }
    return (
      <div>
        {_.map(pilots, (value, key) =>
          <List key={key}>
            <Subheader>
              {_.startCase(key)}s
            </Subheader>
            {_.map(_.uniqBy(value, 'id'), pilot => <Person key={pilot.id} id={pilot.pilotId} />)}
          </List>
        )}
      </div>
    );
  }

  render() {
    let loading = !this.props.pilots;
    let spinner = <ListItem className="center-text" disabled primaryText={<LoadingSpinner size={30} />} />;
    return (
      <div className="main white-bg people">
        <header>
          <AppBar
            title={this.props.title || 'Pilots'}
            iconClassNameLeft="mdi mdi-close"
            onLeftIconButtonTouchTap={historyBackButton.bind(this)}
          />
        </header>
        <main>
          {loading ? spinner : this.displayPilots(this.props.pilots)}
          {this.props.fab && this.actionButton(loading)}
        </main>
      </div>
    );
  }
}
