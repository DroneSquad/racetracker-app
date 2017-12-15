// @flow
import React, { Component } from 'react';
import { Paper, RaisedButton } from 'material-ui';

/** Simple react stopwatch used for timing races */
export default class Stopwatch extends Component {
  props: {
    activeHeat: Object,
    raceMode: string,
    queryInterval: string,
    trackerId: string,
    racerChannels: Array<Object>,
    startHeat: Function,
    stopHeat: Function,
    createHeat: Function,
    updateLaps: Function
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
      deviceId: this.props.trackerId
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
      deviceId: this.props.trackerId
    };
    if (this.props.raceMode === 'shotgun') {
      this.props.startShotgunHeat(r);
    } else {
      this.props.startFlyoverHeat(r);
    }
    this.startIntervalQuery();
  };

  endHeat = () => {
    let r = {
      heatId: this.props.activeHeat.id,
      deviceId: this.props.trackerId
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
    let btnStyle = { width: '30vw', marginTop: '4px', boxShadow: 'none', marginRight: '24px' };
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
        {heat.isPending && <RaisedButton primary onClick={this.startHeat} style={btnStyle} label="Start Race" />}
        {heat.isActive && <RaisedButton primary onClick={this.endHeat} style={btnStyle} label="End Race" />}
        {heat.isComplete && <RaisedButton primary onClick={this.createHeat} style={btnStyle} label="New Heat" />}
      </Paper>
    );
  }
}
