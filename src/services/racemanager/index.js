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
    let uid = uuid.v4();
    // create the race object
    let race = {
      id: uid,
      name: 'race_' + uid,
      date: new Date().toISOString().split('T')[0],
      location: '',
      trackerId: request[0].id,
      activeHeat: 1,
      raceMode: request[0].raceMode,
      isActive: true // by default auto start for now
    };
    // create the first heat for the race
    let heat = {
      id: uuid.v4(),
      raceId: uid,
      number: 1,
      isPending: true,
      isActive: false,
      isComplete: false,
      isRerun: false,
      racerChannels: request[0].racerChannels
    };
    // send it...
    cb({ race: race, heat: heat });
  }

  startRace(cb, request) {}
}

export default RaceMngr.get();
