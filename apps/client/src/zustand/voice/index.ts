import { createStoreHook } from "@zustand/helpers";

import { voiceSlice } from "./voiceStore";

export type { SetVoicesAndWorking } from "./initEasySpeech";
export { initEasySpeech } from "./initEasySpeech";
export type { Speaking, VoiceData,Voices, VoiceStore } from "./types";
export { voiceSlice } from "./voiceStore";

export const useVoiceStore = createStoreHook({
  storeName: "Voice",
  instanceKey: "voice",
  slice: voiceSlice,
});
