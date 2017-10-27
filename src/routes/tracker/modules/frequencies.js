import _ from 'lodash';

import { RT_RACER_CHANS, writeRacerChannels, readRacerChannels } from './racetracker';
import { goBack } from 'react-router-redux';

import frequencies from '../containers/settings/frequencies/frequencies.json'; // the config to generate the profiles

export const FREQ_PROFILE_INIT = 'FREQ_PROFILE_INIT';
export const FREQ_UPDATE_PROFILE = 'FREQ_UPDATE_PROFILE';
export const FREQ_SAVING = 'FREQ_SAVING';
export const FREQ_SAVING_DONE = 'FREQ_SAVING_DONE';

/** Read the channels */
export const readFrequencies = deviceId => {
  return dispatch => {
    dispatch(readRacerChannels(deviceId));
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
  let channelMapToDevice = _.map(channels, (channel, index) => ({ racer: index + 1, channel: channel }));
  return dispatch => {
    dispatch({ type: FREQ_SAVING });
    dispatch(
      writeRacerChannels({
        device_id: deviceId,
        channels: channelMapToDevice
      }, dispatch => {  // when done it will call RT_RACER_CHANS and this callback
        dispatch({ type: FREQ_SAVING_DONE, payload: channelMapToDevice });
        dispatch(goBack());
      })
    );
  };
};

/** reducers */
export default function(state = {}, action) {
  console.log(state);
  switch (action.type) {
    case FREQ_UPDATE_PROFILE:
      return { ...state, profile: action.payload };
    case FREQ_SAVING:
      return { ...state, saving: true };
    case FREQ_SAVING_DONE:
      return { ...state, saving: false };
    case RT_RACER_CHANS:
      return { ...state, test: action.payload };
    default:
      return {
        ...state,
        loading: false,
        frequencies: frequencies,
        profiles: _.map(frequencies.profiles, profile => profile.name),
        profilesMap: (() => {
          // todo update with map reduce
          let data = {};
          for (let index in frequencies.profiles) {
            let profile = frequencies.profiles[index];
            for (let indexBands in profile.frequencies) {
              let band = profile.frequencies[indexBands];
              let bands = data[band.bands.length];
              let i = Number(index);
              if (bands) {
                bands.push(i);
              } else {
                data[band.bands.length] = [i];
              }
            }
          }
          return data;
        })()
      };
  }
}
