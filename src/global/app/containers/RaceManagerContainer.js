// @flow
import { connect } from 'react-redux';

import { setIsValid, getActiveHeat, updateLaps } from '../modules/race';

import RaceManager from '../components/RaceManager';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the RaceManager  */

const mapStateToProps = state => ({
  queryInterval: state.race.queryInterval,
  trackerId: state.race.trackerId,
  activeHeat: getActiveHeat(state)
});

const mapDispatchToProps = (dispatch: Function) => ({
  setIsValid: boolean => dispatch(setIsValid(boolean)),
  updateLaps: object => dispatch(updateLaps(object))
});

const RaceManagerContainer = connect(mapStateToProps, mapDispatchToProps)(RaceManager);

export default RaceManagerContainer;
