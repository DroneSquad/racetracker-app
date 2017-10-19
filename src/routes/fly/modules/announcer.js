import moment from 'moment';

import { sendVoice } from '../../../global/voice/modules/voice';

const FAKE_DATE = '1/1/1 0:';

let cacheTable = window.__announcer_cacheTable = {}; // cache table prevent multiple laps from being called out

/** Read the response from the payload and announce the values */
export function announceLapsFromResponse(response) {
  return (dispatch, getStore) => {
    let store = getStore();
    let key = (0x1 << response.racer) * response.lap;
    let heatTable = cacheTable[response.heat.id] || (cacheTable[response.heat.id] = {});
    console.log(cacheTable);
    if (!(key in heatTable)) {
      heatTable[key] = true;
      if (!store.race.laps && false) { // todo check if current lap is the fastest lap
        dispatch(sendVoice('New Fastest Lap'));
      }
      dispatch(announceLap(response.racer, response.lapTime));
    }
  };
}

/** Will announce the lap */
export function announceLap(person, time) {
  // console.log(FAKE_DATE + time)
  let humanTime = moment(FAKE_DATE + time).format('mm [minutes] ss [point] SS [seconds]');
  return (dispatch, getStore) => {
    //let store = getStore();
    let racerToPilot = person; // todo map id with pilots name from current heat
    dispatch(sendVoice(`Racer ${racerToPilot}, ${humanTime}`));
  };
}
