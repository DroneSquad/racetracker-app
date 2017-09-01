/** actions */
export const DISCOVER_TRACKER = 'DISCOVER_TRACKER';
export const CONNECT_TRACKER = 'CONNECT_TRACKER';

/** action creators */
export const discoverTracker = (tracker: RaceTracker) => ({
  type: DISCOVER_TRACKER,
  payload: tracker
});

export const connectTracker = (id: string) => ({
  type: CONNECT_TRACKER,
  payload: id
});

//** reducers */
const trackers = (state = [], action: Action) => {
  switch (action.type) {
    case DISCOVER_TRACKER:
      return [
        ...state,
        {
          id: action.payload.id,
          rssi: action.payload.rssi,
          name: action.payload.name,
          connected: false
        }
      ];
    case CONNECT_TRACKER:
      return state.map(
        tracker => (tracker.id === action.payload ? { ...tracker, connected: true } : tracker)
      );

    default:
      return state;
  }
};

export default trackers;
