import { ModalActions } from "@store/reducers/modal/slice";

export type AppActions = ModalActions;

export type InferActions<T> =
  T extends Record<string, (...args: any[]) => infer R> ? R : never;

export type Action<P = unknown> = {
  type: string;
  payload: P;
};
