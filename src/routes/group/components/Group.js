import React from 'react';

import {
  List,
  ListItem,
  BottomNavigation,
  BottomNavigationItem,
  FontIcon,
  Divider,
  FloatingActionButton,
} from 'material-ui';

import PilotAvatar from '../../../components/app/PilotAvatar';

import api from '../../../services/api';

import './group.css'

export default class Group extends React.Component {
  render() {
    let { id, name, description } = this.props.group;
    return (
      <List className="group-details">
        {/* The banner / navbar */}
        <ListItem className="group-item">
          <img src={api.urls.banner(id)} alt="" style={{ width: '100%'}}/>
        </ListItem>
        <Divider/>
        {/* The description of the group, will become the top bar when you scroll past it */}
        <ListItem className="group-item ds-white-text ds-blue">
          {name}<br />
          {description}<br />
          Who Who
        </ListItem>
        <Divider/>
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
        <Divider/>
        {/* View Past / Future Meetups */}
        <ListItem className="group-item">
          <List>
            <ListItem>
              Meetup Card
            </ListItem>
            <ListItem>
              Meetup Card
            </ListItem>
            <ListItem>
              Meetup Card
            </ListItem>
          </List>
        </ListItem>
        <ListItem leftIcon={<FontIcon className="mdi mdi-calendar ds-blue-text"/>}>
          14 past meetups
        </ListItem>
        {/* View the newest pilots and when clicked on go to the pilots view */}
        <Divider />
        <ListItem className="group-item" leftIcon={<FontIcon className="mdi mdi-account ds-blue-text"/>}>
          <PilotAvatar size={25} src={api.urls.avatar(3110)} />
          <PilotAvatar size={25} src={api.urls.avatar(208)} />
          <PilotAvatar size={25} src={api.urls.avatar(8112)} />
        </ListItem>
        <FloatingActionButton disabled={false} style={{zIndex: 1001, position: 'fixed', bottom: '72px', right: '16px'}}>
          <FontIcon className="mdi mdi-plus" />
        </FloatingActionButton>
      </List>
    );
  }
}
