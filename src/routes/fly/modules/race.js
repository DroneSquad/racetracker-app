/** types */
import _ from 'lodash';

export const CREATE_RACE = 'CREATE_RACE';
export const CREATE_HEAT = 'CREATE_HEAT';

/** actions */
export const createRace = (trackerId: string) => ({
  type: CREATE_RACE,
  payload: trackerId
});

export const createHeat = (heat: Object) => ({
  type: CREATE_HEAT,
  payload: heat
});

/** initial state of a race */
const initialRaceState = {
  trackerId: '',
  name: '',
  date: new Date().toISOString().split('T')[0],
  heats: [],
  isActive: false,
};

/** reducers */
export default function(state = initialRaceState, action: Action) {
  switch (action.type) {
    case CREATE_RACE:
      return {
        ...state,
        trackerId: action.payload,
        isActive: true,
      };
    case CREATE_HEAT:
      return _.unionWith(state.heats, [action.payload], (left, right) => left.id === right.id);
    default:
      return state
  }
}
