// @flow

// module definition for hot-swap use on app.js
declare var module: {
  hot: {
    accept(path: string, callback: () => void): void
  }
};

// basic bluetooth racetracker device on discovery
export type RaceTracker = {
  name: string,
  rssi: string,
  id: string,
  isConnected: boolean
};

// all action types with according payload
declare type ActionType = 'CONNECT_TRACKER' | 'DISCOVER_TRACKER';

declare type ActionT<A: ActionType, P> = {|
  type: A,
  payload: P
|};

// action type: SET_SEARCH_TERM, payload: string
export type Action = ActionT<'CONNECT_TRACKER', string> | ActionT<'DISCOVER_TRACKER', RaceTracker>;
