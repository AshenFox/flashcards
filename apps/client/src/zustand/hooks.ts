import { useMemo } from "react";
import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Slice } from "./types";

type CreateStoreHookArgs<Store> = {
    storeName: string;
    instanceKey: string;
    slice: Slice<Store>;
};

export const useCreateStoreHook = <Store>({ storeName, instanceKey, slice }: CreateStoreHookArgs<Store>) => {
    const useStore = useMemo(() => {
        const storeWithImmer = immer(slice);

        if (process.env.NODE_ENV === 'development')
            return create<Store>()(devtools(storeWithImmer, { name: `${storeName}: ${instanceKey}` }));

        return create<Store>()(storeWithImmer);
    }, [storeName, instanceKey]);

    return useStore;
};