// @flow
import React from 'react';
import { Dialog, FlatButton, LinearProgress } from 'material-ui';

// import race error lookup codes
import { ERR_STOP_HEAT_NO_CONN, ERR_START_HEAT_NO_CONN, ERR_START_HEAT_UNKNOWN, ERR_GET_MISSED_LAPS } from '../modules/race';
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
    isAwaitingResponse: boolean,
    setIsValid: Function,
    setIsActive: Function,
    startRaceNotifications: Function,
    getMissingLaps: Function,
    setHeatChannels: Function,
    forceStopHeat: Function,
    clearRaceError: Function,
    setTrackerIdle: Function,
    setAwaitingResponse: Function
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
      progress_bar: false,
      open: false,
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
        // the current heat has ended
        if (nextProps.activeTracker.isConnected) {
          // if a tracker is connected then fetch any missing laps
          this.getMissingLaps();
        } else {
          // no tracker is connected, so fire a fake tbs racetracker response
          this.props.setAwaitingResponse(false)
        }
      }
      // handle any race errors (dialog boxes with user options)
      if (nextProps.raceError && nextProps.raceError !== this.props.raceError) {
        this.configDialog(nextProps.raceError);
      }
      // hide the progress bar if it is currently visible
      if (!nextProps.isAwaitingResponse && nextProps.isAwaitingResponse !== this.props.isAwaitingResponse && this.state.progress_bar) {
        this.showProgressBar(false);
      }
      // verify an activeTracker is available for the remaining checks
      if (this.props.activeTracker) {
        // if the activeTrackers racerchannels change then update the active heat, but only if the heat 'isPending'
        if (nextProps.activeHeat.isPending && nextProps.activeTracker.isConnected && nextProps.activeTracker.racerChannels !== this.props.activeTracker.racerChannels)
        {
          this.props.setHeatChannels({ channels: nextProps.activeTracker.racerChannels, heat: nextProps.activeHeat })
        }
        // if a heat is running, then this indicates that a racetracker has just recovered from a disconnected state
        if (nextProps.activeTracker.isConnected && nextProps.activeTracker.isConnected !== this.props.activeTracker.isConnected)
        {
          let mode = this.props.activeTracker.activeMode;
          if (this.props.activeHeat.isActive) {
            // if the activeHeat is still active
            if (mode === RT_MODE_SHOTGUN || mode === RT_MODE_FLYBY) {
              // and the racetracker is in a race state, then resume notifications
              this.startRaceNotifications();
            } else {
              // if instead the racetracker is idle, halt the heat on the redux side
              this.props.forceStopHeat(this.props.activeHeat.id)
            }
          } else {
            // if instead the activeHeat is not currently active
            if (mode === RT_MODE_SHOTGUN || mode === RT_MODE_FLYBY) {
              // and the racetracker is in a race mode then set the racetracker to idle
              let r = {
                heatId: this.props.activeHeat.id,
                deviceId: this.props.activeTracker.id
              };
              this.props.setTrackerIdle(r);
              this.props.setAwaitingResponse(false)
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

  /*shouldComponentUpdate(nextProps, nextState) {
    // the only reason to ever render is if there is a race error or progressbar to show or remove
    // from the display, else dont bother, save the cycle and move along..
    if (
      (nextProps.raceError && !this.props.raceError) || (this.props.raceError && !nextProps.raceError)  ||
      (nextState.progress_bar && !this.state.progress_bar) || (this.state.progress_bar && !nextState.progress_bar)) {
        return true;
    }
    return false;
  }*/

  getMissingLaps = () => {
    this.showProgressBar(true);  // show progressbar while missing laps are fetched from racetracker
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

  showProgressBar = (show: boolean) => {
    if (!this.state.open) {
      if(show) {
        this.setState({
          title: 'Getting missed laps..',
          main_action: '',
          alt_action: '',
          message: '',
          progress_bar: show
         });
      } else {
        this.setState({
          progress_bar: show
         });
      }
    }
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
      title = 'Stop Race Warning'
      message = 'It looks like the RaceTracker connection has been lost. You may loose some lap information.'
      mainAction = 'clear_race_error'
      mainActionLabel = 'Cancel'
      altAction = 'force_stop_heat'
      altActionLabel = 'End Race'
    }
    // no tracker connection on heat start action
    if (errCode === ERR_START_HEAT_NO_CONN) {
      title = 'Start Race Error'
      message = 'It looks like the RaceTracker connection has been lost'
      mainAction = 'clear_race_error'
      mainActionLabel = 'Ok'
      altAction = ''
      altActionLabel = ''
    }
    // unknown error caused heat start action to fail
    if (errCode === ERR_START_HEAT_UNKNOWN) {
      title = 'Start Race Error'
      message = 'Race failed to start, please try again'
      mainAction = 'clear_race_error'
      mainActionLabel = 'Ok'
      altAction = ''
      altActionLabel = ''
    }
    // unknown error caused heat stop action to fail
    if (errCode === ERR_START_HEAT_UNKNOWN) {
      title = 'Stop Race Error'
      message = 'Race failed to stop, please try again'
      mainAction = 'clear_race_error'
      mainActionLabel = 'Ok'
      altAction = ''
      altActionLabel = ''
    }
    if (errCode === ERR_GET_MISSED_LAPS) {
      title = 'Get Missed Laps Error'
      message = 'An error occured while checking for missed laps'
      mainAction = 'clear_race_error'
      mainActionLabel = 'Ok'
      altAction = ''
      altActionLabel = ''
    }
    // set the state using the errcode informtion selected
    this.setState({
      title: title,
      message: message,
      main_action: mainAction,
      main_action_label: mainActionLabel,
      alt_action: altAction,
      alt_action_label: altActionLabel,
      open: !!errCode,
      progress_bar: false  // remove any progressbars that may be visible
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
    let { message, title, main_action, main_action_label, alt_action, alt_action_label, open, primary, progress_bar } = this.state;
    let show = false;
    if (open || progress_bar) {
      show = true
    }
    const actions = []
    if (alt_action) {
      actions.push(
        <FlatButton
          label={alt_action_label}
          primary={primary}
          onClick={this.handleAltActionClick}
        />
      )
    }
    if (main_action) {
      actions.push(
        <FlatButton
          label={main_action_label}
          primary={primary}
          onClick={this.handleMainActionClick}
        />
      )
    }
   return (
     <div>
         <Dialog
           title={title}
           actions={actions}
           modal={progress_bar}
           open={show}
           onRequestClose={this.handleRequestClose}
         >
        {message}
        {progress_bar && <LinearProgress mode="indeterminate" />}
        </Dialog>
       </div>
     );
  }
}
