export const VOICE_SEND = 'VOICE_SEND';
export const VOICE_SEND_SUCCESS = 'VOICE_SEND_SUCCESS';
export const VOICE_SEND_ERROR = 'VOICE_SEND_ERROR';

/** Send the voice from the text, and optional locale, speed */
export function sendVoice(text, locale = 'en-US', rate = 1) {
  return dispatch => {
    dispatch({
      type: VOICE_SEND,
      payload: { text, locale, rate }
    });
    if ('TTS' in window) {
      // weird quirk to make it work on a browser
      window['TTS'].speak(
        { text, locale, rate },
        () => dispatch({ type: VOICE_SEND_SUCCESS }),
        reason => dispatch({ type: VOICE_SEND_ERROR, payload: reason })
      );
    } else {
      console.log(text);
      dispatch({ type: VOICE_SEND_ERROR, payload: 'Plugin not loaded' });
    }
  };
}

export function sendVoiceThenDispatch(text, locale = 'en-US', rate = 1, action) {
  console.log("sendVoiceThenDispatch");
  console.log(action);
  return dispatch => {
    /*dispatch({
      type: VOICE_SEND,
      payload: { text, locale, rate }
    });*/
    if ('TTS' in window) {
      // weird quirk to make it work on a browser
      window['TTS'].speak(
        { text, locale, rate },
        () => dispatch(action),
        reason => dispatch({ type: VOICE_SEND_ERROR, payload: reason })
      );
    } else {
      console.log(text);
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
