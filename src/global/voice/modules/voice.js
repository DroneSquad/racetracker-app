export const VOICE_SEND = 'VOICE_SEND';
export const VOICE_SEND_SUCCESS = 'VOICE_SEND_SUCCESS';
export const VOICE_SEND_ERROR = 'VOICE_SEND_ERROR';

const _stack = [];

/** remove any queued announcements from the queue, used on end heat */
export function clearVoiceQueue() {
  // TODO: interupt any speaking when stop is fired
  _stack.length = 0;
}

export function queueVoice(dispatch, text, rate = 1, locale = 'en-US', callback) {
  _stack.push({ dispatch: dispatch, text: text, rate: rate, locale: locale, callback: callback })
  if (_stack.length === 1) {
    sendQueuedVoice();
  }
}

/** Send a queued voice packet with the optional locale, speed, and callback */
export function sendQueuedVoice() {
  let { dispatch, text, rate, locale, callback } = _stack[0] || {};
  if (dispatch) { // verify we have a dispatch callback
    dispatch({
      type: VOICE_SEND,
      payload: { text, locale, rate }
    });
    if ('TTS' in window) {
      // weird quirk to make it work on a browser
      window['TTS'].speak(
        { text, locale, rate },
        () => {
          if (callback) {
            callback();
          }
          dispatch({ type: VOICE_SEND_SUCCESS });
          // update the queue stack
          _stack.shift();
          if (_stack.length > 0) {
            sendQueuedVoice();
          }
        },
        reason => dispatch({ type: VOICE_SEND_ERROR, payload: reason })
      );
    } else {
      dispatch({ type: VOICE_SEND_ERROR, payload: 'Plugin not loaded' });
    }
  }
}

/** Send the voice from the text, and optional locale, speed */
export function sendVoice(text, rate = 1, locale = 'en-US', callback) {
  return dispatch => {
    dispatch({
      type: VOICE_SEND,
      payload: { text, locale, rate }
    });
    if ('TTS' in window) {
      // weird quirk to make it work on a browser
      window['TTS'].speak(
        { text, locale, rate },
        () => {
          if (callback) {
            callback();
          }
          dispatch({ type: VOICE_SEND_SUCCESS });
        },
        reason => dispatch({ type: VOICE_SEND_ERROR, payload: reason })
      );
    } else {
      dispatch({ type: VOICE_SEND_ERROR, payload: 'Plugin not loaded' });
    }
  };
}

export default function(state = {}, action) {
  switch (action.type) {
    default:
      return { ...state };
  }
}
