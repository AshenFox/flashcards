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
  const synth = window.speechSynthesis;

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

  const voices = {};

  voicesArr.forEach((voice) => {
    if (voice.name === 'Google US English') voices.english = voice;
    if (voice.name === 'Google русский') voices.russian = voice;
    if (/en.+US/.test(voice.lang) && !voices.engBackup)
      voices.engBackup = voice;
    if (/ru.+RU/.test(voice.lang) && !voices.rusBackup)
      voices.rusBackup = voice;
  });

  let working = true;

  if (!voices.engBackup && !voices.rusBackup) working = false;

  dispatch({
    type: INIT_VOICE,
    payload: {
      voices,
      working,
    },
  });
};

/* let int;

    int = setInterval(() => {
      if (synth.getVoices().length !== 0) {
        res(synth.getVoices());
        clearInterval(int);
      }
    }, 10); */

// ==========================================

/* 



detectLanguage(text) {
    if (text !== '' && text) {
      let length = text.length;
      let arrRus = text.match(/[а-яА-ЯЁё]/g);
      let arrEng = text.match(/[a-zA-Z]/g);

      if (!arrRus && !arrEng) return false;

      let lengthRus = arrRus ? arrRus.length : 0;
      let lengthEng = arrEng ? arrEng.length : 0;

      let lengthTotal = lengthRus + lengthEng;
      return lengthEng / lengthTotal > 0.5 ? 'english' : 'russian';
    } else {
      return false;
    }
  }

  filterText(text, lang) {
    let filtered = text;
    if (lang === 'english') {
      filtered = filtered.replace(/[а-яА-ЯЁё]/g, '');
    } else if (lang === 'russian') {
      filtered = filtered.replace(/[a-zA-Z]/g, '');
    }

    filtered = filtered
      .replace(/<[^>]*>/g, ' ')
      .replace(/\( \/[^/]*\/ \)/g, ' ');

    return filtered;
  }


*/

/*
  getVoices() {
    let synth = this.synth;

    return new Promise(function (resolve, reject) {
      let int;

      int = setInterval(() => {
        if (synth.getVoices().length !== 0) {
          resolve(synth.getVoices());
          clearInterval(int);
        }
      }, 10);
    });
  }

   constructor() {
    this.synth = window.speechSynthesis;

    if (this.synth.onvoiceschanged !== undefined) {
      let s = this.getVoices();
      s.then((result) => {
        this.voices = result;

        this.voices.forEach((voice) => {
          if (voice.name === 'Google US English') this.english = voice;
          if (voice.name === 'Google русский') this.russian = voice;
          if (/en.+US/.test(voice.lang) && !this.engBackup)
            this.engBackup = voice;
          if (/ru.+RU/.test(voice.lang) && !this.rusBackup)
            this.rusBackup = voice;
        });

        if (!this.engBackup && !this.rusBackup) {
          this.working = false;
        } else {
          this.working = true;
        }
      });
    }
  }
 */
