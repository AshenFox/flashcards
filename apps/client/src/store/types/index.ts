import { AuthActions } from "@store/reducers/auth/slice";
import { ModalActions } from "@store/reducers/modal/slice";

export type AppActions = ModalActions | AuthActions;

export type InferActions<T> =
  T extends Record<string, (...args: any[]) => infer R> ? R : never;

export type Action<P = unknown> = {
  type: string;
  payload: P;
};
