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
    if (true) {
      // temp disable the ...
      return <span />;
    }
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
    let { activeHeat, heatChannels } = this.props;
    let title = (
      <span>
        {`Heat ${activeHeat.number}`} {activeHeat.isComplete && `Results `}
        {/* Will show internal heat id when in debug mode */}
        <span style={{ color: '#aaa', fontSize: '12px' }}>{window.isDeveloper && activeHeat.id}</span>
      </span>
    );
    return (
      <Card expanded={false}>
        <CardTitle style={{ paddingBottom: '0' }} title={title} showExpandableButton closeIcon={this.menuDropdown()} />
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn className="pilot-name">Racer</TableHeaderColumn>
              <TableHeaderColumn>Lap</TableHeaderColumn>
              <TableHeaderColumn>Time</TableHeaderColumn>
              <TableHeaderColumn>Best</TableHeaderColumn>
              <TableHeaderColumn>Band</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {heatChannels.map(slot =>
              <Racer id={slot.racer} name={`Racer ${slot.racer}`} channel={slot.channel} heatId={activeHeat.id} />
            )}
          </TableBody>
        </Table>
      </Card>
    );
  }
}
