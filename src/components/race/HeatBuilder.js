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
        loading: false,
      });
    });
  }

  render() {
    let name = <span className="bar-item">{this.state.name}</span>;
    let frequency = <span className="bar-item">{this.state.frequency}</span>;
    let avatar = <Avatar className="bar-item" src={this.state.avatar}/>;
    return (
      <div className={this.state.loading ? 'loading-bar' : ''}>
        <CardHeader className="no-padding" title={name} subtitle={frequency} avatar={avatar} />
      </div>
    );
  }
}

/** This will display tabs for each section for tab, they keep their state across tabs */
export default class HeatBuilder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {state: 'Up Next'};
  }

  render() {
    let title = <span className="">{`Heat ${this.props.id} - ${this.state.state}`}</span>;
    return (
      <Card onExpandChange={() => this.props.history.push('/race/heat/edit')}>
        <CardTitle showExpandableButton title={title} closeIcon={<FontIcon className="mdi mdi-dots-vertical"/>}/>
        <Divider/>
        <CardText className="no-padding">
          <List className="no-padding">
            <ListItem disabled primaryText={<Pilot id={Math.floor(Math.random() * 10000)} frequency="F4- 5640"/>}/>
            <ListItem disabled primaryText={<Pilot id={Math.floor(Math.random() * 10000)} frequency="F2- 5730"/>}/>
            <ListItem disabled primaryText={<Pilot id={Math.floor(Math.random() * 10000)} frequency="F6- 5890"/>}/>
            <ListItem disabled primaryText={<Pilot id={Math.floor(Math.random() * 10000)} frequency="R2- 5520"/>}/>
          </List>
        </CardText>
      </Card>
    )
  }
}
