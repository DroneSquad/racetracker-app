import React from 'react';

import {
  AppBar,
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableRowColumn,
  TableHeaderColumn,
  TextField,
  Divider,
  Snackbar,
  IconButton,
} from 'material-ui';

import { historyBackButton } from '../../utils';

class HeatResultRow extends React.Component {

  static id = 0;

  constructor(props) {
    super(props);
    this.state = {id: ++HeatResultRow.id, loading: true};
    setTimeout(() => { // todo replace with redux things
      this.setState({snackBar: null, loading: false, heatTime: '5:32.123'});
    }, 250);
  }

  /** Update the heat time, needs converting, hours are mins and mins are seconds */
  onHeatTime = (event, value) => {
    this.setState({heatTime: value});
  };

  /** When the time is deleted */
  onDelete = () => {
    this.setState({snackBar: 'Your time was deleted'});
  };

  /** When the time is split */
  onSplit = () => {
    this.setState({snackBar: `Lap ${this.state.id} split`});
  };

  onSnackBar = () => {
    this.setState({snackBar: null});
  };

  render() {
    return (
      <TableRow className={this.state.loading ? 'loading-bar' : ''}>
        <TableRowColumn>{this.state.id}</TableRowColumn>
        <TableRowColumn className="no-clip">
          <TextField value={this.state.heatTime} onChange={this.onHeatTime}/>
          {/*<TimePicker format="24hr" value={this.state.heatTime} onChange={this.onHeatTime}/>*/}
        </TableRowColumn>
        <TableRowColumn>
          <IconButton iconClassName="mdi mdi-call-split ds-gray-alt-text rotate-90" onTouchTap={this.onSplit} />
        </TableRowColumn>
        <TableRowColumn>
          <IconButton iconClassName="mdi mdi-delete ds-gray-alt-text" onTouchTap={this.onDelete}/>
        </TableRowColumn>
        <Snackbar open={!!this.state.snackBar} message={this.state.snackBar || ''} autoHideDuration={4000} action="undo" onRequestClose={this.onSnackBar}/>
      </TableRow>
    );
  }
}

/** This will display tabs for each section for tab, they keep their state across tabs */
export default class HeatResultEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {loading: true};
    setTimeout(() => { // todo replace with redux things
      this.setState({loading: false, heatPoints: 4});
    }, 250);
  }

  /** Update heat points */
  onHeatPoints = (event, value) => {
    this.setState({heatPoints: value});
  };

  render() {
    let title = <span className="ds-blue-text">Heat Results</span>;
    return (
      <div className="main heat-lineup">
        <header>
          <AppBar className="ds-white" title={title} iconClassNameLeft="ds-gray-alt-text mdi mdi-close" onLeftIconButtonTouchTap={historyBackButton.bind(this)} iconClassNameRight="ds-gray-alt-text mdi mdi-check" onRightIconButtonTouchTap={historyBackButton.bind(this)}/>
        </header>
        <main>
          <span style={{padding: '0 16px', width: '50vw'}}>Heat 0 Points: </span>
          <TextField id="heatPoints" style={{width: '50vw'}} disabled={this.state.loading} value={this.state.heatPoints || ''} onChange={this.onHeatPoints}/>
          <Divider/>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Laps</TableHeaderColumn>
                <TableHeaderColumn>Time</TableHeaderColumn>
                <TableHeaderColumn>&nbsp;</TableHeaderColumn>
                <TableHeaderColumn>&nbsp;</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              <HeatResultRow />
              <HeatResultRow />
              <HeatResultRow />
              <HeatResultRow />
            </TableBody>
          </Table>
        </main>
      </div>
    )
  }
}
