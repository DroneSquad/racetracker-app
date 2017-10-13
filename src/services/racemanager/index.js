import config from './config.json';

import uuid from 'uuid';

export class RaceMngr {
  constructor() {
    this._config = { ...config };
  }

  static get() {
    if (!RaceMngr._instance) {
      RaceMngr._instance = new RaceMngr();
    }
    return RaceMngr._instance;
  }

  createRace(cb, request) {
    let rUid = uuid.v4(); // race uid
    let hUid = uuid.v4(); // heat uid
    // create the first heat for the race
    let heat = {
      id: hUid,
      raceId: rUid,
      number: 1,
      isPending: true,
      isActive: false,
      isComplete: false,
      isRerun: false,
      racerChannels: request[0].racerChannels
    };
    // create the race object
    let race = {
      id: rUid,
      name: 'race_' + rUid,
      date: new Date().toISOString().split('T')[0],
      location: '',
      trackerId: request[0].id,
      activeHeat: hUid,
      activeHeatNumber: 1,
      raceMode: request[0].raceMode,
      isActive: true // by default auto start for now
    };
    // send it...
    cb({ race: race, heat: heat });
  }

  startRace(cb, request) {}
}

export default RaceMngr.get();
