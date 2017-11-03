import React from 'react';

import { TextField } from 'material-ui';

import Setting from './Setting';

export default class TimeDelaySetting extends Setting {
  props: {
    id: string,
    minLapTime: string,
    setMinLapTime: Function,
    getMinLapTime: Function
  };

  constructor(props) {
    super(props);
    this.props.getMinLapTime(this.props.id);
    this.state.loading = !this.props.minLapTime;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.minLapTime !== nextProps.minLapTime) {
      if (this.state.loading) {
         // this.setState({ loading: false });
         this.doneLoading();
      }
    }
  }

  handleChange = event => {
    if (event.target.value) {
      this.props.setMinLapTime({ device_id: this.props.id, minLapTime: event.target.value });
    }
  };

  LoadingTextField = () => {
    return <TextField className="right" disabled />;
  };

  LoadedTextField = () => {
    return (
      <TextField className="right" type="number" defaultValue={this.props.minLapTime} onChange={this.handleChange} />
    );
  };

  render() {
    return (
      <div className={this.isLoadingClass()} style={{ padding: '0 16px' }}>
        <h3 className="no-margin left push-down-text">Fastest Lap</h3>
        {this.state.loading && <this.LoadingTextField />}
        {!this.state.loading && <this.LoadedTextField />}
        <p className="clear">
          If the timing gate is close to other sections of the track, this will prevent double counting.
        </p>
      </div>
    );
  }
}
