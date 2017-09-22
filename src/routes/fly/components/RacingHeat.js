import React from 'react';
import uuid from 'uuid';

import {
  Card,
  CardTitle,
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  IconButton,
  FontIcon,
  IconMenu,
  MenuItem
} from 'material-ui';

import PilotAvatar from '../../../global/app/PilotAvatar';
import { lazyLoad } from '../../../utils';
import fetch from '../../../fetch';

/** Used to display the pilot info for the heat builder */
export class Pilot extends React.Component {
  constructor(props) {
    super(props);
    this.uuid = uuid.v4();
    this.state = {
      loading: true,
      name: 'Unknown',
      avatar: `https://api.dronesquad.com/avatar/${this.props.id}`
    };
  }

  componentDidMount() {
    this.lazyLoad = lazyLoad(document.getElementById(this.uuid), () => {
      //todo replace with loopback, this is just to test loading
      fetch.get(`https://api.dronesquad.com/pilot/${this.props.id}`, data => {
        this.setState({
          name: data.callsign || data.display || 'No Pilot Found',
          loading: false
        });
      });
    });
  }

  componentWillUnmount() {
    this.lazyLoad && this.lazyLoad(); // this will remove the listener from the lazy loader
  }

  render() {
    let name = (
      <span style={{ verticalAlign: 'super', paddingLeft: '4px', marginLeft: '2px' }} className="ds-blue-text bar-item">
        {this.state.name}
      </span>
    );
    let avatar = <PilotAvatar size={20} src={this.state.avatar} />;
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

/** This will display tabs for each section for tab, they keep their state across tabs */
export default class RacingHeat extends React.Component {
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
        <MenuItem leftIcon={<FontIcon style={styleIcons} className="mdi mdi-restart" />} primaryText="Re-run" />
        <MenuItem
          leftIcon={<FontIcon style={styleIcons} className="mdi mdi-pencil" />}
          primaryText="Edit"
          onTouchTap={() => this.props.history.push('/fly/heat/results/edit')}
        />
        <MenuItem leftIcon={<FontIcon style={styleIcons} className="mdi mdi-delete" />} primaryText="Delete" />
      </IconMenu>
    );
  };

  render() {
    let title = <span>{`Heat ${this.props.id} Results`}</span>;
    return (
      <Card expanded={false}>
        <CardTitle style={{ paddingBottom: '0' }} title={title} showExpandableButton closeIcon={this.menuDropdown()} />
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn className="pilot-name">Pilot</TableHeaderColumn>
              <TableHeaderColumn>Laps</TableHeaderColumn>
              <TableHeaderColumn>Time</TableHeaderColumn>
              <TableHeaderColumn>Total</TableHeaderColumn>
              <TableHeaderColumn>Band</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            <Pilot id={Math.floor(Math.random() * 10000)} />
            <Pilot id={Math.floor(Math.random() * 10000)} />
            <Pilot id={Math.floor(Math.random() * 10000)} />
            <Pilot id={Math.floor(Math.random() * 10000)} />
          </TableBody>
        </Table>
      </Card>
    );
  }
}
