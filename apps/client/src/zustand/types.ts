import { Mutate, StateCreator, StoreApi } from "zustand";

export type Middleware = [['zustand/immer', never], ['zustand/devtools', never]];

export type Slice<Store> = StateCreator<Store, Middleware>;

export type SliceSet<Store> = Mutate<StoreApi<Store | Partial<Store>>, Middleware>['setState'];