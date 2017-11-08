import _ from 'lodash';

import { RT_RACER_CHANS, writeRacerChannels, readRacerChannels } from './racetracker';
import { goBack } from 'react-router-redux';

import frequencies from '../containers/settings/frequencies/frequencies.json'; // the config to generate the profiles

export const FREQ_CUSTOM_PROFILE = 'FREQ_CUSTOM_PROFILE';
export const FREQ_UPDATE_PROFILE = 'FREQ_UPDATE_PROFILE';
export const FREQ_SAVING = 'FREQ_SAVING';
export const FREQ_SAVING_DONE = 'FREQ_SAVING_DONE';

/** Read the channels */
export const readFrequencies = deviceId => {
  return dispatch => {
    dispatch(updateProfile(null));
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
  let defaults = ['FF', 'FF', 'FF', 'FF', 'FF', 'FF', 'FF', 'FF']; // Must have a fixed size of 8 to clear channels
  _.forEach(channels, (channel, index) => (defaults[index] = channel));
  let channelMapToDevice = _.map(defaults, (channel, index) => ({ racer: index + 1, channel: channel }));
  return dispatch => {
    dispatch({ type: FREQ_SAVING });
    dispatch(
      writeRacerChannels(
        {
          device_id: deviceId,
          channels: channelMapToDevice
        },
        (promise, dispatch) => {
          // when done it will call RT_RACER_CHANS and this callback
          promise.catch(response => window.alert(response)); // alert any errors
          dispatch({ type: FREQ_SAVING_DONE, payload: channelMapToDevice });
          dispatch(goBack());
        }
      )
    );
  };
};

/** Rebuild the object stuff for the UI and internal frequencie profile structure */
function rebuildProfileStuff(frequencies) {
  let profiles = _.map(frequencies.profiles, profile => profile.name);
  let profilesMap = (() => {
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
  })();
  return { frequencies, profiles, profilesMap };
}

/** get or create the profile template to create custom profile */
function getOrCreateCustomProfile() {
  let customProfile = { name: 'Custom', frequencies: [] };
  if (_.size(frequencies.profiles) > 0 && frequencies.profiles[0].name === 'Custom') {
    customProfile = frequencies.profiles[0]; // The custom profile should be the first in the array
  } else {
    frequencies.profiles.unshift(customProfile);
  }
  return customProfile;
}

/** Update the actual band in the custom profile */
function updateCustomProfile(profile, actions) {
  let updatedBands = _.cloneDeep(actions.lastBands);
  if (actions.position >= 0 && actions.newBand) {
    // update if exists will be null if reading from device
    updatedBands[actions.position] = actions.newBand;
  }
  // check for existing custom band profiles
  for (let band in profile.frequencies) {
    band = profile.frequencies[band];
    if (_.size(band.bands) === _.size(updatedBands)) {
      band.bands = updatedBands;
      return profile;
    }
  }
  // at this time if we did not find it add it
  profile.frequencies.push({ imd: -1, bands: updatedBands });
  return profile;
}

/** The benfits of function composition */
function customProfile(payload) {
  return updateCustomProfile(getOrCreateCustomProfile(), payload);
}

/** reducers */
export default function(state = {}, action) {
  switch (action.type) {
    case FREQ_CUSTOM_PROFILE:
      return {
        ...state,
        deviceProfile: false,
        profile: customProfile(action.payload),
        ...rebuildProfileStuff(frequencies)
      };
    case FREQ_UPDATE_PROFILE:
      return { ...state, deviceProfile: false, profile: action.payload };
    case FREQ_SAVING:
      return { ...state, saving: true };
    case FREQ_SAVING_DONE:
      return { ...state, saving: false };
    case RT_RACER_CHANS:
      let bands = _.map(action.payload.channels, channel => channel.channel.toLowerCase());
      // will try and find the correct profile to use.
      let bandIndex = 0;
      let knownProfile = _.find(frequencies.profiles, profile => {
        for (let indexBands in profile.frequencies) {
          let band = profile.frequencies[indexBands];
          if (_.isEqual(bands, band.bands)) {
            bandIndex = indexBands;
            return true;
          }
        }
        return false;
      });
      return {
        ...state,
        deviceProfileBandIndex: bandIndex,
        deviceProfile: true,
        profile: knownProfile || customProfile({ lastBands: bands }),
        ...rebuildProfileStuff(frequencies)
      };
    default:
      return { ...state, loading: false, ...rebuildProfileStuff(frequencies) };
  }
}
