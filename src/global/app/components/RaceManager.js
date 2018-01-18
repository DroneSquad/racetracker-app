// @flow
import React from 'react';
import { Dialog, FlatButton } from 'material-ui';

// import race error lookup codes
import { ERR_STOP_HEAT_NO_CONN } from '../modules/race';

export default class RaceManager extends React.PureComponent {
  props: {
    isActive: boolean,
    isValid: boolean,
    queryInterval: string,
    activeHeat: Object,
    activeTracker: Object,
    activeLaps: Array<Object>,
    raceError: string,
    setIsValid: Function,
    setIsActive: Function,
    getRaceUpdate: Function,
    getMissingLaps: Function,
    setHeatChannels: Function,
    forceStopHeat: Function,
    clearRaceError: Function
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      message: '',
      main_action: '',
      main_action_label: '',
      alt_action: '',
      alt_action_label: '',
      primary: true,
      open: false
    };
  }

  componentDidMount() {
    this.props.setIsValid(false);  // this happens on app startup, set any previous settings to invalid and recheck
  }

  componentWillReceiveProps(nextProps) {
    // verify there is an active race and it has been validated
    if (nextProps.isActive && nextProps.isValid) {
      // start race update interval query
      if (nextProps.activeHeat.isActive && nextProps.activeHeat.isActive !== this.props.activeHeat.isActive) {
        console.log("RaceManager-startIntervalQuery")
        this.startIntervalQuery();
      }
      // stop race update interval query
      if (nextProps.activeHeat.isComplete && nextProps.activeHeat.isComplete !== this.props.activeHeat.isComplete) {
        console.log("RaceManager-stopIntervalQuery")
        this.stopIntervalQuery();
        // if the tracker isconnected, fetch any missing laps now
        if (nextProps.activeTracker.isConnected) {
          console.log("RaceManager-getMissingLaps")
          this.getMissingLaps();
        }
      }
      // handle any race errors (includes: attempt to stop w/ no connection, etc.)
      if (nextProps.raceError && nextProps.raceError !== this.props.raceError) {
        console.log("RaceManager-configDialog()")
        this.configDialog(nextProps.raceError);
      }
      // verify an activeTracker is available for the following checks
      if (this.props.activeTracker) {
        // if the activeTrackers racerchannels change then update the active heat, if the heat isPending
        if (nextProps.activeHeat.isPending && nextProps.activeTracker.isConnected && nextProps.activeTracker.racerChannels !== this.props.activeTracker.racerChannels)
        {
          console.log("RaceManager-setHeatChannels")
          this.props.setHeatChannels({ channels: nextProps.activeTracker.racerChannels, heat: nextProps.activeHeat })
        }
        // if a heat is running, the device has just recovered from a lost connection
        if (nextProps.activeTracker.isConnected && nextProps.activeTracker.isConnected !== this.props.activeTracker.isConnected)
        {
          console.log("RaceManager-activeRace-Reconnected")
          // TODO: we could/should run a check to get the mode of the tracker, and perhaps fetch missing laps
        }
        // either the user has chosen to 'disconnect' the tracker, or reconnection attempts have been exhausted, deactivate the race and validation
        if (!nextProps.activeTracker.isConnected && !nextProps.activeTracker.isConnecting && !nextProps.activeTracker.isReconnecting) {
          console.log("RaceManager-Deactive/Unvalidate-ActiveDisconnect")
          this.props.setIsActive(false);
          this.props.setIsValid(false);
        }
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // the only reason to ever render is if there is a race error to show or clear
    // from the display for the user. else dont bother, save the cycle and move along..
    if ((nextProps.raceError && !this.props.raceError) || (this.props.raceError && !nextProps.raceError)) {
      return true;
    }
    return false;
  }

  getMissingLaps = () => {
    let cl = this.props.activeHeat.racerChannels.map(chan => ({
      racer: chan.racer,
      laps: this.props.activeLaps.filter(t => t.racer === chan.racer).map(t => t.lap),
      deviceId: this.props.activeTracker.id,
      heatId: this.props.activeHeat.id
    }));
    this.props.getMissingLaps(cl);
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

  configDialog(errCode) {
    let title = '';
    let message = '';
    let mainAction = '';
    let mainActionLabel = '';
    let altAction = '';
    let altActionLabel = '';
    // no tracker connection on heat stop action
    if (errCode === ERR_STOP_HEAT_NO_CONN) {
      title = 'Stop Heat Warning'
      message = 'There is no connection to a RaceTracker. Ending the race may result in lost data.'
      mainAction = 'clear_race_error'
      mainActionLabel = 'Cancel'
      altAction = 'force_stop_heat'
      altActionLabel = 'End Heat'
    }
    this.setState({
      title: title,
      message: message,
      main_action: mainAction,
      main_action_label: mainActionLabel,
      alt_action: altAction,
      alt_action_label: altActionLabel,
      open: !!errCode
    });
  }

  doCloseEvents = (action: string) => {
    if (action === 'clear_race_error') {
      this.props.clearRaceError();
    }
    if (action === 'force_stop_heat') {
      this.props.forceStopHeat(this.props.activeHeat.id)
    }
    this.setState({
      open: false
    });
  };

  handleAltActionClick = () => {
    let action = this.state.alt_action;
    this.doCloseEvents(action);
  };

  handleMainActionClick = () => {
    let action = this.state.main_action;
    this.doCloseEvents(action);
  };

  handleRequestClose = (reason: string) => {
    let action = this.state.main_action;
    this.doCloseEvents(action);
  };

  render() {
    let { message, title, main_action_label, alt_action_label, open, primary } = this.state;
    const actions = [
     <FlatButton
       label={alt_action_label}
       primary={primary}
       onClick={this.handleAltActionClick}
     />,
     <FlatButton
       label={main_action_label}
       primary={primary}
       onClick={this.handleMainActionClick}
     />,
   ];
   return (
       <div>
         <Dialog
           title={title}
           actions={actions}
           modal={false}
           open={open}
           onRequestClose={this.handleRequestClose}
         >
           {message}
         </Dialog>
       </div>
     );
  }
}
