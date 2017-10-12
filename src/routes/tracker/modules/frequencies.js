import _ from 'lodash';

import { RT_RACER_CHANS, writeRacerChannels, readRacerChannels } from './racetracker';
import { goBack } from 'react-router-redux';

export const FREQ_UPDATE_PROFILE = 'FREQ_UPDATE_PROFILE';
export const FREQ_SAVING = 'FREQ_SAVING';
export const FREQ_SAVING_DONE = 'FREQ_SAVING_DONE';

/** Read the channels */
export const readFrequencies = deviceId => {
  return dispatch => {
    dispatch(readRacerChannels(deviceId)); // when done will call RT_RACER_CHANS
  };
};

/** Update internal profile */
export const updateProfile = profile => {
  return dispatch =>
    dispatch({
      type: FREQ_UPDATE_PROFILE,
      payload: profile
    });
};

/** Start saving the frequencies */
export const saveFrequencies = (deviceId, channels) => {
  return dispatch => {
    dispatch({ type: FREQ_SAVING });
    dispatch(
      writeRacerChannels({
        device_id: deviceId,
        channels: _.map(channels, (channel, index) => ({ racer: index + 1, channel: channel }))
      })
    ); // when done it will call RT_RACER_CHANS
    setTimeout(() => {
      dispatch({ type: FREQ_SAVING_DONE });
      dispatch(goBack());
    }, 1500); // need a proper response
  };
};

/** reducers */
export default function(state = {}, action) {
  console.log(action);
  switch (action.type) {
    case FREQ_UPDATE_PROFILE:
      return { ...state, profile: action.payload };
    case FREQ_SAVING:
      return { ...state, saving: true };
    case FREQ_SAVING_DONE:
      return { ...state, saving: false };
    default:
      return { ...state, loading: false };
  }
}
