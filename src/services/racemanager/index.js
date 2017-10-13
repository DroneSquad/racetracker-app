import config from './config.json';

import uuid from 'uuid';
import tbs from '../racetracker';

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
    // create initial lap for each racer
    let laps = request[0].racerChannels.map(slot =>
      ({
        racer: slot.racer,
        lapNumber: 1,
        lapTime: '00:00',
        totalTime: '00:00',
        bestTime: '00:00',
        channel: slot.channel,
        heat: hUid
      })
    )
    // create the first heat for the race
    let heat = {
      id: hUid,
      raceId: rUid,
      number: 1,
      isPending: true,
      isActive: false,
      isComplete: false,
      racerChannels: request[0].racerChannels
    };
    // create the race itself
    let race = {
      id: rUid,
      name: 'race_' + rUid,
      date: new Date().toISOString().split('T')[0],
      location: '',
      trackerId: request[0].id,
      activeHeat: hUid,
      raceMode: request[0].raceMode,
      isActive: true // by default auto start for now
    };
    // send it...
    cb({ race: race, heat: heat, laps: laps });
  }

  startHeat(cb, request) {
    tbs.startHeat(cb, request);
  }

  stopHeat(cb, request) {
    tbs.stopHeat(cb, request);
  }

  createHeat(cb, request) {
    let hUid = uuid.v4(); // heat uid
    // create initial lap for each racer
    let laps = request.racerChannels.map(slot =>
      ({
        racer: slot.racer,
        lapNumber: 1,
        lapTime: '00:00',
        totalTime: '00:00',
        bestTime: '00:00',
        channel: slot.channel,
        heat: hUid
      })
    )
    // create the first heat for the race
    let heat = {
      id: hUid,
      raceId: request.raceId,
      number: request.currentHeat.number + 1,
      isPending: true,
      isActive: false,
      isComplete: false,
      racerChannels: request.racerChannels
    };
    // send it...
    cb({ heat: heat, laps: laps });
  }

}

export default RaceMngr.get();
