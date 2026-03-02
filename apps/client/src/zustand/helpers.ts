import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Slice } from "./types";

type CreateStoreHookArgs<Store> = {
    storeName: string;
    instanceKey: string;
    slice: Slice<Store>;
};

export const createStoreHook = <Store>({ storeName, instanceKey, slice }: CreateStoreHookArgs<Store>) => {
    const storeWithImmer = immer(slice);

    if (process.env.NODE_ENV === 'development')
        return create<Store>()(devtools(storeWithImmer, { name: `${storeName}: ${instanceKey}` }));

    return create<Store>()(storeWithImmer);
};