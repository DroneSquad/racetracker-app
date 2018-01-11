// @flow
import React from 'react';
// import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton';

export default class RaceManager extends React.PureComponent {
  props: {
    isActive: boolean,
    queryInterval: string,
    activeHeat: Object,
    activeTracker: Object,
    setIsValid: Function,
    setIsActive: Function,
    updateLaps: Function
  };

  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      // open: false
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
    /*if (this.props.isActive && !nextProps.activeTracker.isConnected && !nextProps.isConnecting && !nextProps.isReconnecting) {
      console.log("setRaceIsActive to FALSE")
      console.log(this.props)
      console.log(nextProps)
      this.props.setIsActive(false); // the active tracker has been disconnected, the race is no longer active
    }*/
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
      deviceId: this.props.activeTracker.id
    };
    this.props.updateLaps(r);
  };

  stopIntervalQuery = () => {
    clearInterval(this.state.timer);
  };

  /*handleClose = () => {
    this.setState({open: false});
  };*/

  render() {
    return null;
    /*const actions = [
     <FlatButton
       label="Cancel"
       primary={true}
       onClick={this.handleClose}
     />,
     <FlatButton
       label="Submit"
       primary={true}
       onClick={this.handleClose}
     />,
   ];
   return (
       <div>

         <Dialog

           actions={actions}
           modal={false}
           open={this.state.open}
           onRequestClose={this.handleClose}
         >
           The actions in this window were passed in as an array of React objects.
         </Dialog>
       </div>
     );
     */
  }
}
