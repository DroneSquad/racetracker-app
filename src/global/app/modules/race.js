/** types */

import _ from 'lodash';

import raceMngr from '../../../services/racemanager';
import {
  announceLapsFromResponse,
  announceShotgunStart,
  announceFlyoverStart,
  announceFlyover,
  announceGo
} from '../../../routes/fly/modules/announcer';

export const NEW_RACE = 'NEW_RACE';
export const NEW_HEAT = 'NEW_HEAT';
export const START_HEAT = 'START_HEAT';
export const STOP_HEAT = 'STOP_HEAT';
export const SET_LAP = 'SET_LAP';
export const SET_RACEMODE = 'SET_RACEMODE';
export const SET_QUERY_INTERVAL = 'SET_QUERY_INTERVAL';
export const SET_HEAT_RACERS = 'SET_HEAT_RACERS';
export const SENT_START_STOP_HEAT = 'SENT_START_STOP_HEAT';

// TODO:
// export const RT_TOTAL_ROUNDS = 'RT_TOTAL_ROUNDS';
// export const RT_LAPTIME = 'RT_LAPTIME';

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
  payload: { ...request, heatId: request.heat } // some parts of the code uses the old heatId property
});

export const setHeatRacers = (request: object) => ({
  type: SET_HEAT_RACERS,
  payload: request
});

export const sentCommand = () => ({
  //
  type: SENT_START_STOP_HEAT,
  payload: 'sent command, waiting for response'
});

/*export const setTotalRounds = (request: Object) => ({
  type: RT_TOTAL_ROUNDS,
  payload: request
});*/

/*export const setLaptime = (request: Object) => ({
  type: RT_LAPTIME,
  payload: request
});*/

export const createRace = (request: array) => {
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

export const startShotgunHeat = (request: object) => {
  return dispatch => {
    dispatch(sentCommand());
    dispatch(
      announceShotgunStart(() => {
        dispatch(startHeat(request, true));
      })
    );
  };
};

export const startFlyoverHeat = (request: object) => {
  return dispatch => {
    dispatch(sentCommand());
    dispatch(startHeat(request));
    dispatch(announceFlyoverStart());
  };
};

export const stopHeat = (request: object) => {
  return dispatch => {
    dispatch(sentCommand());
    raceMngr.stopHeat(response => {
      dispatch(setStop(response));
    }, request);
  };
};

export const startHeat = (request: object, sayGo) => {
  return dispatch => {
    raceMngr.startHeat(response => {
      dispatch(setStart(response));
      if (sayGo) {
        dispatch(announceGo());
      }
    }, request);
  };
};

export const updateLaps = (request: object) => {
  return dispatch => {
    raceMngr.updateLaps(response => {
      if (response.start) {
        // accounts for flyover start in flyovermode
        dispatch(announceFlyover());
      }
      if (!response.error && !response.start) {
        dispatch(setLap(response));
        dispatch(announceLapsFromResponse(response));
      }
    }, request);
  };
};

export const updateHeatRacers = (request: object) => {
  console.log('updateHeatRacers-module');
  console.log(request);
  return dispatch => {
    raceMngr.updateHeatRacers(response => {
      console.log('call setHeatRacers');
      console.log(response);
      dispatch(setHeatRacers(response));
    }, request);
  };
};

/** Get the total number of rounds by a a selected racer */
/*export const readTotalRounds = (request: object) => {
  return dispatch => {
    tbs.readTotalRounds(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
        // dispatch(isTrackerConnected(request.deviceId)); // verify/update connection state
      } else {
        dispatch(setTotalRounds(response)); // update the redux value
      }
    }, request);
  };
};*/

/** Get the laptime of a specific round of a chosen racer */
/*export const readLapTime = (request: object) => {
  return dispatch => {
    tbs.readLapTime(response => {
      if (response.error) {
        console.log(response.error); // TODO: log the error properly to device
        // dispatch(isTrackerConnected(request.deviceId)); // verify/update connection state
      } else {
        dispatch(setLaptime(response)); // update the redux value
      }
    }, request);
  };
};*/

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
        raceMode: action.payload
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
    case SET_HEAT_RACERS:
      console.log('SET_HEAT_RACERS');
      console.log(action.payload);
      return {
        ...state,
        heats: _.unionWith([action.payload.heat], state.heat, (left, right) => left.id === right.id),
        laps: state.laps.filter(lap => lap.heatId !== action.payload.heat.id).concat(action.payload.laps)
      };
    case SET_LAP:
      console.log('SET_LAP');
      // TODO: this is called on each interval query, which then calls render() A LOT, investigate performance improvements
      return {
        ...state,
        laps: _.unionWith(
          [action.payload],
          state.laps,
          (left, right) => left.heatId === right.heatId && left.racer === right.racer && left.lap === right.lap
        )
      };
    case SENT_START_STOP_HEAT:
      return { ...state, sentCommand: true };
    case START_HEAT: // gets called when we get the response from the tracker
      return {
        ...state,
        sentCommand: false,
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
    case STOP_HEAT: // gets called when we got the response from the tracker
      return {
        ...state,
        sentCommand: false,
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
