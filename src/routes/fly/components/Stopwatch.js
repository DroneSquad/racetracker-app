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

  render() {
    // let title = <span>{`Heat ${this.props.id} Results`}</span>;
    return (
    <Paper className="heat-action" style={{ display: 'flex' }}>
      <p style={{ width: '60vw', marginRight: '0', textAlign: 'left', paddingLeft: '24px' }}>Race Clock: 1:00:00</p>
      <FlatButton primary style={{ width: '30vw', marginTop: '6px', marginRight: '24px' }} label="Stop Race" />
    </Paper>
    );
  }
}
