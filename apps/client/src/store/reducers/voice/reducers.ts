import { Speaking, VoiceCaseReducer, Voices } from "./types";

export const initEasySpeechReducer: VoiceCaseReducer<{
  voices: Voices;
  working: boolean;
}> = (state, action) => {
  state.working = action.payload.working;
  state.voices = action.payload.voices;
};

export const setVoiceSpeaking: VoiceCaseReducer<
  | {
      _id: string;
      type: "term" | "definition";
    }
  | undefined
> = (state, action) => {
  if (action.payload) {
    state.speaking = action.payload;
  } else {
    state.speaking = false;
  }
};
