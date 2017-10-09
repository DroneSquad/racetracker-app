// @flow

// module definition for hot-swap use on app.js
declare var module: {
  hot: {
    accept(path: string, callback: () => void): void
  }
};

// basic bluetooth racetracker device on discovery
// see src/routes/tracker/modules/racetracker.js as a reference to updte this
export type RaceTracker = {
  name: string,
  rssi: string,
  id: string,
  isConnected: boolean,
  wasConnected: boolean,
  isReconnecting: boolean,
  recover: boolean,
  reconnects: number,
  batteryLevel: string,
};

export type AuthToken = {
  hash: string,
  pilot: string,
  ttl: string,
  created: string
};




// all action types with according payload
declare type ActionType = 'CONNECT_TRACKER' | 'DISCOVER_TRACKER' | 'BT_IS_AVAILABLE';

declare type ActionT<A: ActionType, P> = {|
  type: A,
  payload: P
|};

// action type: SET_SEARCH_TERM, payload: string
export type Action = ActionT<'CONNECT_TRACKER', string> | ActionT<'DISCOVER_TRACKER', RaceTracker> |
ActionT<'BT_IS_AVAILABLE', boolean>;
