import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { Tabs, Tab, List, ListItem, Paper, FlatButton } from 'material-ui';

import LoadingSpinner from '../../../global/app/LoadingSpinner';
import PilotAvatar from '../../../global/app/PilotAvatar';

import api from '../../../services/api';

import './home.css';

export default class extends React.Component {
  state = {
    index: 0 // the initial index of the tab
  };

  /** Display the meetups */
  rsvps(rsvps) {
    if (rsvps) {
      if (_.size(rsvps) > 0) {
        return _.map(rsvps, (rsvp, key) =>
          <ListItem key={key}>
            {rsvp.status}
          </ListItem>
        );
      }
      return <ListItem>No RSVPS</ListItem>;
    }
    return (
      <ListItem>
        <LoadingSpinner size={30} />
      </ListItem>
    );
  }

  /** Display the groups */
  groups(groups) {
    if (groups) {
      if (_.size(groups) > 0) {
        return _.map(_.sortBy(groups, 'name'), (group, key) =>
          <ListItem key={key} rightIcon={<PilotAvatar style={{ marginTop: '6px' }} src={api.urls.banner(group.id)} />}>
            <Link to={`/group/${group.id}`} style={{ color: '#000', textDecoration: 'none' }}>
              {group.name}
            </Link>
          </ListItem>
        );
      }
      return <ListItem>No Groups</ListItem>;
    }
    return (
      <ListItem>
        <LoadingSpinner size={30} />
      </ListItem>
    );
  }

  /** Handle the change of the tabs */
  handleChange = value => {
    this.setState({ index: value });
    value === 0 && this.props.fetchRsvps();
    value === 1 && this.props.fetchGroups();
  };

  render() {
    return (
      <Paper style={{ margin: '8px', padding: '16px', color: '#666' }}>
        <h3 style={{ color: '#000' }}>Welcome to our Beta</h3>
        Thanks for finding bugs and providing feedback.
        <br />
        <br />
        Please visit the private “Drone Squad Test Pilot” FaceBook group to submit reports and ideas.
        <br />
        <FlatButton
          secondary
          style={{ color: 'var(--ds-blue)' }}
          onTouchTap={() => this.props.history.push('/fly')}
          label="RaceTracker"
        />
        <FlatButton
          secondary
          style={{ color: 'var(--ds-blue)' }}
          onTouchTap={() => (window.location = 'https://www.facebook.com/groups/335400053585698/')}
          label="Facebook"
        />
      </Paper>
    );
    // let { rsvps, groups } = this.props;
    // return (
    //   <div className="home">
    //     <main>
    //       <Tabs initialSelectedIndex={this.state.index} onChange={this.handleChange}>
    //         <Tab value={0} label="Calendar">
    //           <List className="group-meetup-list">
    //             {this.state.index === 0 && this.rsvps(rsvps)}
    //           </List>
    //         </Tab>
    //         <Tab value={1} label="Groups">
    //           <List className="group-meetup-list">
    //             {this.state.index === 1 && this.groups(groups)}
    //           </List>
    //         </Tab>
    //       </Tabs>
    //     </main>
    //   </div>
    // );
  }
}
