import { withActionName } from "@zustand/helpers";

import type { Slice } from "../types";
import type { Speaking, Voices, VoiceStore } from "./types";

export type { VoiceStore } from "./types";

const initialState = {
  voices: {} as Voices,
  speaking: false as Speaking,
  working: false,
};

export const voiceSlice: Slice<VoiceStore> = (setAction) => {
  const set = withActionName<VoiceStore>(setAction);

  return {
    ...initialState,
    setVoicesAndWorking: (payload) =>
      set(
        (state) => {
          state.voices = payload.voices;
          state.working = payload.working;
        },
        "setVoicesAndWorking",
      ),
    setVoiceSpeaking: (payload) =>
      set(
        (state) => {
          state.speaking = payload ?? false;
        },
        "setVoiceSpeaking",
      ),
  };
};
