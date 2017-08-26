// @flow

// module definition for hot-swap use on app.js
declare var module: {
  hot: {
    accept(path: string, callback: () => void): void
  }
};

export type RaceTracker = {
  name: string,
  rssi: string,
  id: string,
  connected: boolean
};
