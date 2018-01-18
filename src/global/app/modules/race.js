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
const QUERY_INTERVAL_DEFAULT = 10;

/** types */
export const RACE_ERROR = 'RACE_ERROR';
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
export const SET_HEAT_CHANNELS = 'SET_HEAT_CHANNELS';

/** error const for RaceManager */
export const ERR_STOP_HEAT_NO_CONN = 'ERR_STOP_HEAT_NO_CONN'  // attempt to stop heat with no race tracker connected

/** selectors */
const getTrackers = state => state.trackers;
const getHeats = state => state.race.heats;
const getLaps = state => state.race.laps;
const getActiveTrackerId = state => state.race.trackerId;
const getActiveHeatId = state => state.race.activeHeatId;
export const getActiveHeat = createSelector([getActiveHeatId, getHeats], (activeHeatId, heats) => {
  return heats ? heats.filter(t => t.id === activeHeatId)[0] : null;
});
export const getActiveLaps = createSelector([getActiveHeatId, getLaps], (activeHeatId, laps) => {
  return laps ? laps.filter(t => t.heatId === activeHeatId) : null;
});
export const getActiveTracker = createSelector([getActiveTrackerId, getTrackers], (activeTrackerId, trackers) => {
  return trackers ? trackers.filter(t => t.id === activeTrackerId)[0] : null;
});

/** actions */
export const setRaceError = (error: string) => ({
  type: RACE_ERROR,
  payload: error
});

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

export const setStartHeat = (request: string) => ({
  type: START_HEAT,
  payload: request
});

export const setStopHeat = (request: string) => ({
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

export const setHeatChannels = (request: object) => ({
  type: SET_HEAT_CHANNELS,
  payload: request
});

export const sentCommand = () => ({
  type: SENT_START_STOP_HEAT,
  payload: 'sent command, waiting for response'
});

export const createRace = (request: object) => {
  return dispatch => {
    // verify racer-channels are configured
    if (request.racerChannels && request.racerChannels.length !== 0) {
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
      // fire and forget...
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
    this.props.validateTrackers(aTracker); */
  };
};

export const startShotgunHeat = (request: object) => {
  request.raceMode = "shotgun"
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
  request.raceMode = "flyover"
  return dispatch => {
    dispatch(sentCommand());
    dispatch(startHeat(request));
    dispatch(announceFlyoverStart());
  };
};

export const startHeat = (request: object, sayGo: boolean) => {
  return dispatch => {
    tbs.startHeat(response => {
      dispatch(setStartHeat(response.heatId));
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
      if (response.error) {  // no tracker connected (most likely)
        dispatch(setRaceError(ERR_STOP_HEAT_NO_CONN))
      } else {  // racetracker successfully halted heat
        dispatch(setStopHeat(response.heatId));
        dispatch(readActiveMode(response.deviceId));
      }
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

export const updateHeatChannels = (request: object) => {
  return dispatch => {
    // create initial laps for each updated racer channel
    let laps = request.channels.map(slot => ({
      racer: slot.racer,
      lap: 1,
      lapTime: 0,
      totalTime: 0,
      heatId: request.heat.id
    }));
    // update heat with updated racer channels
    let heat = {
      id: request.heat.id,
      raceId: request.heat.raceId,
      number: request.heat.number,
      isPending: request.heat.isPending,
      isActive: request.heat.isActive,
      isComplete: request.heat.isComplete,
      racerChannels: request.channels
    };
    // and away we go....
    dispatch(setHeatChannels({ heat: heat, laps: laps }));
  };
};

export const getRaceUpdate = (request: object) => {
  return dispatch => {
    tbs.readRaceUpdate(response => {
      if (response.start) {
        // accounts for flyover start
        dispatch(announceFlyover());
      }
      if (!response.error && !response.start) {
        console.log("**** getRaceUpdate-Result ****")
        console.log(response)
        console.log("******************************")
        dispatch(setLap(response));
        dispatch(announceLapsFromResponse(response));
      }
      // TODO: should a flag be set here for on reconnect, to fetch missing??
      // or just wait until the race ends?
      if (response.error) {
        console.log("**** getRaceUpdate-Error *****")
        console.log(response)
        console.log("******************************")
      }
    }, request);
  };
};

export const getMissingLaps = (request: array) => {
  return dispatch => {
    for (let slot of request) {
      tbs.readTotalLaps(response => {
        if (response.error) {
          console.log(response.error); // TODO: log the error properly to device
        } else {
          if (slot.laps.length !== response.totalLaps) {
            console.log("-- getMissingLaps --")
            let arr = _.range(1, response.totalLaps + 1);
            let awol =_.difference(arr, slot.laps);
            dispatch(setMissingLaps({ heatId: response.heatId, deviceId: response.deviceId, racer: response.racer, laps: awol }))
          }
        }
      }, slot);
    }
  };
};

export const setMissingLaps = (request: object) => {
  return dispatch => {
    for (let lap of request.laps) {
      tbs.readLapTime(response => {
        if (response.error) {
          console.log(response.error); // TODO: log the error properly to device
        } else {
          dispatch(setLap(response));
        }
      }, { deviceId: request.deviceId,  heatId: request.heatId, racer: request.racer, lap: lap });
    }
  };
};

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
  laps: [],
  error: ''
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
        heats: [action.payload.heat],
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
    case SET_HEAT_CHANNELS:
      return {
        ...state,
        heats: _.unionWith([action.payload.heat], state.heat, (left, right) => left.id === right.id),
        laps: state.laps.filter(lap => lap.heatId !== action.payload.heat.id).concat(action.payload.laps)
      };
    case SET_LAP:
      // TODO: this is called on each interval query, which then calls render() A LOT, investigate performance improvements
      console.log("==== SET_LAP ====")
      if (_.get(action.payload, 'lap') !== state.lastLapId) { // make sure its unique right now
        return {
          ...state,
          lastLapId: _.get(action.payload, 'lap'),
          laps: _.sortBy(_.unionWith(
            [action.payload],
            state.laps,
            (left, right) => left.heatId === right.heatId && left.racer === right.racer && left.lap === right.lap
          ), 'lap')
        };
      } else {
        return { ...state };
      }

    case SENT_START_STOP_HEAT:
      return {
        ...state,
        sentCommand: true
      };
    case START_HEAT: // gets called when we get the response from the tracker
      return {
        ...state,
        sentCommand: false,
        heats: state.heats.map(
          heat =>
            heat.id === action.payload
              ? {
                  ...heat,
                  isPending: false,
                  isComplete: false,
                  isActive: true
                }
              : heat
        ),
        error: ''
      };
    case STOP_HEAT: // gets called when we got the response from the tracker
      return {
        ...state,
        sentCommand: false,
        heats: state.heats.map(
          heat =>
            heat.id === action.payload
              ? {
                  ...heat,
                  isPending: false,
                  isActive: false,
                  isComplete: true
                }
              : heat
        ),
        error: ''
      };
    case RACE_ERROR:
      return {
        ...state,
        sentCommand: false,
        error: action.payload
      };
    case 'persist/REHYDRATE': {
      if (action.payload !== undefined) {
        return { ...action.payload.race, sentCommand: false, laps: _.reverse(_.sortBy(_.get(action.payload, 'race.laps'), 'lap')) };
      }
      return state;
    }
    default:
      return state;
  }
}
