import { AuthActions } from "@store/reducers/auth/slice";
import { GameActions } from "@store/reducers/game/slice";
import { SrActions } from "@store/reducers/sr/slice";

import {
  LogInErrors,
  ModalInputFields,
  ModalType,
  SignUpErrors,
} from "../reducers/modal/modalInitState";
import { Speaking, Voices } from "../reducers/voice/voiceInitState";
import { MainActions } from "./../reducers/main/slice";

// modal
export const CHANGE_MODAL = "CHANGE_MODAL";
export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const CONTROL_FIELD = "CONTROL_FIELD";
export const CHANGE_MODAL_LOADING = "CHANGE_MODAL_LOADING";
export const CLEAR_LOG_IN = "CLEAR_LOG_IN";
export const CLEAR_SIGN_UP = "CLEAR_SIGN_UP";
export const ENTER = "ENTER";
export const CHECK_FIELD = "CHECK_FIELD";

export type ChangeModalAction = {
  type: typeof CHANGE_MODAL;
  payload: {
    active_modal: ModalType;
  };
};

export type ToggleModalAction = {
  type: typeof TOGGLE_MODAL;
  payload?: {};
};

export type ControlFieldAction = {
  type: typeof CONTROL_FIELD;
  payload: {
    field: ModalType;
    name: ModalInputFields;
    value: string;
  };
};

export type ChangeModalLoadingAction = {
  type: typeof CHANGE_MODAL_LOADING;
  payload: boolean;
};

export type ClearLogInAction = {
  type: typeof CLEAR_LOG_IN;
  payload?: {};
};

export type ClearSignUpAction = {
  type: typeof CLEAR_SIGN_UP;
  payload?: {};
};

type CheckFieldActionPayload = SignUpErrors & {
  type: ModalInputFields;
};

export type CheckFieldAction = {
  type: typeof CHECK_FIELD;
  payload: CheckFieldActionPayload;
};

export type EnterAction = {
  type: typeof ENTER;
  payload: {
    log_in_errors?: LogInErrors;
    sign_up_errors?: SignUpErrors;
  };
};

export type ModalActions =
  | ChangeModalAction
  | ToggleModalAction
  | ControlFieldAction
  | ChangeModalLoadingAction
  | ClearLogInAction
  | ClearSignUpAction
  | CheckFieldAction
  | EnterAction;

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
  | ModalActions
  | DimenActions
  | VoiceActions
  | HeaderActions
  | SrActions // updated
  | MainActions
  | GameActions
  | AuthActions;

export type InferActions<T> =
  T extends Record<string, (...args: any[]) => infer R> ? R : never;

export type Action<P = unknown> = {
  type: string;
  payload: P;
};
