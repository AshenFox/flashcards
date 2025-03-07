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

      voicesArr.forEach(voice => {
        if (voice.name === "Google US English") voices.english = voice;
        if (voice.name === "Google русский") voices.russian = voice;
        if (/en.+US/.test(voice.lang) && !voices.engBackup)
          voices.engBackup = voice;
        if (/ru.+RU/.test(voice.lang) && !voices.rusBackup)
          voices.rusBackup = voice;
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
