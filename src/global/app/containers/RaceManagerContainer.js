// @flow
import { connect } from 'react-redux';

import { setIsValid, setIsActive, getActiveHeat, getRaceUpdate, getActiveTracker } from '../modules/race';

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
  activeTracker: getActiveTracker(state)
});

const mapDispatchToProps = (dispatch: Function) => ({
  setIsActive: boolean => dispatch(setIsActive(boolean)),
  setIsValid: boolean => dispatch(setIsValid(boolean)),
  getRaceUpdate: object => dispatch(getRaceUpdate(object))
});

const RaceManagerContainer = connect(mapStateToProps, mapDispatchToProps)(RaceManager);

export default RaceManagerContainer;
