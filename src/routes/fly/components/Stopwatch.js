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
    elapsedTime: number,
    queryInterval: string
  };

  constructor(props) {
    super(props);
    this.state = {
      timer: null
    };
  }

  startIntervalQuery = () => {
    let interval = 1000;
    if (this.props.queryInterval) {
      interval = this.props.queryInterval * 1000;
    }
    let timer = setInterval(() => {
      this.intervalQuery();
    }, interval);
    this.setState({ timer });
  };

  intervalQuery = () => {
    let r = {
      heat: this.props.activeHeat.id,
      device_id: this.props.trackerId
    };
    this.props.updateLaps(r);
  };

  stopIntervalQuery = () => {
    clearInterval(this.state.timer);
  };

  startHeat = () => {
    let r = {
      heatId: this.props.activeHeat.id,
      raceMode: this.props.raceMode,
      device_id: this.props.trackerId
    };
    this.props.startHeat(r);
    this.startIntervalQuery();
  };

  endHeat = () => {
    let r = {
      heatId: this.props.activeHeat.id,
      device_id: this.props.trackerId
    };
    this.props.stopHeat(r);
    this.stopIntervalQuery();
  };

  createHeat = () => {
    let r = {
      raceId: this.props.activeHeat.raceId,
      racerChannels: this.props.racerChannels,
      currentHeat: this.props.activeHeat
    };
    this.props.createHeat(r);
  };

  render() {
    let heat = this.props.activeHeat;
    //Race Clock: 1:00:00
    return (
      <Paper className="heat-action" style={{ display: 'flex' }}>
        {heat.isPending &&
          <p
            style={{ width: '60vw', marginRight: '0', textAlign: 'left', paddingLeft: '24px' }}
          >{`Heat ${heat.number} Ready`}</p>}
        {heat.isActive &&
          <p
            style={{ width: '60vw', marginRight: '0', textAlign: 'left', paddingLeft: '24px' }}
          >{`Heat ${heat.number} Running`}</p>}
        {heat.isComplete &&
          <p
            style={{ width: '60vw', marginRight: '0', textAlign: 'left', paddingLeft: '24px' }}
          >{`Heat ${heat.number} Finished`}</p>}
        {heat.isPending &&
          <FlatButton
            onClick={this.startHeat}
            style={{ width: '30vw', marginTop: '6px', marginRight: '24px' }}
            label="Start Race"
          />}
        {heat.isActive &&
          <FlatButton
            onClick={this.endHeat}
            style={{ width: '30vw', marginTop: '6px', marginRight: '24px' }}
            label="End Race"
          />}
        {heat.isComplete &&
          <FlatButton
            onClick={this.createHeat}
            style={{ width: '30vw', marginTop: '6px', marginRight: '24px' }}
            label="New Heat"
          />}
      </Paper>
    );
  }
}
