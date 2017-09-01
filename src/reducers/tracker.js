/** actions */
export const DISCOVER_TRACKER = 'DISCOVER_TRACKER';
export const CONNECT_TRACKER = 'CONNECT_TRACKER';
export const DISCONNECT_TRACKER = 'DISCONNECT_TRACKER';
export const CLEAR_UNPAIRED_TRACKERS = 'CLEAR_AVAIL_TRACKERS';

/** action creators */
export const discoverTracker = (tracker: RaceTracker) => ({
  type: DISCOVER_TRACKER,
  payload: tracker
});

export const connectTracker = (id: string) => ({
  type: CONNECT_TRACKER,
  payload: id
});

export const disconnectTracker = (id: string) => ({
  type: DISCONNECT_TRACKER,
  payload: id
});

export const clearUnpairedTrackers = () => ({
  type: CLEAR_UNPAIRED_TRACKERS,
  payload: null
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
          isConnected: false
        }
      ];
    case CONNECT_TRACKER:
      return state.map(
        tracker => (tracker.id === action.payload ? { ...tracker, isConnected: true } : tracker)
      );
    case DISCONNECT_TRACKER:
      return state.map(
        tracker => (tracker.id === action.payload ? { ...tracker, isConnected: false } : tracker)
      );
    case CLEAR_UNPAIRED_TRACKERS:
      return state.filter(tracker => tracker.isConnected: true)
    default:
      return state;
  }
};

export default trackers;
