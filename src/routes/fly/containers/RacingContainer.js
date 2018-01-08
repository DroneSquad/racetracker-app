// @flow
import { connect } from 'react-redux';

import Racing from '../components/Racing';

import { getConnectedTrackers } from '../../../global/app/modules/racetracker';

import { createRace, validateRace } from '../../../global/app/modules/race';

/*  This is a container componsent. It does not contain any JSX, or
    import React. This component is **only** responsible for wiring
    in actions and state necessary to render a presentational component */

const mapStateToProps = state => ({
  isRaceActive: state.race.isActive,
  isRaceValid: state.race.isValid,
  activeHeatId: state.race.activeHeatId,
  activeTrackerId: state.race.trackerId,
  activeRace: state.race,
  connectedTrackers: getConnectedTrackers(state),
  theState: state
});

const mapDispatchToProps = (dispatch: Function) => ({
  validateRace: object => dispatch(validateRace(object)),
  createRace: object => dispatch(createRace(object)),
});

const RacingContainer = connect(mapStateToProps, mapDispatchToProps)(Racing);

export default RacingContainer;
