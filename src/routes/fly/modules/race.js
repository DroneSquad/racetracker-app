/** types */
import raceMngr from '../../../services/racemanager';

import _ from 'lodash';

export const NEW_RACE = 'NEW_RACE';

export const NEW_HEAT = 'NEW_HEAT';
export const START_HEAT = 'START_HEAT';
export const STOP_HEAT = 'STOP_HEAT';

/** actions */
export const newRace = (request: object) => ({
  type: NEW_RACE,
  payload: request
});

export const setStartHeat = (request: object) => ({
  type: START_HEAT,
  payload: request
});

export const setStopHeat = (request: object) => ({
  type: STOP_HEAT,
  payload: request
});

export const newHeat = (request: object) => ({
  type: NEW_HEAT,
  payload: request
});

export const createRace = (request: array) => {
  // TODO update this for multi tracker
  return dispatch => {
    raceMngr.createRace(response => {
      dispatch(newRace(response));
    }, request);
  };
};

export const startHeat = (request: object) => {
  return dispatch => {
    raceMngr.startHeat(response => {
      dispatch(setStartHeat(response));
    }, request);
  };
};

export const stopHeat = (request: object) => {
  return dispatch => {
    // raceMngr.stopHeat(response => {
      dispatch(setStopHeat(request.id));
    // }, request);
  };
};

export const createHeat = (request: object) => {
  return dispatch => {
    // raceMngr.stopHeat(response => {
      dispatch(newHeat(request.id));
    // }, request);
  };
};

/** reducers */
export default function(state = {}, action: Action) {
  switch (action.type) {
    case NEW_RACE:
      console.log("NEW_RACE");
      return {
        ...action.payload.race,
        heats: _.unionWith(state.heats, [action.payload.heat], (left, right) => left.id === right.id),
        laps: action.payload.laps /* action.payload.laps.map(lap => _.unionWith(state.laps, [lap], (left, right) => left.heatId === right.heatId && left.racer === right.racer)) */
      };
    case NEW_HEAT:
      console.log("NEW_HEAT");
      return {
        ...state,
        heats: _.unionWith(state.heats, [action.payload], (left, right) => left.id === right.id)
      };
    case START_HEAT:
      console.log("START_HEAT");
      return {
        ...state,
        heats: state.heats.map(heat => heat.id === action.payload ? {
          ...heat,
          isPending:false,
          isComplete:false,
          isActive:true
         } : heat)
      };
    case STOP_HEAT:
      console.log("STOP_HEAT");
      return {
        ...state,
        heats: state.heats.map(heat => heat.id === action.payload ? {
          ...heat,
          isPending:false,
          isActive:false,
          isComplete:true
         } : heat)
      };
    default:
      return state;
  }
}
