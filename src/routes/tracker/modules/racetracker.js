// @flow
import _ from 'lodash';

/** types */
export const DISCOVER_TRACKER = 'DISCOVER_TRACKER';
export const CONNECT_TRACKER = 'CONNECT_TRACKER';
export const CONNECTING_TRACKER = 'CONNECTING_TRACKER';
export const DISCONNECT_TRACKER = 'DISCONNECT_TRACKER';
export const CLEAR_UNPAIRED_TRACKERS = 'CLEAR_UNPAIRED_TRACKERS';

/** actions */
export const discoverTracker = (tracker: RaceTracker) => ({
  type: DISCOVER_TRACKER,
  payload: tracker
});

export const connectingTracker = (id: string) => ({
  type: CONNECTING_TRACKER,
  payload: id
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

/** reducers */
export default function(state = [], action: Action) {
  switch (action.type) {
    case DISCOVER_TRACKER:
      // use a union to remove copies of the same tracker id
      return _.unionWith(
        state,
        [
          {
            id: action.payload.id,
            rssi: action.payload.rssi,
            name: action.payload.name
          }
        ],
        (left, right) => left.id === right.id
      );
    case CONNECT_TRACKER:
      return state.map(
        tracker =>
          tracker.id === action.payload ? { ...tracker, isConnected: true, isConnecting: false } : tracker
      );
    case CONNECTING_TRACKER:
        return state.map(
          tracker =>
            tracker.id === action.payload ? { ...tracker, isConnected: false, isConnecting: true } : tracker
        );
    case DISCONNECT_TRACKER:
      return state.map(
        tracker =>
          tracker.id === action.payload ? { ...tracker, isConnected: false, isConnecting: false } : tracker
      );
    case CLEAR_UNPAIRED_TRACKERS:
      return state.filter(tracker => tracker.isConnected);
    default:
      return state;
  }
};
