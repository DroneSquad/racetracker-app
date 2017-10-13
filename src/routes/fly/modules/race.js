/** types */
import raceMngr from '../../../services/racemanager';

import _ from 'lodash';

export const NEW_RACE = 'NEW_RACE';
export const NEW_HEAT = 'NEW_HEAT';
export const START_HEAT = 'START_HEAT';
export const STOP_HEAT = 'STOP_HEAT';
export const SET_LAP = 'SET_LAP';

/** actions */
export const newRace = (request: object) => ({
  type: NEW_RACE,
  payload: request
});

export const setStart = (request: object) => ({
  type: START_HEAT,
  payload: request
});

export const setStop = (request: object) => ({
  type: STOP_HEAT,
  payload: request
});

export const newHeat = (request: object) => ({
  type: NEW_HEAT,
  payload: request
});

export const setLap = (request: object) => ({
  type: SET_LAP,
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

export const createHeat = (request: object) => {
  return dispatch => {
    raceMngr.createHeat(response => {
      dispatch(newHeat(response));
    }, request);
  };
};

export const startHeat = (request: object) => {
  return dispatch => {
    raceMngr.startHeat(response => {
      dispatch(setStart(response));
    }, request);
  };
};

export const stopHeat = (request: object) => {
  return dispatch => {
    raceMngr.stopHeat(response => {
      dispatch(setStop(response));
    }, request);
  };
};

export const updateLaps = (request: object) => {
  return dispatch => {
    raceMngr.updateLaps(response => {
      if (!response.error) {
        console.log("DISPATCH-RESPONSE")
        console.log(response)
        dispatch(setLap(response));
      }
    }, request);
  };
};

/** reducers */
export default function(state = {}, action: Action) {
  switch (action.type) {
    case NEW_RACE:
      return {
        ...action.payload.race,
        heats: _.unionWith(state.heats, [action.payload.heat], (left, right) => left.id === right.id),
        laps: action.payload.laps /* action.payload.laps.map(lap => _.unionWith(state.laps, [lap], (left, right) => left.heatId === right.heatId && left.racer === right.racer)) */
      };
    case NEW_HEAT:
      return {
        ...state,
        activeHeat: action.payload.heat.id,
        heats: _.unionWith(state.heats, [action.payload.heat], (left, right) => left.id === right.id),
        laps: state.laps.concat(action.payload.laps)
      };
    case SET_LAP:
      console.log("SET_LAP");
      console.log(state.laps)
      console.log(action.payload)
      return {
        ...state,
        laps: _.unionWith(state.laps, [action.payload], (left, right) => left.heat === right.heat && left.racer === right.racer && left.lap === right.lap)
      };
    case START_HEAT:
      return {
        ...state,
        heats: state.heats.map(heat => heat.id === action.payload.heatId ? {
          ...heat,
          isPending:false,
          isComplete:false,
          isActive:true
         } : heat)
      };
    case STOP_HEAT:
      return {
        ...state,
        heats: state.heats.map(heat => heat.id === action.payload.heatId ? {
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
