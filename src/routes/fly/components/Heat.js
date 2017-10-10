import React, { Component } from 'react';

import {
  Card,
  CardTitle,
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  IconButton,
  FontIcon,
  IconMenu,
  MenuItem
} from 'material-ui';

import Racer from '../containers/RacerContainer';

/** This will display tabs for each section for tab, they keep their state across tabs */
export default class Heat extends Component {

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
    let { racerChannels, id } = this.props;
    let title = <span>{`Heat ${this.props.number}`}</span>;
    console.log("render-Heat")
    console.log(racerChannels);
    return (
      <Card expanded={false}>
        <CardTitle style={{ paddingBottom: '0' }} title={title} showExpandableButton closeIcon={this.menuDropdown()} />
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn className="pilot-name">Racer</TableHeaderColumn>
              <TableHeaderColumn>Lap</TableHeaderColumn>
              <TableHeaderColumn>Time</TableHeaderColumn>
              <TableHeaderColumn>Total</TableHeaderColumn>
              <TableHeaderColumn>Band</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {racerChannels.map(slot =>
              <Racer id={slot.racer} name={`Racer ${slot.racer}`} channel={slot.channel} heatId={id} /> )}
          </TableBody>
        </Table>
      </Card>
    );
  }
}
