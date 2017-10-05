// import ble from '../../../services/bluetooth';
// import { discoverTracker } from './racetracker';

/** types */
export const RACE_CREATE = 'RACE_CREATE';
export const HEAT_CREATE = 'HEAT_CREATE';

/** actions */
export const raceCreate = (trackerId: string) => ({
  type: RACE_CREATE,
  payload: trackerId
});

export const heatCreate = (request: object) => ({
  type: RACE_CREATE,
  payload: request
});



/** initial state */
const initialState = {
  trackerId: '',
  date: new Date().toISOString().split('T')[0],
  heats: [],
  lastHeat: null,
  active: false,
};

/** reducers */
export default function(state = initialState, action: Action) {
  switch (action.type) {
    case RACE_CREATE:
      return {
        ...state,
        trackerId: action.payload,
        active: true,
      };
    default:
      return state
  }
}
