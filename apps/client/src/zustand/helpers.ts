import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Slice, SliceSet } from "./types";

/** Wraps `setState` so you can call `set(updater, "actionName")` instead of `set(updater, false, "actionName")`. */
export function withActionName<Store>(
  set: SliceSet<Store>
) {
  return (
    updater: Parameters<SliceSet<Store>>[0],
    actionName?: Parameters<SliceSet<Store>>[2]
  ) => set(updater, false, actionName);
}

type CreateStoreHookArgs<Store> = {
  storeName: string;
  instanceKey: string;
  slice: Slice<Store>;
  getQueryKey?: () => unknown[];
};

export const createStoreHook = <Store>({ storeName, instanceKey, slice }: CreateStoreHookArgs<Store>) => {
  const storeWithImmer = immer(slice);

  if (process.env.NODE_ENV === 'development')
    return create<Store>()(devtools(storeWithImmer, { name: `${storeName}: ${instanceKey}` }));

  return create<Store>()(storeWithImmer);
};