import { StateCreator } from "zustand";

export type Slice<Store> = StateCreator<Store, [['zustand/immer', never], ['zustand/devtools', never]]>;