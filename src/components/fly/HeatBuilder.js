import React from 'react';

import {
  ListItem,
  Card,
  CardTitle,
  CardText,
  List,
  CardHeader,
  Divider,
  Avatar,
  FontIcon,
  IconMenu,
  MenuItem,
  IconButton
} from 'material-ui';

import fetch from '../../fetch';

/** Used to display the pilot info for the heat builder */
export class Pilot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      avatar: `https://api.dronesquad.com/avatar/${this.props.id}`,
      name: 'Unknown Name',
      frequency: props.frequency || 'N/A - 0000'
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

  render() {
    let name = (
      <span className="bar-item">
        {this.state.name}
      </span>
    );
    let frequency = (
      <span className="bar-item">
        {this.state.frequency}
      </span>
    );
    let avatar = <Avatar className="bar-item" src={this.state.avatar} />;
    return (
      <div className={this.state.loading ? 'loading-bar' : ''}>
        <CardHeader
          className="no-padding"
          titleStyle={{ margin: '2px 0' }}
          title={name}
          subtitle={frequency}
          avatar={avatar}
        />
      </div>
    );
  }
}

/** This will display tabs for each section for tab, they keep their state across tabs */
export default class HeatBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { state: 'Up Next' };
  }

  /** The drop down menu for the options menu */
  menuDropdown = () => {
    let styleIcons = { margin: '0 0 0 8px' };
    let icon = (
      <IconButton style={{ margin: '-12px' }}>
        <FontIcon className="no-padding ds-gray-alt-text mdi mdi-dots-vertical" />
      </IconButton>
    );
    return (
      <IconMenu iconButtonElement={icon}>
        <MenuItem
          leftIcon={<FontIcon style={styleIcons} className="mdi mdi-clock-start" />}
          primaryText="Start"
        />
        <MenuItem
          leftIcon={<FontIcon style={styleIcons} className="mdi mdi-pencil" />}
          primaryText="Edit"
          onTouchTap={() => this.props.history.push('/fly/heat/edit')}
        />
        <MenuItem
          leftIcon={<FontIcon style={styleIcons} className="mdi mdi-delete" />}
          primaryText="Delete"
        />
      </IconMenu>
    );
  };

  render() {
    let title = <span className="">{`Heat ${this.props.id} - ${this.state.state}`}</span>;
    return (
      <Card expanded={false}>
        <CardTitle title={title} showExpandableButton closeIcon={this.menuDropdown()} />
        <Divider />
        <CardText className="no-padding">
          <List className="no-padding">
            <ListItem
              disabled
              primaryText={<Pilot id={Math.floor(Math.random() * 10000)} frequency="F4- 5640" />}
            />
            <ListItem
              disabled
              primaryText={<Pilot id={Math.floor(Math.random() * 10000)} frequency="F2- 5730" />}
            />
            <ListItem
              disabled
              primaryText={<Pilot id={Math.floor(Math.random() * 10000)} frequency="F6- 5890" />}
            />
            <ListItem
              disabled
              primaryText={<Pilot id={Math.floor(Math.random() * 10000)} frequency="R2- 5520" />}
            />
          </List>
        </CardText>
      </Card>
    );
  }
}
