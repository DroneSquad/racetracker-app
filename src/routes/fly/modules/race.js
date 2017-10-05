/** types */
export const CREATE_RACE = 'CREATE_RACE';
// export const START_RACE = 'START_RACE';
// export const STOP_RACE = 'STOP_RACE';
// export const END_RACE = 'END_RACE';

// export const CREATE_HEAT = 'CREATE_HEAT';
// export const START_HEAT = 'START_HEAT';
// export const END_HEAT = 'END_HEAT';
// export const DELETE_HEAT = 'DELETE_HEAT';
// export const EDIT_HEAT = 'EDIT_HEAT';
// export const RERUN_HEAT = 'RERUN_HEAT';

/** actions */
export const createRace = (tracker: RaceTracker) => ({
  type: CREATE_RACE,
  payload: tracker
});

/** initial state */
const initialState = {
  tracker: null,
  date: new Date().toISOString().split('T')[0],
  heats: [],
  isActive: false,
};

/** reducers */
export default function(state = initialState, action: Action) {
  switch (action.type) {
    case CREATE_RACE:
      return {
        ...state,
        tracker: action.payload,
        isActive: true,
      };
    /*case CREATE_HEAT:
      return {
        racerChannels: action.payload.racerChannels,
        trackerId: action.payload.trackerId,
      };*/
    /*  case ADD_HEAT:
        let heats = state.filter(t => t.id === action.payload.device_id)[0].racerChannels;
        return state.map(
          tracker =>
            tracker.id === action.payload.device_id
              ? {
                  ...tracker,
                  racerChannels: _.unionWith(chans, [action.payload.channel], (left, right) => left.racer === right.racer)
                }
              : tracker
        )*/
    default:
      return state
  }
}
