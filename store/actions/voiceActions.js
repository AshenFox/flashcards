import { INIT_VOICE, SET_VOICE_SPEAKING } from './types';

// SET_VOICE_SPEAKING
export const set_voice_speaking = (_id, type) => {
  const payload = {
    _id,
    type,
  };

  return {
    type: SET_VOICE_SPEAKING,
    payload: _id && type ? payload : false,
  };
};

// INIT_VOICE
export const init_voice = () => async (dispatch) => {
  let working = true;
  const voices = {};

  try {
    const synth = window.speechSynthesis;

    if (!synth) {
      working = false;
      throw new Error('Speech synthesis has not been found');
    }

    synth.getVoices();

    const voicesArr = await new Promise((res) => {
      let int;

      int = setInterval(() => {
        if (synth.getVoices().length !== 0) {
          res(synth.getVoices());
          clearInterval(int);
        }
      }, 10);
    });

    voicesArr.forEach((voice) => {
      if (voice.name === 'Google US English') voices.english = voice;
      if (voice.name === 'Google русский') voices.russian = voice;
      if (/en.+US/.test(voice.lang) && !voices.engBackup) voices.engBackup = voice;
      if (/ru.+RU/.test(voice.lang) && !voices.rusBackup) voices.rusBackup = voice;
    });

    if (!voices.engBackup && !voices.rusBackup) working = false;
  } catch (err) {
    console.error(err);
  }

  dispatch({
    type: INIT_VOICE,
    payload: {
      voices,
      working,
    },
  });
};
