// @flow
import React from 'react';

export default class RaceManager extends React.PureComponent {
  props: {
    queryInterval: string,
    trackerId: string,
    activeHeat: Object,
    setIsValid: Function,
    updateLaps: Function
  };

  constructor(props) {
    super(props);
    this.state = {
      timer: null
    };
  }

  componentDidMount() {
    this.props.setIsValid(false);  // indicates startup, verify any race settings
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeHeat.isActive && nextProps.activeHeat.isActive !== this.props.activeHeat.isActive) {
      this.startIntervalQuery();
    }
    if (nextProps.activeHeat.isComplete && nextProps.activeHeat.isComplete !== this.props.activeHeat.isComplete) {
      this.stopIntervalQuery();
    }
  }

  // dont bother doing renders
  shouldComponentUpdate(nextProps, nextState) {
    // return false;
  }

  startIntervalQuery = () => {
    let interval = this.props.queryInterval * 1000;
    let timer = setInterval(() => {
      this.intervalQuery();
    }, interval);
    this.setState({ timer });
  };

  intervalQuery = () => {
    let r = {
      heatId: this.props.activeHeat.id,
      deviceId: this.props.trackerId
    };
    this.props.updateLaps(r);
  };

  stopIntervalQuery = () => {
    clearInterval(this.state.timer);
  };

  render() {
    return null;
  }
}
