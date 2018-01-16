// @flow
import { connect } from 'react-redux';

import { setIsValid, setIsActive, getActiveHeat, getRaceUpdate, getActiveTracker,
         getActiveLaps, getMissingLaps, updateHeatChannels } from '../modules/race';

import RaceManager from '../components/RaceManager';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the RaceManager  */

const mapStateToProps = state => ({
  isActive: state.race.isActive,
  isValid: state.race.isValid,
  queryInterval: state.race.queryInterval,
  activeHeat: getActiveHeat(state),
  activeTracker: getActiveTracker(state),
  activeLaps: getActiveLaps(state)
});

const mapDispatchToProps = (dispatch: Function) => ({
  setIsActive: boolean => dispatch(setIsActive(boolean)),
  setIsValid: boolean => dispatch(setIsValid(boolean)),
  getRaceUpdate: object => dispatch(getRaceUpdate(object)),
  getMissingLaps: array => dispatch(getMissingLaps(array)),
  setHeatChannels: object => dispatch(updateHeatChannels(object))
});

const RaceManagerContainer = connect(mapStateToProps, mapDispatchToProps)(RaceManager);

export default RaceManagerContainer;
