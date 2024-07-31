export type SwapDatesWithStrings<T> = {
  [k in keyof T]: T[k] extends Date ? string : T[k];
};

export type Override<T1, T2> = Omit<T1, keyof T2> & T2;
