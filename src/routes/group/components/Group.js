import React from 'react';
import _ from 'lodash';

import { List, ListItem, BottomNavigation, BottomNavigationItem, FontIcon, Divider } from 'material-ui';

import GroupBanner from './GroupBanner';
import LoadingSpinner from '../../../global/app/LoadingSpinner';
import PilotAvatar from '../../../global/app/PilotAvatar';

import api from '../../../services/api';

import { formatAddress, pluritize } from '../../../utils';

import './group.css';

export default class Group extends React.Component {
  /** Display a quick preview of the group members */
  members() {
    let members = this.props.group.members;
    let id = `group-${this.id}-members`;
    let icon = <FontIcon className="mdi mdi-account ds-blue-text" style={{ padding: '8px', fontSize: '25px' }} />;
    let avatar = id => <PilotAvatar key={`${id}`} size={25} src={api.urls.avatar(id)} />;
    return (
      <ListItem
        id={id}
        className="group-item recent-pilots"
        leftIcon={icon}
        onTouchTap={() => this.props.showMembers(this.id)}
      >
        {members && _.map(members, member => avatar(member.pilotId))}
        {!members && <LoadingSpinner />}
      </ListItem>
    );
  }

  /** Generate the actions one can take on this group */
  groupActions() {
    return _.map(this.props.actions, (action, key) =>
      <BottomNavigationItem
        key={key}
        label={
          <span className="ds-blue-text">
            {action.name}
          </span>
        }
        icon={<FontIcon className={`ds-blue-text mdi mdi-${action.logo}`} />}
        onTouchTap={() => action.action && action.action(action)}
      />
    );
  }

  render() {
    let { name, admin, loading, memberCount } = this.props.group;
    return (
      <List className="group-details">
        {/* The banner / navbar */}
        <ListItem className="group-item banner">
          <GroupBanner height={175} src={this.id} />
        </ListItem>
        <Divider />
        {/* The description of the group, will become the top bar when you scroll past it */}
        <ListItem className="group-item ds-white-text ds-blue info">
          <div className={loading && 'loading-bar'}>
            <div className="bar-item group-name">
              {name}
            </div>
            <div className="bar-item group-info">
              We are a group of {memberCount || 1} {pluritize('pilot', memberCount)} in{' '}
              {formatAddress(this.props.group)}
            </div>
            <div className="bar-item group-admins">
              Organised by {admin}
            </div>
          </div>
        </ListItem>
        <Divider />
        {/* Actions for the user to take */}
        <ListItem className="group-item actions">
          <BottomNavigation className="group-item">
            {this.groupActions()}
          </BottomNavigation>
        </ListItem>
        <Divider />
        {/* View the newest pilots and when clicked on go to the pilots view */}
        <Divider />
        {this.members()}
      </List>
    );
  }
}
