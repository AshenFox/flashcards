import { withActionName } from "@zustand/helpers";
import { calcCounter } from "@zustand/sr/helpers";
import type { Slice } from "../types";

export type SRStore = {
  counter: number | undefined;
  initialized: boolean;
  setInitialCounter: (repeatNum: number) => void;
  updateCounter: (params: {
    current?: number;
    additionNumber?: number | null;
    value?: string;
    repeatNum?: number;
  }) => void;
};

export const srSlice: Slice<SRStore> = (setAction) => {
  const set = withActionName<SRStore>(setAction);

  return {
    counter: undefined,
    initialized: false,
    setInitialCounter: (repeatNum) =>
      set(
        () => ({
          counter: Math.min(repeatNum, 999),
          initialized: true,
        }),
        "setInitialCounter",
      ),
    updateCounter: (params) =>
      set(
        (state) => {
          const next = calcCounter({
            ...params,
            current: state.counter ?? 1,
          });
          state.counter = next;
        },
        "updateCounter",
      ),
  };
};
