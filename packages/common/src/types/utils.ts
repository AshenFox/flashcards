// TO-DO: think about using ts-morph
// Only for objects with primitive values
export type JSONify<T> = {
  [k in keyof T]: T[k] extends Date
    ? string
    : T[k] extends object | null | undefined
      ? JSONify<T[k]>
      : T[k];
};

export type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export type DateJSON<isJson extends boolean = false> = isJson extends true
  ? string
  : Date;
