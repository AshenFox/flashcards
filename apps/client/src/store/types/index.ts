import { AuthActions } from "@store/reducers/auth/slice";
import { DimenActions } from "@store/reducers/dimen/slice";
import { HeaderActions } from "@store/reducers/header/slice";
import { ModalActions } from "@store/reducers/modal/slice";

export type AppActions =
  | HeaderActions
  | DimenActions
  | ModalActions
  | AuthActions;

export type InferActions<T> =
  T extends Record<string, (...args: any[]) => infer R> ? R : never;

export type Action<P = unknown> = {
  type: string;
  payload: P;
};
