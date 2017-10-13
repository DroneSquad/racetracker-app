// @flow
import React, { Component } from 'react';
import { Paper, FlatButton } from 'material-ui';

/** Simple react stopwatch used for timing races */
export default class Stopwatch extends Component {
  props: {
    seconds: number,
    isRunning: boolean,
    hasStarted: boolean,
    displayTime: string,
    elapsedTime: number
  };

  constructor(props) {
    super(props);
    this.state = {
      // initial state, fetch from props?
    };
  }

  startHeat = () => {
    console.log("startHeat")
    this.props.startHeat(this.props.activeHeat)
  };

  endHeat = () => {
    console.log("endHeat")
    this.props.stopHeat(this.props.activeHeat)
  };

  newHeat = () => {
    console.log("nextHeat")
    this.props.nextHeat(this.props.activeHeat)
  };

  render() {
    let heat = this.props.activeHeat;
    //Race Clock: 1:00:00
    return (
      <Paper className="heat-action" style={{ display: 'flex' }}>
        {heat.isPending && <p style={{ width: '60vw', marginRight: '0', textAlign: 'left', paddingLeft: '24px' }}>{`Heat ${heat.number} Ready`}</p>}
        {heat.isActive && <p style={{ width: '60vw', marginRight: '0', textAlign: 'left', paddingLeft: '24px' }}>{`Heat ${heat.number} Running`}</p>}
        {heat.isComplete && <p style={{ width: '60vw', marginRight: '0', textAlign: 'left', paddingLeft: '24px' }}>{`Heat ${heat.number} Finished`}</p>}
        {heat.isPending && <FlatButton onClick={this.startHeat} style={{ width: '30vw', marginTop: '6px', marginRight: '24px' }} label="Start Race" />}
        {heat.isActive && <FlatButton onClick={this.endHeat} style={{ width: '30vw', marginTop: '6px', marginRight: '24px' }} label="End Race" />}
        {heat.isComplete && <FlatButton onClick={this.newHeat} style={{ width: '30vw', marginTop: '6px', marginRight: '24px' }} label="New Heat" />}
      </Paper>
    );
  }
}
