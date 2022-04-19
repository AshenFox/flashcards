import { Voices } from './../reducers/voice/voiceInitState';
import { AppActions } from './../types/types';
import { INIT_VOICE, SET_VOICE_SPEAKING } from '../types/types';
import { ThunkActionApp } from '../store';

// SET_VOICE_SPEAKING
export const set_voice_speaking = (
  _id: string,
  type: 'term' | 'definition'
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

// INIT_VOICE
export const init_voice = () => <ThunkActionApp>(async (dispatch) => {
    let working = true;
    const voices: Voices = {};

    try {
      const synth = window.speechSynthesis;

      if (!synth) {
        working = false;
        throw new Error('Speech synthesis has not been found');
      }

      const voicesArr: SpeechSynthesisVoice[] = await new Promise((res) => {
        let int = setInterval(() => {
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
  });
