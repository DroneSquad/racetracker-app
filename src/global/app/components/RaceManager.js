// @flow
import React from 'react';
import { Dialog, FlatButton } from 'material-ui';

// import race error lookup codes
import { ERR_STOP_HEAT_NO_CONN } from '../modules/race';
// import racetracker mode constants
import { RT_MODE_SHOTGUN, RT_MODE_FLYBY } from '../modules/racetracker';

export default class RaceManager extends React.PureComponent {
  props: {
    isActive: boolean,
    isValid: boolean,
    activeHeat: Object,
    activeTracker: Object,
    activeLaps: Array<Object>,
    raceError: string,
    setIsValid: Function,
    setIsActive: Function,
    startRaceNotifications: Function,
    stopRaceNotifications: Function,
    getMissingLaps: Function,
    setHeatChannels: Function,
    forceStopHeat: Function,
    clearRaceError: Function,
    setTrackerIdle: Function
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
    // on initial startup set any saved race data to inactive and force revalidation
    this.props.setIsActive(false);
    this.props.setIsValid(false);
  }

  componentWillReceiveProps(nextProps) {
    // verify there is an active race and it has been validated
    if (nextProps.isActive && nextProps.isValid) {
      // start race update notifications
      if (nextProps.activeHeat.isActive && nextProps.activeHeat.isActive !== this.props.activeHeat.isActive) {
        this.startRaceNotifications();
      }
      // stop race update notifications
      if (nextProps.activeHeat.isComplete && nextProps.activeHeat.isComplete !== this.props.activeHeat.isComplete) {
        // if the tracker isconnected, fetch any missing laps now
        if (nextProps.activeTracker.isConnected) {
          // if a tracker is connected then fetch any missing laps
          this.getMissingLaps();
        } else {
          // no tracker is connected...
          // TODO: do we really need to fire this? no tracker is avail to receive the command?
          // perhaps another event relies on the error being thrown? investigate when time allows
          this.stopRaceNotifications();
        }

      }
      // handle any race errors (includes: attempt to stop w/ no connection, etc.)
      if (nextProps.raceError && nextProps.raceError !== this.props.raceError) {
        this.configDialog(nextProps.raceError);
      }
      // verify an activeTracker is available for the remaining checks
      if (this.props.activeTracker) {
        // if the activeTrackers racerchannels change then update the active heat, but only if the heat 'isPending'
        if (nextProps.activeHeat.isPending && nextProps.activeTracker.isConnected && nextProps.activeTracker.racerChannels !== this.props.activeTracker.racerChannels)
        {
          this.props.setHeatChannels({ channels: nextProps.activeTracker.racerChannels, heat: nextProps.activeHeat })
        }
        // if a heat is running, then a device has just now recovered from a lost connection
        if (nextProps.activeTracker.isConnected && nextProps.activeTracker.isConnected !== this.props.activeTracker.isConnected)
        {
          let mode = this.props.activeTracker.activeMode;
          if (this.props.activeHeat.isActive) {
            console.log("ActiveHeat-isActive")
            if (mode === RT_MODE_SHOTGUN || mode === RT_MODE_FLYBY) {
              console.log("RT IN RACE MODE - restart notifications")
                this.startRaceNotifications();
            } else {
              console.log("RT NOT IN RACE MODE - update redux");
              this.props.forceStopHeat(this.props.activeHeat.id)
            }
          } else {
            console.log("ActiveHeat-notActive")
            if (mode === RT_MODE_SHOTGUN || mode === RT_MODE_FLYBY) {
              console.log("*RT IN RACE MODE - update RT to idle")
              let r = {
                heatId: this.props.activeHeat.id,
                deviceId: this.props.activeTracker.id
              };
              this.props.setTrackerIdle(r);
            }
            else {
              console.log("*RT NOT IN RACE MODE - do nothing")
            }
          }
        }
        // either the user has chosen to 'disconnect' the tracker, or reconnection attempts have been exhausted, deactivate the race and validation
        if (!nextProps.activeTracker.isConnected && !nextProps.activeTracker.isConnecting && !nextProps.activeTracker.isReconnecting) {
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

  startRaceNotifications = () => {
    let r = {
      heatId: this.props.activeHeat.id,
      deviceId: this.props.activeTracker.id
    };
    this.props.startRaceNotifications(r);
  }

  stopRaceNotifications = () => {
    let r = {
      heatId: this.props.activeHeat.id,
      deviceId: this.props.activeTracker.id
    };
    this.props.stopRaceNotifications(r);
  }

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
