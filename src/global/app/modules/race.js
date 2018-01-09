// @flow
import _ from 'lodash';
import uuid from 'uuid';
import { createSelector } from 'reselect';

import tbs from '../../../services/racetracker';
import { readActiveMode } from './racetracker';

import {
  announceLapsFromResponse,
  announceShotgunStart,
  announceFlyoverStart,
  announceFlyover,
  announceGo
} from '../../../routes/fly/modules/announcer';

/** defaults */
const RACEMODE_DEFAULT = 'shotgun'; // flyby
const QUERY_INTERVAL_DEFAULT = 1;

/** types */
export const RACE_IS_VALID = 'RACE_IS_VALID';
export const RACE_IS_ACTIVE = 'RACE_IS_ACTIVE'
export const NEW_RACE = 'NEW_RACE';
export const NEW_HEAT = 'NEW_HEAT';
export const START_HEAT = 'START_HEAT';
export const STOP_HEAT = 'STOP_HEAT';
export const SET_LAP = 'SET_LAP';
export const SET_RACEMODE = 'SET_RACEMODE';
export const SET_QUERY_INTERVAL = 'SET_QUERY_INTERVAL';
export const SENT_START_STOP_HEAT = 'SENT_START_STOP_HEAT';
export const SET_HEAT_RACERS = 'SET_HEAT_RACERS';

// TODO:
// export const RT_TOTAL_ROUNDS = 'RT_TOTAL_ROUNDS';
// export const RT_LAPTIME = 'RT_LAPTIME';

/** selectors */
const getActiveHeatId = state => state.race.activeHeatId;
const getHeats = state => state.race.heats;
export const getActiveHeat = createSelector([getActiveHeatId, getHeats], (activeHeatId, heats) => {
  return heats ? heats.filter(t => t.id === activeHeatId)[0] : null;
});

const getActiveTrackerId = state => state.race.trackerId;
const getTrackers = state => state.trackers;
export const getActiveTracker = createSelector([getActiveTrackerId, getTrackers], (activeTrackerId, trackers) => {
  return trackers ? trackers.filter(t => t.id === activeTrackerId)[0] : null;
});
export const getRacerChannels = createSelector([getActiveTrackerId, getTrackers], (activeTrackerId, trackers) => {
  return trackers ? trackers.filter(t => t.id === activeTrackerId)[0].racerChannels : null;
});

/** actions */
export const setIsValid = (request: boolean) => ({
  type: RACE_IS_VALID,
  payload: request
});

export const setIsActive = (request: boolean) => ({
  type: RACE_IS_ACTIVE,
  payload: request
});

export const newRace = (request: object) => ({
  type: NEW_RACE,
  payload: request
});

export const setQueryInterval = (request: string) => ({
  type: SET_QUERY_INTERVAL,
  payload: request
});

export const setRaceMode = (request: string) => ({
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
  payload: { ...request, heatId: request.heatId }
});

export const setHeatRacers = (request: object) => ({
  type: SET_HEAT_RACERS,
  payload: request
});

export const sentCommand = () => ({
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

export const createRace = (request: object) => {
  return dispatch => {
    // verify racer-channels are configured
    if (request.racerChannels.length !== 0) {
      // generate unique ids for heats and race
      let rUid = uuid.v4(); // race uid
      let hUid = uuid.v4(); // heat uid
      // create first lap for each racer slot
      let laps = request.racerChannels.map(slot => ({
        racer: slot.racer,
        lap: 1,
        lapTime: 0,
        totalTime: 0,
        heatId: hUid
      }));
      // create the first heat for the race
      let heat = {
        id: hUid,
        raceId: rUid,
        number: 1,
        isPending: true,
        isActive: false,
        isComplete: false,
        racerChannels: request.racerChannels
      };
      // and finally create the race to hold it all together
      let race = {
        id: rUid,
        name: 'race_' + rUid,
        date: new Date().toISOString().split('T')[0],
        location: '',
        trackerId: request.id,
        activeHeatId: hUid,
        isActive: true,
        isValid: true
      };
      dispatch(newRace({ race: race, heat: heat, laps: laps }));
    }
  };
};

// TODO:
export const validateRace = (request: object) => {
  return dispatch => {

    /*raceMngr.createRace(response => {
      dispatch(newRace(response));
    }, request);*/
    /** Validate that the device exists on the internal bluetooth scan list */
/*validateTrackers = () => {
  if (!this.props.isBtScanning) {
    let aTracker = this.props.connectedTrackers.filter(t => t.id === this.props.activeTrackerId);
    this.props.validateTrackers(aTracker);
  }
};*/
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

export const startHeat = (request: object, sayGo) => {
  return dispatch => {
    tbs.startHeat(response => {
      dispatch(setStart(response));
      if (sayGo) {
        dispatch(announceGo());
      }
      dispatch(readActiveMode(response.deviceId));
    }, request);
  };
};

export const stopHeat = (request: object) => {
  return dispatch => {
    dispatch(sentCommand());
    tbs.stopHeat(response => {
      dispatch(setStop(response));
      dispatch(readActiveMode(response.deviceId));
    }, request);
  };
};

export const createHeat = (request: object) => {
  return dispatch => {
    let hUid = uuid.v4(); // heat uid
    // create initial lap for each racer
    let laps = request.activeChannels.map(slot => ({
      racer: slot.racer,
      lap: 1,
      lapTime: 0,
      totalTime: 0,
      heatId: hUid
    }));
    // create a new heat for the current race
    let heat = {
      id: hUid,
      raceId: request.raceId,
      number: request.currentHeat.number + 1,
      isPending: true,
      isActive: false,
      isComplete: false,
      racerChannels: request.activeChannels
    };
    // send it...
    dispatch(newHeat({ heat: heat, laps: laps }));
  };
};

export const updateLaps = (request: object) => {
  return dispatch => {
    tbs.readRaceUpdate(response => {
      if (response.start) {
        // accounts for flyover start
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
  return dispatch => {
  /*  raceMngr.updateHeatRacers(response => {
      console.log('call setHeatRacers');
      console.log(response);
      dispatch(setHeatRacers(response));
    }, request);*/
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

/** initial state */
const initialState = {
  id: null,
  name: '',
  date: '',
  location: '',
  trackerId: null,
  activeHeatId: null,
  raceMode: RACEMODE_DEFAULT,
  queryInterval: QUERY_INTERVAL_DEFAULT,
  isActive: false,
  isValid: false,
  heats: [],
  laps: []
};

/** reducers */
export default function(state = initialState, action: Action) {
  switch (action.type) {
    case RACE_IS_VALID:
      return {
        ...state,
        isValid: action.payload
      };
    case RACE_IS_ACTIVE:
      return {
        ...state,
        isActive: action.payload
     };
    case NEW_RACE:
      return {
        ...state,
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
        activeHeatId: action.payload.heat.id,
        heats: _.unionWith(state.heats, [action.payload.heat], (left, right) => left.id === right.id),
        laps: state.laps.concat(action.payload.laps)
      };
    case SET_HEAT_RACERS:
      return {
        ...state,
        heats: _.unionWith([action.payload.heat], state.heat, (left, right) => left.id === right.id),
        laps: state.laps.filter(lap => lap.heatId !== action.payload.heat.id).concat(action.payload.laps)
      };
    case SET_LAP:
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
    /* case 'persist/REHYDRATE': {
      if (action.payload !== undefined) {
        return action.payload.race;
      }
      return state;
    } */
    default:
      return state;
  }
}
