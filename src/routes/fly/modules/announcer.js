import { sendVoice } from '../../../global/voice/modules/voice';

let cacheTable = (window.__announcer_cacheTable = {}); // cache table prevent multiple laps from being called out
let flyoverAnnounced = false;

/** Split the mills into an array of mins, seconds, mills */
function splitMillsToArray(ms) {
  let mins = Math.floor(ms / 60000);
  // milli seconds need to append 1 to the prefix to fix math errors
  return [mins, Math.floor(ms / 1000) - mins * 60, Math.floor(ms % 1000) + 1000];
}

/** Make the speech of the announcer sound normal, though with out a proper text to speech engine this will */
function humanSpeech(millis) {
  let speech = '';
  let [mins, seconds, ms] = splitMillsToArray(millis);
  // console.log(mins, seconds, ms);

  if (ms > 100 && ms % 10 >= 5) {
    // round to the 10th position
    if (Math.floor(ms % 100 / 10) + 1 === 10) {
      ms = `${Math.floor(ms % 1000 / 100) + 1}0`;
    } else {
      ms = `${Math.floor(ms % 1000 / 100)}${Math.floor(ms % 100 / 10) + 1}`;
    }
  } else if (ms > 100 && ms % 10 < 5) {
    ms = `${Math.floor(ms % 1000 / 100)}${Math.floor(ms % 100 / 10)}`;
  }

  while (ms > 0 && ms % 10 === 0) {
    // Only show leading zeros
    ms /= 10;
  }

  if (mins > 0) {
    // show minutes is it has minutes
    speech += mins + ' minute(s), ';
  }

  if (seconds > 0 && ms > 0) {
    // Show both seconds and millis
    speech += seconds + '.' + ms + ' second(s)';
  } else if (seconds > 0 && ms <= 0) {
    // Only show the seconds
    speech += seconds + ' second(s)';
  } else {
    // Only show the point of a seconds
    speech += '.' + ms + ' second(s)';
  }
  return speech;
}

/** Read the response from the payload and announce the values */
export function announceLapsFromResponse(response) {
  return (dispatch, getStore) => {
    let store = getStore();
    let activeHeat = store.race.activeHeat;
    let key = (0x1 << response.racer) * response.racer + response.lap;
    let heatTable = cacheTable[activeHeat] || (cacheTable[activeHeat] = {});
    if (!(key in heatTable)) {
      heatTable[key] = true;
      if (isFastestLap(store.race.laps, store.race.activeHeat, response)) {
        dispatch(announceLap(response.racer, response.lapTime, true));
      } else {
        dispatch(announceLap(response.racer, response.lapTime));
      }
    }
  };
}

/** Announce the start of a heat in shotgun mode */
export function announceShotgunStart(callback) {
  return dispatch => {
    dispatch(sendVoice('Five, Four, Three, Two, One', 0.15, 'en-US', callback));
  };
}

/** Announce the start of a heat in flyover mode */
export function announceFlyoverStart() {
  flyoverAnnounced = false;
  return dispatch => {
    dispatch(sendVoice('Start when ready'));
  };
}

/** Announce the passing of a gate by a racer in flyover mode */
export function announceFlyover() {
  if (!flyoverAnnounced) {
    flyoverAnnounced = true;
    return dispatch => {
      dispatch(sendVoice('Race started'));
    };
  }
}

/** Announce the passing of a gate by a racer in flyover mode */
export function announceGo() {
  return dispatch => dispatch(sendVoice('Go!'));
}

/** Determine if this lap is the new fastest lap for announce */
export function isFastestLap(laps, heat, response) {
  if (laps) {
    if (response.lap > 1) {
      return (
        laps.filter(h => h.heat === heat && h.lapTime > 0).sort((a, b) => a.lapTime - b.lapTime)[0].lapTime ===
        response.lapTime
      );
    }
  }
  return false;
}

/** Will announce the lap */
export function announceLap(person, time, fastest = false) {
  return dispatch => {
    let racerToPilot = person; // todo map id with pilots name from current heat
    if (fastest) {
      dispatch(sendVoice(`New Fastest Lap... Racer ${racerToPilot}, ${humanSpeech(time)}`));
    } else {
      dispatch(sendVoice(`Racer ${racerToPilot}, ${humanSpeech(time)}`));
    }
  };
}
