import React, { Component } from 'react';
import uuid from 'uuid';

import { Avatar } from 'material-ui'; //'../../../global/app/PilotAvatar';
// import { lazyLoad } from '../../../utils';
// import fetch from '../../../fetch';

import { BLANK_PNG } from '../../../utils';

import { TableRow, TableRowColumn } from 'material-ui';

/** Used to display the pilot info for the heat builder */
export default class Pilot extends Component {
  constructor(props) {
    super(props);
    this.uuid = uuid.v4();
    this.state = {
      loading: false,
      name: 'Unknown',
      avatar: BLANK_PNG //`https://api.dronesquad.com/avatar/${this.props.id}`
    };
  }

  /*componentDidMount() {
    this.lazyLoad = lazyLoad(document.getElementById(this.uuid), () => {
      //todo replace with loopback, this is just to test loading
      fetch.get(`https://api.dronesquad.com/pilot/${this.props.id}`, data => {
        this.setState({
          name: data.callsign || data.display || 'No Pilot Found',
          loading: false
        });
      });
    });
  }*/

  /*componentWillUnmount() {
    this.lazyLoad && this.lazyLoad(); // this will remove the listener from the lazy loader
  }*/

  render() {
    let name = (
      <span style={{ verticalAlign: 'super', paddingLeft: '4px', marginLeft: '2px' }} className="ds-blue-text bar-item">
        {this.state.name}
      </span>
    );
    let avatar = <Avatar size={20} src={this.state.avatar} />;
    return (
      <TableRow id={this.uuid} className={this.state.loading ? 'loading-bar' : ''}>
        <TableRowColumn className="pilot-name">
          {avatar}
          {name}
        </TableRowColumn>
        <TableRowColumn>1</TableRowColumn>
        <TableRowColumn className="no-clip">0:01:00</TableRowColumn>
        <TableRowColumn className="no-clip">0:01:00</TableRowColumn>
        <TableRowColumn>F7</TableRowColumn>
      </TableRow>
    );
  }
}
