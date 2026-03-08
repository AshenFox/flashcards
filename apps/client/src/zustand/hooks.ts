import { useMemo } from "react";

import { CreateStoreHookArgs } from "./types";
import { createStoreHook } from "./helpers";

export const useCreateStoreHook = <Store>({ storeName, instanceKey, slice }: CreateStoreHookArgs<Store>) => {
    const useStore = useMemo(() => createStoreHook<Store>({ storeName, instanceKey, slice }),
        [storeName, instanceKey, slice]);

    return useStore;
};