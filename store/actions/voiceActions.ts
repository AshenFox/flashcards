import { EasySpeechStatus, Voices } from './../reducers/voice/voiceInitState';
import { AppActions } from './../types/types';
import { INIT_EASY_SPEECH, SET_VOICE_SPEAKING } from '../types/types';
import { ThunkActionApp } from '../store';
import EasySpeech from 'easy-speech';

// SET_VOICE_SPEAKING
export const set_voice_speaking = (
  _id?: string,
  type?: 'term' | 'definition'
): AppActions => {
  const payload = {
    _id,
    type,
  };

  return {
    type: SET_VOICE_SPEAKING,
    payload: _id && type ? payload : false,
  };
};

// INIT_EASY_SPEECH
export const init_easy_speech = () => <ThunkActionApp>(async dispatch => {
    const status = EasySpeech.status() as EasySpeechStatus;

    if (status?.initialized) {
      return;
    }

    let working = true;
    const voices: Voices = {};

    try {
      const res = EasySpeech.detect();

      if (!res.speechSynthesis || !res.speechSynthesisUtterance) {
        working = false;
        throw new Error('Your browser is not capable of text to speech');
      }

      const initialized = await EasySpeech.init({ maxTimeout: 5000, interval: 250 });

      console.log({ res, initialized });

      if (!initialized) {
        working = false;
        throw new Error('Easy Speech encountered a problem on initialization');
      }

      const voicesArr = EasySpeech.voices();

      voicesArr.forEach(voice => {
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
      type: INIT_EASY_SPEECH,
      payload: {
        voices,
        working,
      },
    });
  });
