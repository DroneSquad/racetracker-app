import moment from 'moment';

import { sendVoice } from '../../../global/voice/modules/voice';

let cacheTable = (window.__announcer_cacheTable = {}); // cache table prevent multiple laps from being called out

/** Split the mills into an array of mins, seconds, mills */
function splitMillsToArray(ms) {
  return [Math.floor(ms / 60000), Math.floor(ms / 1000), Math.floor(ms % 1000) * 0.001];
}

/** Make the speech of the announcer sound normal, though with out a proper text to speech engine this will */
function humanSpeech(millis) {
  let [mins, seconds, ms] = splitMillsToArray(millis);
  console.log(mins, seconds, ms);
  // todo fancy announcer stuff
  return moment().startOf('day').add(millis, 'ms').format('mm:ss.SS');
}

/** Read the response from the payload and announce the values */
export function announceLapsFromResponse(response) {
  return (dispatch, getStore) => {
    let store = getStore();
    let key = (0x1 << response.racer) * response.racer + response.lap;
    let heatTable = cacheTable[response.heat.id] || (cacheTable[response.heat.id] = {});
    console.log(cacheTable);
    if (!(key in heatTable)) {
      heatTable[key] = true;
      if (!store.race.laps && false) {
        // todo check if current lap is the fastest lap
        dispatch(sendVoice('New Fastest Lap'));
      }
      dispatch(announceLap(response.racer, response.lapTime));
    }
  };
}

/** Will announce the lap */
export function announceLap(person, time) {
  return (dispatch, getStore) => {
    //let store = getStore();
    let racerToPilot = person; // todo map id with pilots name from current heat
    dispatch(sendVoice(`Racer ${racerToPilot}, ${humanSpeech(time)}`));
  };
}
