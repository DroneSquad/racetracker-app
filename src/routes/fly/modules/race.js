/** types */

import _ from 'lodash';

import raceMngr from '../../../services/racemanager';
import { announceLapsFromResponse } from './announcer';

export const NEW_RACE = 'NEW_RACE';
export const NEW_HEAT = 'NEW_HEAT';
export const START_HEAT = 'START_HEAT';
export const STOP_HEAT = 'STOP_HEAT';
export const SET_LAP = 'SET_LAP';
export const SET_RACEMODE = 'SET_RACEMODE';
export const SET_QUERY_INTERVAL = 'SET_QUERY_INTERVAL';

/** actions */
export const newRace = (request: object) => ({
  type: NEW_RACE,
  payload: request
});

export const setQueryInterval = (request: string) => ({
  type: SET_QUERY_INTERVAL,
  payload: request
});

export const setRaceMode = (request: object) => ({
  type: SET_RACEMODE,
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
        dispatch(setLap(response));
        dispatch(announceLapsFromResponse(response));
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
        laps: action.payload.laps
      };
    case SET_RACEMODE:
      return {
        ...state,
        raceMode: action.payload.raceMode
      };
    case SET_QUERY_INTERVAL:
      return {
        ...state,
        queryInterval: action.payload
      };
    case NEW_HEAT:
      return {
        ...state,
        activeHeat: action.payload.heat.id,
        heats: _.unionWith(state.heats, [action.payload.heat], (left, right) => left.id === right.id),
        laps: state.laps.concat(action.payload.laps)
      };
    case SET_LAP:
      return {
        ...state,
        laps: _.unionWith(
          state.laps,
          [action.payload],
          (left, right) => left.heat === right.heat && left.racer === right.racer && left.lap === right.lap
        )
      };
    case START_HEAT:
      return {
        ...state,
        heats: state.heats.map(
          heat =>
            heat.id === action.payload.heatId
              ? {
                  ...heat,
                  isPending: false,
                  isComplete: false,
                  isActive: true
                }
              : heat
        )
      };
    case STOP_HEAT:
      return {
        ...state,
        heats: state.heats.map(
          heat =>
            heat.id === action.payload.heatId
              ? {
                  ...heat,
                  isPending: false,
                  isActive: false,
                  isComplete: true
                }
              : heat
        )
      };
    default:
      return state;
  }
}
