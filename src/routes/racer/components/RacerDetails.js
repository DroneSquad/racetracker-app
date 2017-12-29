import React, { Component } from 'react';

import _ from 'lodash';

import { AppBar, Paper, GridList, Table, TableHeader, TableBody, TableRow, TableHeaderColumn } from 'material-ui';

import RacerDetailHeaderItem from './RacerDetailHeaderItem';
import RacerDetailLapTime from './RacerDetailLapTime';

import { historyBackButton, msToClock } from '../../../utils';

/** Used to display the pilot info for the heat builder */
export default class RacerDetails extends Component {
  debugInfo() {
    let { heatId, racerId, laps } = this.props;
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#aaa' }}>- DEBUG -</div>
        <div style={{ color: '#bbb' }}>
          Heat Id: {heatId}
        </div>
        <div style={{ color: '#bbb' }}>
          Racer Id: {racerId}
        </div>
        <pre style={{ color: '#bbb' }}>
          Laps: {JSON.stringify(laps, '', 1)}
        </pre>
      </div>
    );
  }

  render() {
    let { person, heat, total, bestLap, laps } = this.props;
    return (
      <div className="main">
        <header>
          <AppBar
            title={person || 'Null'}
            iconClassNameLeft="mdi mdi-arrow-left"
            onLeftIconButtonTouchTap={historyBackButton.bind(this)}
          />
        </header>
        <main>
          <Paper>
            <GridList cols={3} cellHeight="100%">
              <RacerDetailHeaderItem title="Heat" body={(heat || 0) + ''} />
              <RacerDetailHeaderItem title="Total" body={msToClock(total || 0)} />
              <RacerDetailHeaderItem title="Best Lap" body={msToClock(bestLap || 0)} />
            </GridList>
          </Paper>
          <Table selectable={false} style={{ backgroundColor: 'none' }}>
            <TableHeader enableSelectAll={false} displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>
                  <strong style={{ color: '#333' }}>Lap</strong>
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <strong style={{ color: '#333' }}>Time</strong>
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {laps &&
                _.map(
                  laps,
                  (lap, index) =>
                    typeof lap === 'object'
                      ? <RacerDetailLapTime lap={lap.lap} time={lap.time} />
                      : <RacerDetailLapTime lap={index + 1} time={lap} />
                )}
              {!laps && <RacerDetailLapTime lap="1" time="0.000" />}
            </TableBody>
          </Table>
          {window.isDeveloper && this.debugInfo()}
        </main>
      </div>
    );
  }
}
