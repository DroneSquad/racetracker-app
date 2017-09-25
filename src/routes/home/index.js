// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { List, ListItem } from 'material-ui';

import api from '../../services/api';
import Logout from '../login/containers/LogoutContainer';

export default class Home extends React.Component {
  state = { pilot: {} };

  componentWillMount() {
    api.pilots.groups(0, 0).then(pilot => {
      this.setState({ groups: pilot.$response.data });
    });
  }

  render() {
    return (
      <div>
        Home Content
        <hr />
        <Link to="/tracker">TBS Race Tracker</Link>
        <hr />
        <Link to="/people">People</Link>
        <hr />
        <Link to="/group/82">A Group</Link>
        <hr />
        <Logout />
        Showing Your Groups Sorted by Location (lat: 0, lng: 0). Do we want to ask user for location permissions here?
        <List>
          {this.state.groups &&
            _.map(this.state.groups, (value, key) =>
              <ListItem key={key}>
                <Link to={`/group/${value.id}`}>
                  {value.name}
                </Link>
              </ListItem>
            )}
          {!this.state.groups && <ListItem>Loading Groups...</ListItem>}
        </List>
      </div>
    );
  }
}
