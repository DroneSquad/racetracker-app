import React from 'react';
import _ from 'lodash';

import {
  List,
  ListItem,
  BottomNavigation,
  BottomNavigationItem,
  FontIcon,
  Divider,
  FloatingActionButton
} from 'material-ui';

import LoadingSpinner from '../../../components/app/LoadingSpinner';
import PilotAvatar from '../../../components/app/PilotAvatar';

import api from '../../../services/api';

import './group.css';

export default class Group extends React.Component {
  /** Display a quick preview of the group members */
  members() {
    let members = this.props.group.members;
    let id = `group-${this.id}-members`;
    let icon = <FontIcon className="mdi mdi-account ds-blue-text" />;
    let avatar = id => <PilotAvatar key={`${id}`} size={25} src={api.urls.avatar(id)} />;
    return (
      <ListItem id={id} className="group-item" leftIcon={icon}>
        {members && _.map(members, member => avatar(member.pilotId))}
        {!members && <LoadingSpinner />}
      </ListItem>
    );
  }

  render() {
    let { name, description } = this.props.group;
    return (
      <List className="group-details">
        {/* The banner / navbar */}
        <ListItem className="group-item">
          <img height={175} src={api.urls.banner(this.id)} alt="" style={{ width: '100%' }} />
        </ListItem>
        <Divider />
        {/* The description of the group, will become the top bar when you scroll past it */}
        <ListItem style={{ minHeight: 150 }} className="group-item ds-white-text ds-blue">
          {name}
          <br />
          {description}
          <br />
          Who Who
        </ListItem>
        <Divider />
        {/* Actions for the user to take */}
        <ListItem className="group-item">
          <BottomNavigation className="group-item">
            <BottomNavigationItem
              key={0}
              label={'name'}
              icon={<FontIcon className={'mdi mdi-account'} />}
              onTouchTap={() => {}}
            />
            <BottomNavigationItem
              key={1}
              label={'name'}
              icon={<FontIcon className={'mdi mdi-account'} />}
              onTouchTap={() => {}}
            />
            <BottomNavigationItem
              key={2}
              label={'name'}
              icon={<FontIcon className={'mdi mdi-account'} />}
              onTouchTap={() => {}}
            />
          </BottomNavigation>
        </ListItem>
        <Divider />
        {/* View Past / Future Meetups */}
        <ListItem className="group-item">
          <List>
            <ListItem>Meetup Card</ListItem>
            <ListItem>Meetup Card</ListItem>
            <ListItem>Meetup Card</ListItem>
          </List>
        </ListItem>
        <ListItem leftIcon={<FontIcon className="mdi mdi-calendar ds-blue-text" />}>14 past meetups</ListItem>
        {/* View the newest pilots and when clicked on go to the pilots view */}
        <Divider />
        {this.members()}
        <FloatingActionButton
          disabled={false}
          style={{ zIndex: 1001, position: 'fixed', bottom: '72px', right: '16px' }}
        >
          <FontIcon className="mdi mdi-plus" />
        </FloatingActionButton>
      </List>
    );
  }
}
