import { createStoreHook } from "@zustand/helpers";

import { voiceSlice } from "./voiceStore";

export type { VoiceStore, Voices, Speaking, VoiceData } from "./types";
export { voiceSlice } from "./voiceStore";
export { initEasySpeech } from "./initEasySpeech";
export type { SetVoicesAndWorking } from "./initEasySpeech";

export const useVoiceStore = createStoreHook({
  storeName: "Voice",
  instanceKey: "voice",
  slice: voiceSlice,
});
