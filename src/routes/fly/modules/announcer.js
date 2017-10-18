import _ from 'lodash';

import { sendVoice } from '../../../global/voice/modules/voice';

/** Announce the new heat */
export function announcePilotsFromResponse(response) {
  console.log(response);
  console.log(JSON.stringify(response));
  return dispatch => {
    dispatch(announceLap('Racer 1, ewized'));
  };
}

/** Read the response from the payload and announce the values */
export function announceLapsFromResponse(response) {
  console.log(response);
  console.log(JSON.stringify(response));
  return dispatch => {
    dispatch(announceLap('1', '01:32'))
  };
}

/** Will announce the lap */
export function announceLap(person, time) {
  return dispatch => {
    dispatch(sendVoice(`Racer ${person} ${time}`));
  };
}

/** Announce the new fastest lap */
export function announceNewFastestLap() {
  return dispatch => {
    dispatch(sendVoice('New Fastest Lap'));
  };
}
