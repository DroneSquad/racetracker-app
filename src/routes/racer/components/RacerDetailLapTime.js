import React, { Component } from 'react';

import { TableRow, TableRowColumn } from 'material-ui';

import { msToClock } from '../../../utils';

export default class RacerDetailLapTime extends Component {
  render() {
    let { lap, time } = this.props;
    return (
      <TableRow displayBorder={false}>
        <TableRowColumn>
          {lap}
        </TableRowColumn>
        <TableRowColumn>
          {msToClock(time || 0)}
        </TableRowColumn>
      </TableRow>
    );
  }
}
