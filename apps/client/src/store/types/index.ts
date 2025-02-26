import { AuthActions } from "@store/reducers/auth/slice";
import { DimenActions } from "@store/reducers/dimen/slice";
import { GameActions } from "@store/reducers/game/slice";
import { HeaderActions } from "@store/reducers/header/slice";
import { MainActions } from "@store/reducers/main/slice";
import { ModalActions } from "@store/reducers/modal/slice";
import { SrActions } from "@store/reducers/sr/slice";
import { VoiceActions } from "@store/reducers/voice/slice";

export type AppActions =
  | HeaderActions
  | SrActions
  | DimenActions
  | VoiceActions
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
