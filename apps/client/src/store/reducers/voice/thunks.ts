import { ThunkActionApp } from "@store/store";
import EasySpeech from "easy-speech";

import { voiceActions } from "./slice";
import { EasySpeechStatus, Voices } from "./types";

export const initEasySpeech = () => <ThunkActionApp>(async dispatch => {
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
      throw new Error("Your browser is not capable of text to speech");
    }

    const initialized = await EasySpeech.init({
      maxTimeout: 5000,
      interval: 250,
    });

    if (!initialized) {
      working = false;
      throw new Error("Easy Speech encountered a problem on initialization");
    }

    const voicesArr = EasySpeech.voices();

    const isNotMobile = !/Mobile|Android|iPhone|iPad|iPod/.test(navigator.userAgent);

    const chromeWithVersion = navigator.userAgent.match(/Chrome\/(\d+)/);
    const chromeMajorVersion = chromeWithVersion ? parseInt(chromeWithVersion[1], 10) : null;
    const isChromeDesktop135 = isNotMobile && chromeMajorVersion === 135;

    voicesArr.forEach(voice => {
      const voiceData = {
        voiceURI: voice.voiceURI,
        name: voice.name,
        lang: voice.lang,
        localService: voice.localService,
        default: voice.default,
      };


      // This is a Chrome-specific workaround because Chrome has a bug with Google voices in the current version of the browser 135
      if (isChromeDesktop135) {
        if (voice.name === "Microsoft Zira - English (United States)") voices.english = voiceData;
        if (voice.name === "Microsoft Irina - Russian (Russia)") voices.russian = voiceData;
      } else {
        if (voice.name === "Google US English") voices.english = voiceData;
        if (voice.name === "Google русский") voices.russian = voiceData;
      }
      if (/en.+US/.test(voice.lang) && !voices.engBackup) voices.engBackup = voiceData;
      if (/ru.+RU/.test(voice.lang) && !voices.rusBackup) voices.rusBackup = voiceData;
    });

    if (!voices.engBackup && !voices.rusBackup) working = false;
  } catch (err) {
    console.error(err);
  }

  dispatch(
    voiceActions.initEasySpeechReducer({
      voices,
      working,
    }),
  );
});
