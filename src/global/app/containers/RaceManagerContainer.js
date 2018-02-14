// @flow
import { connect } from 'react-redux';

import { setIsValid, setIsActive, getActiveHeat, startRaceNotifications, stopRaceNotifications,
         getActiveTracker, getActiveLaps, getMissingLaps, updateHeatChannels, setStopHeat,
         stopHeat, setRaceError, setAwaitingResponse } from '../modules/race';

import RaceManager from '../components/RaceManager';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the RaceManager  */

const mapStateToProps = state => ({
  isActive: state.race.isActive,
  isValid: state.race.isValid,
  activeHeat: getActiveHeat(state),
  activeTracker: getActiveTracker(state),
  activeLaps: getActiveLaps(state),
  raceError: state.race.error,
  isAwaitingResponse: state.race.awaitingResponse,
});

const mapDispatchToProps = (dispatch: Function) => ({
  setIsActive: boolean => dispatch(setIsActive(boolean)),
  setIsValid: boolean => dispatch(setIsValid(boolean)),
  startRaceNotifications: object =>  dispatch(startRaceNotifications(object)),
  stopRaceNotifications: object =>  dispatch(stopRaceNotifications(object)),
  getMissingLaps: array => dispatch(getMissingLaps(array)),
  setHeatChannels: object => dispatch(updateHeatChannels(object)),
  forceStopHeat: string => dispatch(setStopHeat(string)),
  setTrackerIdle: object => dispatch(stopHeat(object)),
  clearRaceError: () => dispatch(setRaceError('')),
  setAwaitingResponse: boolean => dispatch(setAwaitingResponse(boolean)),
});

const RaceManagerContainer = connect(mapStateToProps, mapDispatchToProps)(RaceManager);

export default RaceManagerContainer;
