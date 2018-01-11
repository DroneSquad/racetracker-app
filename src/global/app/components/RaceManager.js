// @flow
import React from 'react';
// import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton';

export default class RaceManager extends React.PureComponent {
  props: {
    isActive: boolean,
    isValid: boolean,
    queryInterval: string,
    activeHeat: Object,
    activeTracker: Object,
    setIsValid: Function,
    setIsActive: Function,
    getRaceUpdate: Function
  };

  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      // open: false
    };
  }

  componentDidMount() {
    this.props.setIsValid(false);  // indicates startup, verify any race settings next
  }

  componentWillReceiveProps(nextProps) {
    // start race update interval query
    if (nextProps.activeHeat.isActive && nextProps.activeHeat.isActive !== this.props.activeHeat.isActive) {
      console.log("startIntervalQuery")
      this.startIntervalQuery();
    }
    // stop race update interval query
    if (nextProps.activeHeat.isComplete && nextProps.activeHeat.isComplete !== this.props.activeHeat.isComplete) {
      console.log("stopIntervalQuery")
      this.stopIntervalQuery();
    }

    if (this.props.activeTracker) {
      // the race is running the device just reconnected to the rt after a disconnect
      if (nextProps.activeTracker.isConnected && nextProps.isActive && nextProps.isValid && nextProps.activeTracker.isConnected !== this.props.activeTracker.isConnected)
      {
        // TODO: should we run querys from this point or do it all at the end of the race
        console.log("race is active & valid, and activeTracker just reconnected from lost connection")
      }

      // if reconnections have failed, or user chose to disconnect, deactivate the race and validation
      if (nextProps.isActive && nextProps.isValid && !nextProps.activeTracker.isConnected && !nextProps.activeTracker.isConnecting && !nextProps.activeTracker.isReconnecting) {
        console.log("tracker has been disconnected, disable the active state and validation of the race")
        this.props.setIsActive(false); // the active tracker has been disconnected, the race is no longer active
        this.props.setIsValid(false);
      }
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
      deviceId: this.props.activeTracker.id
    };
    this.props.getRaceUpdate(r);
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
