import { AuthActions } from "@store/reducers/auth/slice";
import { GameActions } from "@store/reducers/game/slice";
import { ModalActions } from "@store/reducers/modal/slice";
import { SrActions } from "@store/reducers/sr/slice";

import { Speaking, Voices } from "../reducers/voice/voiceInitState";
import { MainActions } from "./../reducers/main/slice";

// header
export const SET_DROPDOWN = "SET_DROPDOWN";

export type SetDropdownAction = {
  type: typeof SET_DROPDOWN;
  payload: boolean;
};

export type HeaderActions = SetDropdownAction;

// dimen
export const SET_HEADER_DIMEN = "SET_HEADER_DIMEN";

export type SetHeaderDimenAction = {
  type: typeof SET_HEADER_DIMEN;
  payload: {
    header_height: number;
    header_width: number;
  };
};

export type DimenActions = SetHeaderDimenAction;

// voice
export const INIT_EASY_SPEECH = "INIT_EASY_SPEECH";
export const SET_VOICE_SPEAKING = "SET_VOICE_SPEAKING";

export type InitEasySpeechAction = {
  type: typeof INIT_EASY_SPEECH;
  payload: {
    voices: Voices;
    working: boolean;
  };
};

export type SetVoiceSpeakingAction = {
  type: typeof SET_VOICE_SPEAKING;
  payload: Speaking;
};

export type VoiceActions = InitEasySpeechAction | SetVoiceSpeakingAction;

// ===========
// ===========
// ===========
// ===========
// ===========
// ===========

export type AppActions =
  | DimenActions
  | VoiceActions
  | HeaderActions
  | SrActions // updated
  | ModalActions
  | MainActions
  | GameActions
  | AuthActions;

export type InferActions<T> =
  T extends Record<string, (...args: any[]) => infer R> ? R : never;

export type Action<P = unknown> = {
  type: string;
  payload: P;
};
