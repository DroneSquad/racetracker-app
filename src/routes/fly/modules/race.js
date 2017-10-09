/** types */
import raceMngr from '../../../services/racemanager';

import _ from 'lodash';

export const NEW_RACE = 'NEW_RACE';
export const NEW_HEAT = 'NEW_HEAT';

/** actions */
export const newRace = (request: object) => ({
  type: NEW_RACE,
  payload: request
});

export const newHeat = (request: object) => ({
  type: NEW_HEAT,
  payload: request
});

export const createRace = (request: object) => {
  // TODO update this for multi tracker, and race creation for a later date
  return dispatch => {
    raceMngr.createRace(response => {
      dispatch(newRace(response.race));
      dispatch(newHeat(response.heat));
    }, request);
  };
};

/** reducers */
export default function(state = {}, action: Action) {
  switch (action.type) {
    case NEW_RACE:
      console.log("NEW_RACE");
      return action.payload;
      // return _.unionWith(state, [action.payload], (left, right) => left.id === right.id);
      /*return {
        ...state,
        race: action.payload
      };*/
    case NEW_HEAT:
      console.log("NEW_HEAT");
      console.log(state);
      console.log(action.payload);
      return {
        ...state,
        heats: _.unionWith(state.heats, [action.payload], (left, right) => left.id === right.id)
      };
    default:
      return state
  }
}
