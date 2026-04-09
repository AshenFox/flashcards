import { useMemo } from "react";

import { createStoreHook } from "./helpers";
import { CreateStoreHookArgs } from "./types";

export const useCreateStoreHook = <Store>({
  storeName,
  instanceKey,
  slice,
}: CreateStoreHookArgs<Store>) => {
  const useStore = useMemo(
    () => createStoreHook<Store>({ storeName, instanceKey, slice }),
    [storeName, instanceKey, slice],
  );

  return useStore;
};
