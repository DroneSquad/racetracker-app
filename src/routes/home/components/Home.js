import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { Tabs, Tab, List, ListItem } from 'material-ui';

import LoadingSpinner from '../../../global/app/LoadingSpinner';
import PilotAvatar from '../../../global/app/PilotAvatar';

import api from '../../../services/api';

import './home.css';

export default class extends React.Component {
  state = {
    index: 0, // the initial index of the tab
  };

  /** Display the meetups */
  rsvps(rsvps) {
    if (rsvps) {
      if (_.size(rsvps) > 0) {
        return _.map(rsvps, (rsvp, key) => <ListItem key={key}>{rsvp.status}</ListItem>);
      }
      return <ListItem>No RSVPS</ListItem>;
    }
    return <ListItem><LoadingSpinner size={30}/></ListItem>;
  }

  /** Display the groups */
  groups(groups) {
    if (groups) {
      if (_.size(groups) > 0) {
        return _.map(_.sortBy(groups, 'name'), (group, key) => (
          <ListItem key={key} rightIcon={<PilotAvatar src={api.urls.banner(group.id)} />}>
            <Link to={`/group/${group.id}`}>{group.name}</Link>
          </ListItem>
        ));
      }
      return <ListItem>No Groups</ListItem>;
    }
    return <ListItem><LoadingSpinner size={30}/></ListItem>;
  }

  /** Handle the change of the tabs */
  handleChange = (value) => {
    this.setState({ index: value });
    value === 0 && this.props.fetchRsvps();
    value === 1 && this.props.fetchGroups();
  };

  render() {
    let { rsvps, groups } = this.props;
    return (
      <div className="home">
        <main>
          <Tabs initialSelectedIndex={this.state.index} onChange={this.handleChange}>
            <Tab value={0} label="Calendar">
              <List className="group-meetup-list">
                {this.state.index === 0 && this.rsvps(rsvps)}
              </List>
            </Tab>
            <Tab value={1} label="Groups">
              <List className="group-meetup-list">
                {this.state.index === 1 && this.groups(groups)}
              </List>
            </Tab>
          </Tabs>
        </main>
      </div>
    );
  }
}
